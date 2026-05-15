import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'qrcode'
import { doc, getDoc } from 'firebase/firestore'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../lib/firebase'
import { getBoothById } from '../lib/booths'
import { generateToken, encodeBoothQrUrl, getTokenRemainingSeconds } from '../lib/token'
import PinEntry from '../components/PinEntry'

export default function BoothDisplay() {
  const { boothId } = useParams<{ boothId: string }>()
  const booth = boothId ? getBoothById(boothId) : undefined
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [countdown, setCountdown] = useState(getTokenRemainingSeconds())
  const [refreshKey, setRefreshKey] = useState(0)
  const prevCountdownRef = useRef(getTokenRemainingSeconds())

  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('booth_unlocked') === 'true')
  const [pinError, setPinError] = useState('')

  // Sign in anonymously only if no user is already signed in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) signInAnonymously(auth).catch(() => {})
      unsub()
    })
    return unsub
  }, [])

  async function handlePin(pin: string) {
    try {
      const configDoc = await getDoc(doc(db, 'config', 'staff'))
      if (!configDoc.exists()) {
        setPinError('Staff config not found')
        return
      }
      const storedPin = configDoc.data().pin as string
      if (pin === storedPin) {
        sessionStorage.setItem('booth_unlocked', 'true')
        setUnlocked(true)
        setPinError('')
      } else {
        setPinError('Incorrect PIN')
      }
    } catch {
      setPinError('Failed to verify PIN')
    }
  }

  const accent = booth?.event === 'techfest' ? '#46f4ff' : '#ff007f'

  if (!unlocked) {
    return <PinEntry onSubmit={handlePin} error={pinError} />
  }

  // Generate QR code as data URL
  async function updateQr() {
    if (!booth) return
    const token = await generateToken(booth.secret)
    const data = encodeBoothQrUrl(booth.id, token, window.location.origin)
    const url = await QRCode.toDataURL(data, {
      width: 300,
      margin: 3,
      color: {
        dark: '#d7fdff',
        light: '#0f0f1a',
      },
    })
    setQrDataUrl(url)
    setRefreshKey((k) => k + 1)
  }

  // Generate QR on mount / unlock
  useEffect(() => {
    if (booth && unlocked) updateQr()
  }, [booth, unlocked]) // eslint-disable-line react-hooks/exhaustive-deps

  // Single timer: countdown + refresh QR when period wraps
  useEffect(() => {
    if (!unlocked) return
    const interval = setInterval(() => {
      const remaining = getTokenRemainingSeconds()
      setCountdown(remaining)
      // When countdown wraps around (previous was ~1s, now ~30s), refresh QR
      if (remaining > prevCountdownRef.current) {
        updateQr()
      }
      prevCountdownRef.current = remaining
    }, 1000)
    return () => clearInterval(interval)
  }, [booth, unlocked]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!booth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#081120' }}
      >
        <span
          className="font-mono"
          style={{ fontSize: '14px', letterSpacing: '3px', color: '#ff4444' }}
        >
          BOOTH NOT FOUND
        </span>
      </div>
    )
  }

  const progress = ((30 - countdown) / 30) * 100

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: '#081120',
        background: `
          radial-gradient(ellipse at 50% 50%, ${accent}08 0%, transparent 70%),
          linear-gradient(rgba(70,244,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(70,244,255,0.03) 1px, transparent 1px),
          #081120
        `,
        backgroundSize: '100% 100%, 40px 40px, 40px 40px, 100% 100%',
      }}
    >
      {/* Booth code + name */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="block font-mono uppercase"
          style={{ fontSize: '14px', letterSpacing: '6px', color: accent }}
        >
          {booth.code}
        </span>
        <h1
          className="font-display font-bold uppercase tracking-wider mt-2"
          style={{ fontSize: '32px', color: '#d7fdff' }}
        >
          {booth.name}
        </h1>
        <hr
          className="mt-4 mx-auto"
          style={{
            width: '80px',
            height: '1px',
            backgroundColor: accent,
            border: 'none',
            opacity: 0.5,
          }}
        />
      </motion.div>

      {/* QR Code */}
      {qrDataUrl && (
        <AnimatePresence mode="wait">
          <motion.div
            key={refreshKey}
            className="p-4"
            style={{
              border: `2px solid ${accent}44`,
              boxShadow: `0 0 40px ${accent}11`,
              backgroundColor: '#0f0f1a',
            }}
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img src={qrDataUrl} alt="Booth QR Code" width={260} height={260} className="max-w-full" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Instructions */}
      <p
        className="font-mono uppercase mt-8 mb-6"
        style={{ fontSize: '12px', letterSpacing: '4px', color: 'rgba(215,253,255,0.4)' }}
      >
        Scan with camera or Google Lens to collect
      </p>

      {/* Countdown */}
      <div className="flex flex-col items-center gap-3">
        <span
          className="font-mono"
          style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(215,253,255,0.3)' }}
        >
          Refreshing in {countdown}s
        </span>
        <div
          className="w-48 h-1"
          style={{ backgroundColor: 'rgba(215,253,255,0.1)' }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: accent }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}
