import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Html5Qrcode } from 'html5-qrcode'
import { doc, getDoc } from 'firebase/firestore'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../lib/firebase'
import { techfestBooths, gamefestBooths } from '../lib/booths'
import PinEntry from '../components/PinEntry'

interface UserData {
  displayName: string
  email: string
  stamps: Record<string, unknown>
}

export default function Verify() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('verify_unlocked') === 'true')
  const [pinError, setPinError] = useState('')
  const [scanning, setScanning] = useState(() => sessionStorage.getItem('verify_unlocked') === 'true')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [scanError, setScanError] = useState('')
  const processingRef = useRef(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)

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
        sessionStorage.setItem('verify_unlocked', 'true')
        setUnlocked(true)
        setPinError('')
        setScanning(true)
      } else {
        setPinError('Incorrect PIN')
      }
    } catch {
      setPinError('Failed to verify PIN')
    }
  }

  // Start/stop scanner
  useEffect(() => {
    if (!scanning) return

    const scannerId = 'verify-scanner-region'
    const scanner = new Html5Qrcode(scannerId)
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (processingRef.current) return
          processingRef.current = true

          try {
            // Stop scanner while we process
            await scanner.stop()
            setScanning(false)

            const userId = decodedText.trim()
            const userDoc = await getDoc(doc(db, 'users', userId))

            if (!userDoc.exists()) {
              setScanError('User not found')
              processingRef.current = false
              return
            }

            const data = userDoc.data() as UserData
            setUserData(data)
            setScanError('')
          } catch {
            setScanError('Failed to fetch user data')
          }
          processingRef.current = false
        },
        () => {},
      )
      .catch(() => {
        setScanError('Could not access camera')
      })

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [scanning])

  function resetScan() {
    setUserData(null)
    setScanError('')
    processingRef.current = false
    setScanning(true)
  }

  if (!unlocked) {
    return <PinEntry onSubmit={handlePin} error={pinError} />
  }

  const techfestStamps = techfestBooths.filter((b) => userData?.stamps?.[b.id])
  const gamefestStamps = gamefestBooths.filter((b) => userData?.stamps?.[b.id])
  const techfestDone = techfestStamps.length === techfestBooths.length
  const gamefestDone = gamefestStamps.length === gamefestBooths.length
  const bothDone = techfestDone && gamefestDone

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#0a0a0f' }}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,220,192,0.2)' }}>
        <span
          className="font-mono uppercase"
          style={{ fontSize: '11px', letterSpacing: '3px', color: '#00dcc0' }}
        >
          // VERIFICATION STATION
        </span>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem('verify_unlocked')
            setUnlocked(false)
          }}
          className="font-mono uppercase cursor-pointer bg-transparent border-none"
          style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(232,228,212,0.3)' }}
        >
          LOCK
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {!userData && !scanning && scanError && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p
              className="font-mono mb-4"
              style={{ fontSize: '11px', color: '#ff4444', letterSpacing: '0.5px' }}
            >
              {scanError}
            </p>
            <motion.button
              type="button"
              onClick={() => {
                setScanError('')
                processingRef.current = false
                setScanning(true)
              }}
              className="px-8 py-4 font-mono uppercase cursor-pointer"
              style={{
                fontSize: '13px',
                letterSpacing: '4px',
                backgroundColor: 'transparent',
                color: '#e8e4d4',
                border: '1px solid rgba(232,228,212,0.3)',
              }}
              whileHover={{ borderColor: '#00dcc0', color: '#00dcc0' }}
              whileTap={{ scale: 0.98 }}
            >
              TRY AGAIN
            </motion.button>
          </motion.div>
        )}

        {scanning && (
          <div className="w-full max-w-sm" style={{ border: '2px solid rgba(0,220,192,0.3)' }}>
            <div id="verify-scanner-region" className="w-full" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {userData && (
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key="result"
            >
              {/* User info */}
              <div className="text-center mb-8">
                <h2
                  className="font-display font-bold tracking-wider"
                  style={{ fontSize: '22px', color: '#e8e4d4' }}
                >
                  {userData.displayName || 'Unknown User'}
                </h2>
                <p
                  className="font-mono mt-1"
                  style={{ fontSize: '11px', color: 'rgba(232,228,212,0.4)' }}
                >
                  {userData.email}
                </p>
              </div>

              {/* TechFest stamps */}
              <div className="mb-6">
                <h3
                  className="font-mono uppercase mb-3"
                  style={{ fontSize: '11px', letterSpacing: '3px', color: '#00dcc0' }}
                >
                  TECHFEST STAMPS
                </h3>
                {techfestBooths.map((booth) => {
                  const stamped = !!userData.stamps?.[booth.id]
                  return (
                    <div
                      key={booth.id}
                      className="flex items-center justify-between py-2"
                      style={{ borderBottom: '1px solid rgba(0,220,192,0.06)' }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '12px',
                            color: stamped ? '#00dcc0' : 'rgba(232,228,212,0.2)',
                          }}
                        >
                          {stamped ? '[X]' : '[ ]'}
                        </span>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '12px',
                            letterSpacing: '0.5px',
                            color: stamped ? '#e8e4d4' : 'rgba(232,228,212,0.3)',
                          }}
                        >
                          {booth.code} - {booth.name}
                        </span>
                      </span>
                      {!stamped && (
                        <span
                          className="font-mono uppercase"
                          style={{ fontSize: '9px', letterSpacing: '2px', color: '#ff4444' }}
                        >
                          MISSING
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* GameFest stamps */}
              <div className="mb-8">
                <h3
                  className="font-mono uppercase mb-3"
                  style={{ fontSize: '11px', letterSpacing: '3px', color: '#ffb830' }}
                >
                  GAMEFEST STAMPS
                </h3>
                {gamefestBooths.map((booth) => {
                  const stamped = !!userData.stamps?.[booth.id]
                  return (
                    <div
                      key={booth.id}
                      className="flex items-center justify-between py-2"
                      style={{ borderBottom: '1px solid rgba(255,184,48,0.06)' }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '12px',
                            color: stamped ? '#ffb830' : 'rgba(232,228,212,0.2)',
                          }}
                        >
                          {stamped ? '[X]' : '[ ]'}
                        </span>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '12px',
                            letterSpacing: '0.5px',
                            color: stamped ? '#e8e4d4' : 'rgba(232,228,212,0.3)',
                          }}
                        >
                          {booth.code} - {booth.name}
                        </span>
                      </span>
                      {!stamped && (
                        <span
                          className="font-mono uppercase"
                          style={{ fontSize: '9px', letterSpacing: '2px', color: '#ff4444' }}
                        >
                          MISSING
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Eligibility status */}
              <div className="flex flex-col gap-3">
                {/* TechFest */}
                <div
                  className="p-4 flex items-center justify-between"
                  style={{
                    backgroundColor: techfestDone ? 'rgba(0,220,192,0.08)' : 'rgba(255,68,68,0.05)',
                    border: `1px solid ${techfestDone ? 'rgba(0,220,192,0.4)' : 'rgba(255,68,68,0.2)'}`,
                  }}
                >
                  <div>
                    <span
                      className="font-mono uppercase block"
                      style={{ fontSize: '11px', letterSpacing: '2px', color: '#00dcc0' }}
                    >
                      TECHFEST
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(232,228,212,0.4)' }}
                    >
                      {techfestStamps.length}/{techfestBooths.length} stamps
                    </span>
                  </div>
                  <span
                    className="font-display font-bold uppercase tracking-wider"
                    style={{ fontSize: '14px', color: techfestDone ? '#00dcc0' : '#ff4444' }}
                  >
                    {techfestDone ? 'STICKER' : 'INCOMPLETE'}
                  </span>
                </div>

                {/* GameFest */}
                <div
                  className="p-4 flex items-center justify-between"
                  style={{
                    backgroundColor: gamefestDone ? 'rgba(255,184,48,0.08)' : 'rgba(255,68,68,0.05)',
                    border: `1px solid ${gamefestDone ? 'rgba(255,184,48,0.4)' : 'rgba(255,68,68,0.2)'}`,
                  }}
                >
                  <div>
                    <span
                      className="font-mono uppercase block"
                      style={{ fontSize: '11px', letterSpacing: '2px', color: '#ffb830' }}
                    >
                      GAMEFEST
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(232,228,212,0.4)' }}
                    >
                      {gamefestStamps.length}/{gamefestBooths.length} stamps
                    </span>
                  </div>
                  <span
                    className="font-display font-bold uppercase tracking-wider"
                    style={{ fontSize: '14px', color: gamefestDone ? '#ffb830' : '#ff4444' }}
                  >
                    {gamefestDone ? 'STICKER' : 'INCOMPLETE'}
                  </span>
                </div>

                {/* Both complete */}
                {bothDone && (
                  <motion.div
                    className="p-4 text-center"
                    style={{
                      backgroundColor: 'rgba(0,220,192,0.1)',
                      border: '2px solid #00dcc0',
                      boxShadow: '0 0 30px rgba(0,220,192,0.15)',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span
                      className="block font-display font-bold uppercase tracking-wider"
                      style={{ fontSize: '18px', color: '#00dcc0' }}
                    >
                      KEYCAPS
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(232,228,212,0.5)' }}
                    >
                      ALL EVENTS COMPLETED
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Scan another button */}
              <motion.button
                type="button"
                onClick={resetScan}
                className="w-full mt-6 py-3 font-mono uppercase cursor-pointer"
                style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  backgroundColor: 'transparent',
                  color: 'rgba(232,228,212,0.5)',
                  border: '1px solid rgba(232,228,212,0.15)',
                }}
                whileHover={{ borderColor: '#00dcc0', color: '#00dcc0' }}
                whileTap={{ scale: 0.98 }}
              >
                SCAN ANOTHER
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
