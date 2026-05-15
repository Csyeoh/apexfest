import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../contexts/AuthContext'
import { parseBoothQrFromUrl, validateBoothQr } from '../lib/token'
import { getBoothById } from '../lib/booths'

type Status = 'idle' | 'processing' | 'success' | 'error'

export default function CollectStamp() {
  const { boothId } = useParams<{ boothId: string }>()
  const [searchParams] = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [boothName, setBoothName] = useState('')

  // Collect stamp once user is authenticated
  useEffect(() => {
    if (authLoading || !user || !boothId || status !== 'idle') return

    const booth = getBoothById(boothId)
    if (!booth) {
      setStatus('error')
      setMessage('Booth not found')
      return
    }

    const payload = parseBoothQrFromUrl(searchParams, boothId)
    if (!payload) {
      setStatus('error')
      setMessage('Invalid QR link — missing token')
      return
    }

    setStatus('processing')

    // Check if already stamped, then validate and collect
    const unsub = onSnapshot(doc(db, 'users', user.uid), async (snap) => {
      unsub() // only need one read

      const stamps = snap.data()?.stamps ?? {}
      if (stamps[boothId]) {
        setStatus('error')
        setMessage(`Already stamped: ${booth.name}`)
        setBoothName(booth.name)
        return
      }

      const isValid = await validateBoothQr(payload, booth.secret)
      if (!isValid) {
        setStatus('error')
        setMessage('Token expired — scan the QR code again')
        return
      }

      try {
        await updateDoc(doc(db, 'users', user.uid), {
          [`stamps.${boothId}`]: serverTimestamp(),
        })
        setStatus('success')
        setBoothName(booth.name)
        setMessage(`${booth.code} — ${booth.name}`)
      } catch {
        setStatus('error')
        setMessage('Something went wrong')
      }
    })
  }, [user, authLoading, boothId, searchParams, status]) // eslint-disable-line react-hooks/exhaustive-deps

  // If not logged in, redirect to login with return URL
  if (!authLoading && !user) {
    const currentUrl = `/collect/${boothId}?${searchParams.toString()}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(currentUrl)}`} replace />
  }

  const isSuccess = status === 'success'
  const isError = status === 'error'
  const accent = isSuccess ? '#46f4ff' : isError ? '#ff4444' : '#46f4ff'

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#081120' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${accent}33` }}>
        <span
          className="font-mono uppercase"
          style={{ fontSize: '11px', letterSpacing: '3px', color: accent }}
        >
          {isSuccess ? '// STAMPED' : isError ? '// FAILED' : '// COLLECTING'}
        </span>
        <Link
          to="/stamps"
          className="font-mono uppercase bg-transparent border-none"
          style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(215,253,255,0.5)', textDecoration: 'none' }}
        >
          CLOSE
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {status === 'processing' || status === 'idle' ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-3"
              style={{ borderColor: 'rgba(70,244,255,0.3)', borderTopColor: '#46f4ff' }}
            />
            <span
              className="font-mono"
              style={{ fontSize: '11px', letterSpacing: '3px', color: '#46f4ff' }}
            >
              VALIDATING...
            </span>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                {isSuccess ? (
                  <>
                    <circle cx="12" cy="12" r="10" stroke="#46f4ff" strokeWidth="2" />
                    <path d="M8 12l2.5 2.5L16 9" stroke="#46f4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" stroke="#ff4444" strokeWidth="2" />
                    <path d="M15 9l-6 6M9 9l6 6" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </motion.div>

            {/* Title */}
            <motion.span
              className="font-display font-bold uppercase tracking-wider mt-4"
              style={{ fontSize: isSuccess ? '20px' : '16px', color: accent }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isSuccess ? 'STAMPED' : 'FAILED'}
            </motion.span>

            {/* Booth name / message */}
            <motion.span
              className="font-mono mt-2 text-center"
              style={{ fontSize: '12px', letterSpacing: '1px', color: 'rgba(215,253,255,0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {message || boothName}
            </motion.span>

            {/* Action button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isSuccess ? (
                <Link
                  to="/stamps"
                  className="mt-6 px-6 py-3 font-mono uppercase inline-block"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '3px',
                    backgroundColor: '#46f4ff',
                    color: '#081120',
                    textDecoration: 'none',
                  }}
                >
                  VIEW STAMPS
                </Link>
              ) : (
                <Link
                  to={`/collect/${boothId}?${searchParams.toString()}`}
                  onClick={() => { setStatus('idle'); setMessage('') }}
                  className="mt-6 px-6 py-3 font-mono uppercase inline-block"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '3px',
                    backgroundColor: 'transparent',
                    color: '#d7fdff',
                    border: '1px solid rgba(255,68,68,0.4)',
                    textDecoration: 'none',
                  }}
                >
                  TRY AGAIN
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
