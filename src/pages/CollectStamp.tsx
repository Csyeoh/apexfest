import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../contexts/AuthContext'
import { parseBoothQrFromUrl, validateBoothQr } from '../lib/token'
import { getBoothById } from '../lib/booths'
import PageWrapper from '../components/PageWrapper'

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

  const accent = status === 'success' ? '#46f4ff' : status === 'error' ? '#ff4444' : '#46f4ff'

  return (
    <PageWrapper>
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
        {status === 'processing' || status === 'idle' ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="w-10 h-10 border-2 rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: 'rgba(0,180,216,0.3)', borderTopColor: '#00b4d8' }}
            />
            <span
              className="font-mono uppercase"
              style={{ fontSize: '12px', letterSpacing: '4px', color: '#00b4d8' }}
            >
              COLLECTING STAMP...
            </span>
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="mx-auto mb-6"
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                {status === 'success' ? (
                  <>
                    <circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="2" />
                    <path d="M8 12l2.5 2.5L16 9" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="2" />
                    <path d="M15 9l-6 6M9 9l6 6" stroke={accent} strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </motion.div>

            {/* Title */}
            <h1
              className="font-display font-bold uppercase tracking-wider mb-2"
              style={{ fontSize: '28px', color: accent }}
            >
              {status === 'success' ? 'STAMPED' : 'FAILED'}
            </h1>

            {/* Booth name / message */}
            <p
              className="font-mono mb-8"
              style={{ fontSize: '13px', letterSpacing: '1px', color: 'rgba(26,26,46,0.6)' }}
            >
              {message || boothName}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 items-center">
              {status === 'success' && (
                <Link
                  to="/stamps"
                  className="inline-block px-8 py-3 font-mono uppercase"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '3px',
                    backgroundColor: '#00b4d8',
                    color: '#1a1a2e',
                    textDecoration: 'none',
                  }}
                >
                  VIEW STAMPS
                </Link>
              )}
              {status === 'error' && (
                <>
                  <Link
                    to={`/collect/${boothId}?${searchParams.toString()}`}
                    onClick={() => { setStatus('idle'); setMessage('') }}
                    className="inline-block px-8 py-3 font-mono uppercase"
                    style={{
                      fontSize: '12px',
                      letterSpacing: '3px',
                      backgroundColor: 'transparent',
                      color: '#d7fdff',
                      border: '1px solid rgba(255,68,68,0.4)',
                      textDecoration: 'none',
                    }}
                  >
                    TRY AGAIN
                  </Link>
                  <Link
                    to="/stamps"
                    className="font-mono uppercase"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '2px',
                      color: 'rgba(26,26,46,0.4)',
                      textDecoration: 'none',
                    }}
                  >
                    GO TO STAMPS
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </section>
    </PageWrapper>
  )
}
