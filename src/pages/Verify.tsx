import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Html5Qrcode } from 'html5-qrcode'
import { doc, getDoc } from 'firebase/firestore'
import { signInAnonymously } from 'firebase/auth'
import { db, auth } from '../lib/firebase'
import { booths, techfestBooths, gamefestBooths } from '../lib/booths'
import PinEntry from '../components/PinEntry'

interface UserData {
  displayName: string
  email: string
  stamps: Record<string, unknown>
}

export default function Verify() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('verify_unlocked') === 'true')
  const [pinError, setPinError] = useState('')
  const [scanning, setScanning] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [scanError, setScanError] = useState('')
  const processingRef = useRef(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)

  // Sign in anonymously for Firestore reads
  useEffect(() => {
    signInAnonymously(auth).catch(() => {})
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
  }

  if (!unlocked) {
    return <PinEntry onSubmit={handlePin} error={pinError} />
  }

  const allStamps = booths.filter((b) => userData?.stamps?.[b.id])
  const isEligible = allStamps.length === booths.length

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
        {!userData && !scanning && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {scanError && (
              <p
                className="font-mono mb-4"
                style={{ fontSize: '11px', color: '#ff4444', letterSpacing: '0.5px' }}
              >
                {scanError}
              </p>
            )}
            <motion.button
              type="button"
              onClick={() => {
                setScanError('')
                setScanning(true)
              }}
              className="px-8 py-4 font-mono uppercase cursor-pointer"
              style={{
                fontSize: '13px',
                letterSpacing: '4px',
                backgroundColor: '#00dcc0',
                color: '#0a0a0f',
                border: 'none',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SCAN USER QR
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
              <div
                className="p-6 text-center"
                style={{
                  backgroundColor: isEligible ? 'rgba(0,220,192,0.08)' : 'rgba(255,68,68,0.08)',
                  border: `2px solid ${isEligible ? '#00dcc0' : '#ff4444'}`,
                  boxShadow: isEligible ? '0 0 30px rgba(0,220,192,0.15)' : 'none',
                }}
              >
                <span
                  className="block font-display font-bold uppercase tracking-wider mb-1"
                  style={{ fontSize: '20px', color: isEligible ? '#00dcc0' : '#ff4444' }}
                >
                  {isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                </span>
                <span
                  className="font-mono"
                  style={{ fontSize: '12px', letterSpacing: '2px', color: 'rgba(232,228,212,0.5)' }}
                >
                  {allStamps.length}/{booths.length} STAMPS
                </span>
                {isEligible && (
                  <motion.p
                    className="mt-3 font-mono uppercase"
                    style={{ fontSize: '11px', letterSpacing: '2px', color: '#00dcc0' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Gift can be issued
                  </motion.p>
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
