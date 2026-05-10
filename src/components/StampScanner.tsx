import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Html5Qrcode } from 'html5-qrcode'
import { useAuth } from '../contexts/AuthContext'
import { parseBoothQr, validateBoothQr } from '../lib/token'
import { getBoothById } from '../lib/booths'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

interface StampScannerProps {
  onClose: () => void
  onStamped: (boothId: string) => void
  existingStamps: Record<string, unknown>
}

type ScanState = 'scanning' | 'processing' | 'success' | 'error'

export default function StampScanner({ onClose, onStamped, existingStamps }: StampScannerProps) {
  const { user } = useAuth()
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const processingRef = useRef(false)
  const [state, setState] = useState<ScanState>('scanning')
  const [resultMsg, setResultMsg] = useState('')
  const [successBooth, setSuccessBooth] = useState('')
  const [cameraError, setCameraError] = useState('')

  useEffect(() => {
    const scannerId = 'stamp-scanner-region'
    const scanner = new Html5Qrcode(scannerId)
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          aspectRatio: 1.0,
        },
        async (decodedText) => {
          if (processingRef.current) return
          processingRef.current = true

          setState('processing')
          setResultMsg('')

          try {
            const payload = parseBoothQr(decodedText)
            if (!payload) {
              showError('Invalid QR code')
              return
            }

            const booth = getBoothById(payload.booth)
            if (!booth) {
              showError('Unknown booth')
              return
            }

            if (existingStamps[payload.booth]) {
              showError(`Already stamped: ${booth.name}`)
              return
            }

            const isValid = await validateBoothQr(payload, booth.secret)
            if (!isValid) {
              showError('Token expired — try scanning again')
              return
            }

            await updateDoc(doc(db, 'users', user!.uid), {
              [`stamps.${payload.booth}`]: serverTimestamp(),
            })

            setState('success')
            setSuccessBooth(booth.name)
            setResultMsg(`${booth.code} — ${booth.name}`)
            onStamped(payload.booth)
          } catch {
            showError('Something went wrong')
          }
        },
        () => {},
      )
      .catch(() => {
        setCameraError('Could not access camera. Make sure you are using HTTPS on mobile.')
      })

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function showError(msg: string) {
    setState('error')
    setResultMsg(msg)
    processingRef.current = false
  }

  function handleScanAgain() {
    setState('scanning')
    setResultMsg('')
    setSuccessBooth('')
    processingRef.current = false
  }

  const isSuccess = state === 'success'
  const isError = state === 'error'
  const accent = isSuccess ? '#46f4ff' : isError ? '#ff4444' : '#46f4ff'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: '#081120' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${accent}33` }}>
        <span
          className="font-mono uppercase"
          style={{ fontSize: '11px', letterSpacing: '3px', color: accent }}
        >
          {isSuccess ? '// STAMPED' : isError ? '// FAILED' : '// SCAN QR'}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono uppercase cursor-pointer bg-transparent border-none"
          style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(215,253,255,0.5)' }}
        >
          CLOSE
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {cameraError ? (
          <div className="text-center">
            <p className="font-mono mb-4" style={{ fontSize: '13px', color: '#ff4444', letterSpacing: '1px' }}>
              {cameraError}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 font-mono uppercase cursor-pointer"
              style={{
                fontSize: '11px',
                letterSpacing: '3px',
                backgroundColor: 'transparent',
                color: '#d7fdff',
                border: '1px solid rgba(215,253,255,0.2)',
              }}
            >
              GO BACK
            </button>
          </div>
        ) : (
          <>
            {/* Scanner box */}
            <div
              className="relative overflow-hidden"
              style={{
                width: '280px',
                height: '280px',
                border: `2px solid ${accent}${isSuccess || isError ? '' : '44'}`,
              }}
            >
              {/* Camera feed (only this child renders) */}
              <div
                id="stamp-scanner-region"
                style={{
                  width: '280px',
                  height: '280px',
                  objectFit: 'cover',
                }}
              />

              {/* Scanning frame corners (shown only while scanning) */}
              {state === 'scanning' && (
                <>
                  {/* Top-left */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: accent }} />
                  {/* Top-right */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: accent }} />
                  {/* Bottom-left */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: accent }} />
                  {/* Bottom-right */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: accent }} />
                </>
              )}

              {/* Processing overlay */}
              <AnimatePresence>
                {state === 'processing' && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(10,10,15,0.85)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <div
                        className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-3"
                        style={{ borderColor: 'rgba(70,244,255,0.3)', borderTopColor: '#46f4ff' }}
                      />
                      <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '3px', color: '#46f4ff' }}>
                        VALIDATING...
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ backgroundColor: 'rgba(10,10,15,0.92)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                    >
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#46f4ff" strokeWidth="2" />
                        <path d="M8 12l2.5 2.5L16 9" stroke="#46f4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <motion.span
                      className="font-display font-bold uppercase tracking-wider mt-4"
                      style={{ fontSize: '20px', color: '#46f4ff' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      STAMPED
                    </motion.span>
                    <motion.span
                      className="font-mono mt-2"
                      style={{ fontSize: '12px', letterSpacing: '1px', color: 'rgba(215,253,255,0.6)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      {successBooth}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error overlay */}
              <AnimatePresence>
                {isError && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ backgroundColor: 'rgba(10,10,15,0.92)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                    >
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#ff4444" strokeWidth="2" />
                        <path d="M15 9l-6 6M9 9l6 6" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                    <motion.span
                      className="font-display font-bold uppercase tracking-wider mt-4"
                      style={{ fontSize: '16px', color: '#ff4444' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      FAILED
                    </motion.span>
                    <motion.span
                      className="font-mono mt-2 text-center"
                      style={{ fontSize: '12px', letterSpacing: '1px', color: 'rgba(215,253,255,0.6)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      {resultMsg}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action button for success/error */}
            {(isSuccess || isError) && (
              <motion.button
                type="button"
                onClick={handleScanAgain}
                className="mt-6 px-6 py-3 font-mono uppercase cursor-pointer"
                style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  backgroundColor: isSuccess ? '#46f4ff' : 'transparent',
                  color: isSuccess ? '#081120' : '#d7fdff',
                  border: isSuccess ? 'none' : '1px solid rgba(255,68,68,0.4)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={!isSuccess ? { borderColor: '#ff4444', color: '#ff4444' } : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSuccess ? 'SCAN AGAIN' : 'TRY AGAIN'}
              </motion.button>
            )}

            {/* Hint text */}
            {state === 'scanning' && (
              <p
                className="font-mono mt-6 text-center"
                style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(215,253,255,0.3)' }}
              >
                Point camera at booth QR code
              </p>
            )}
          </>
        )}
      </div>

      {/* Hide all html5-qrcode UI elements — show only the raw video */}
      <style>{`
        #stamp-scanner-region {
          background: #081120 !important;
        }
        #stamp-scanner-region video {
          width: 280px !important;
          height: 280px !important;
          object-fit: cover !important;
        }
        #stamp-scanner-region__dashboard,
        #stamp-scanner-region__dashboard_section,
        #stamp-scanner-region__dashboard_section_csr,
        #stamp-scanner-region__dashboard_section_swaplink,
        #stamp-scanner-region__header_message,
        #stamp-scanner-region__status_span,
        #stamp-scanner-region img,
        #stamp-scanner-region svg,
        #stamp-scanner-region [style*="border"] {
          display: none !important;
        }
        #stamp-scanner-region > div:not(:first-child) {
          display: none !important;
        }
      `}</style>
    </motion.div>
  )
}
