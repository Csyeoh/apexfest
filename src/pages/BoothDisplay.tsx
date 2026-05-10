import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'qrcode'
import { getBoothById } from '../lib/booths'
import { generateToken, encodeBoothQr, getTokenRemainingSeconds } from '../lib/token'

export default function BoothDisplay() {
  const { boothId } = useParams<{ boothId: string }>()
  const booth = boothId ? getBoothById(boothId) : undefined
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [countdown, setCountdown] = useState(getTokenRemainingSeconds())
  const [refreshKey, setRefreshKey] = useState(0)
  const prevCountdownRef = useRef(getTokenRemainingSeconds())

  const accent = booth?.event === 'techfest' ? '#00dcc0' : '#ffb830'

  // Generate QR code as data URL
  async function updateQr() {
    if (!booth) return
    const token = await generateToken(booth.secret)
    const data = encodeBoothQr(booth.id, token)
    const url = await QRCode.toDataURL(data, {
      width: 300,
      margin: 3,
      color: {
        dark: '#e8e4d4',
        light: '#0f0f1a',
      },
    })
    setQrDataUrl(url)
    setRefreshKey((k) => k + 1)
  }

  // Generate QR on mount
  useEffect(() => {
    if (booth) updateQr()
  }, [booth]) // eslint-disable-line react-hooks/exhaustive-deps

  // Single timer: countdown + refresh QR when period wraps
  useEffect(() => {
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
  }, [booth]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!booth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0a0a0f' }}
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
        backgroundColor: '#0a0a0f',
        background: `
          radial-gradient(ellipse at 50% 50%, ${accent}08 0%, transparent 70%),
          linear-gradient(rgba(0,220,192,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,220,192,0.03) 1px, transparent 1px),
          #0a0a0f
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
          style={{ fontSize: '32px', color: '#e8e4d4' }}
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
            <img src={qrDataUrl} alt="Booth QR Code" width={300} height={300} />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Instructions */}
      <p
        className="font-mono uppercase mt-8 mb-6"
        style={{ fontSize: '12px', letterSpacing: '4px', color: 'rgba(232,228,212,0.4)' }}
      >
        Scan to collect stamp
      </p>

      {/* Countdown */}
      <div className="flex flex-col items-center gap-3">
        <span
          className="font-mono"
          style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(232,228,212,0.3)' }}
        >
          Refreshing in {countdown}s
        </span>
        <div
          className="w-48 h-1"
          style={{ backgroundColor: 'rgba(232,228,212,0.1)' }}
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
