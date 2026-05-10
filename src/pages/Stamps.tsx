import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../contexts/AuthContext'
import { booths, techfestBooths, gamefestBooths } from '../lib/booths'
import PageWrapper from '../components/PageWrapper'
import StampCard from '../components/StampCard'
import StampScanner from '../components/StampScanner'
import QrDisplay from '../components/QrDisplay'

export default function Stamps() {
  const { user } = useAuth()
  const [stamps, setStamps] = useState<Record<string, unknown>>({})
  const [scannerOpen, setScannerOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const unsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      if (snap.exists()) {
        setStamps(snap.data().stamps ?? {})
      }
      setLoading(false)
    })
    return unsub
  }, [user])

  const handleStamped = useCallback((boothId: string) => {
    // The onSnapshot listener will update stamps automatically
    void boothId
  }, [])

  const techfestCount = techfestBooths.filter((b) => stamps[b.id]).length
  const gamefestCount = gamefestBooths.filter((b) => stamps[b.id]).length
  const totalCount = booths.filter((b) => stamps[b.id]).length
  const allTechfest = techfestCount === techfestBooths.length
  const allGamefest = gamefestCount === gamefestBooths.length
  const allComplete = totalCount === booths.length

  const accent = allComplete ? '#46f4ff' : 'rgba(215,253,255,0.5)'

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-[80vh] flex items-center justify-center">
          <span
            className="font-mono animate-pulse"
            style={{ fontSize: '12px', letterSpacing: '4px', color: '#46f4ff' }}
          >
            LOADING STAMPS...
          </span>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <p
            className="eyebrow font-mono uppercase mb-3"
            style={{ fontSize: '10px', letterSpacing: '4px', color: '#46f4ff' }}
          >
            // STAMP CARD
          </p>
          <h1
            className="font-display font-bold tracking-wider"
            style={{ fontSize: '28px', color: '#d7fdff' }}
          >
            YOUR STAMPS
          </h1>
          <hr className="hr-techfest mt-4" style={{ maxWidth: '120px' }} />
        </div>

        {/* Progress */}
        <div
          className="mb-10 p-6"
          style={{
            backgroundColor: 'rgba(15,15,26,0.6)',
            border: `1px solid ${accent}`,
            boxShadow: allComplete ? `0 0 30px ${accent}22` : 'none',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="font-mono uppercase"
              style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(215,253,255,0.5)' }}
            >
              TOTAL PROGRESS
            </span>
            <span
              className="font-mono"
              style={{ fontSize: '14px', letterSpacing: '2px', color: accent }}
            >
              {totalCount}/{booths.length}
            </span>
          </div>
          <div
            className="w-full h-1"
            style={{ backgroundColor: 'rgba(215,253,255,0.1)' }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: '#46f4ff' }}
              initial={{ width: 0 }}
              animate={{ width: `${(totalCount / booths.length) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          {allComplete && (
            <motion.p
              className="mt-4 font-mono text-center uppercase"
              style={{ fontSize: '12px', letterSpacing: '3px', color: '#46f4ff' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ALL STAMPS COLLECTED — GO TO CLAIM STATION
            </motion.p>
          )}
        </div>

        {/* TechFest Stamps */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-mono uppercase"
              style={{ fontSize: '12px', letterSpacing: '3px', color: '#46f4ff' }}
            >
              TECHFEST
            </h2>
            <span
              className="font-mono"
              style={{ fontSize: '11px', letterSpacing: '2px', color: allTechfest ? '#46f4ff' : 'rgba(215,253,255,0.3)' }}
            >
              {techfestCount}/{techfestBooths.length}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {techfestBooths.map((booth, i) => (
              <StampCard
                key={booth.id}
                booth={booth}
                isStamped={!!stamps[booth.id]}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* GameFest Stamps */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-mono uppercase"
              style={{ fontSize: '12px', letterSpacing: '3px', color: '#ff007f' }}
            >
              GAMEFEST
            </h2>
            <span
              className="font-mono"
              style={{ fontSize: '11px', letterSpacing: '2px', color: allGamefest ? '#ff007f' : 'rgba(215,253,255,0.3)' }}
            >
              {gamefestCount}/{gamefestBooths.length}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gamefestBooths.map((booth, i) => (
              <StampCard
                key={booth.id}
                booth={booth}
                isStamped={!!stamps[booth.id]}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Scan Button */}
        <motion.button
          type="button"
          onClick={() => setScannerOpen(true)}
          className="w-full py-4 font-mono uppercase cursor-pointer"
          style={{
            fontSize: '13px',
            letterSpacing: '4px',
            backgroundColor: '#46f4ff',
            color: '#081120',
            border: 'none',
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          SCAN BOOTH QR
        </motion.button>

        {/* Verification QR */}
        <div className="mt-14 text-center">
          <p
            className="font-mono uppercase mb-2"
            style={{ fontSize: '10px', letterSpacing: '4px', color: 'rgba(215,253,255,0.4)' }}
          >
            YOUR VERIFICATION CODE
          </p>
          <p
            className="font-mono mb-6"
            style={{ fontSize: '11px', color: 'rgba(215,253,255,0.3)' }}
          >
            Show this to the claim station
          </p>
          <QrDisplay data={user?.uid ?? ''} size={180} />
        </div>
      </section>

      {/* Scanner Overlay */}
      <AnimatePresence>
        {scannerOpen && (
          <StampScanner
            onClose={() => setScannerOpen(false)}
            onStamped={handleStamped}
            existingStamps={stamps}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
