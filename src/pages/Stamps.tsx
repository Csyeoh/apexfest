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

/* ========================================
   CARD FACE — shared layout for each side
   ======================================== */

interface CardFaceProps {
  title: string
  subtitle: string
  accent: string
  accentDim: string
  booths: typeof gamefestBooths
  stamps: Record<string, unknown>
  count: number
  total: number
}

function CardFace({ title, subtitle, accent, accentDim, booths: faceBooths, stamps, count, total }: CardFaceProps) {
  const isComplete = count === total

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.97)',
        border: `1px solid ${accentDim}`,
      }}
    >
      {/* Event label */}
      <p
        className="font-mono uppercase mb-1"
        style={{ fontSize: '9px', letterSpacing: '3px', color: accent, opacity: 0.7 }}
      >
        {subtitle}
      </p>
      <h2
        className="font-display font-bold uppercase tracking-wider mb-8"
        style={{ fontSize: '20px', color: '#1a1a2e' }}
      >
        {title}
      </h2>

      {/* Stamp boxes */}
      <div
        className="flex flex-wrap justify-center gap-4 mb-8"
        style={{ maxWidth: faceBooths.length > 3 ? '320px' : '300px' }}
      >
        {faceBooths.map((booth, i) => (
          <StampCard
            key={booth.id}
            booth={booth}
            isStamped={!!stamps[booth.id]}
            index={i}
          />
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div
          className="h-[1px] flex-1"
          style={{ backgroundColor: accentDim, minWidth: '30px' }}
        />
        <span
          className="font-mono"
          style={{ fontSize: '11px', letterSpacing: '2px', color: isComplete ? accent : 'rgba(26,26,46,0.35)' }}
        >
          {count}/{total}
        </span>
        <div
          className="h-[1px] flex-1"
          style={{ backgroundColor: accentDim, minWidth: '30px' }}
        />
      </div>

      {/* Complete badge */}
      {isComplete && (
        <motion.p
          className="mt-4 font-mono uppercase text-center"
          style={{ fontSize: '9px', letterSpacing: '3px', color: accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ALL COLLECTED
        </motion.p>
      )}
    </div>
  )
}

/* ========================================
   STAMPS PAGE
   ======================================== */

export default function Stamps() {
  const { user } = useAuth()
  const [stamps, setStamps] = useState<Record<string, unknown>>({})
  const [scannerOpen, setScannerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [flipped, setFlipped] = useState(false)

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
    void boothId
  }, [])

  const techfestCount = techfestBooths.filter((b) => stamps[b.id]).length
  const gamefestCount = gamefestBooths.filter((b) => stamps[b.id]).length
  const totalCount = booths.filter((b) => stamps[b.id]).length
  const allComplete = totalCount === booths.length

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-[80vh] flex items-center justify-center">
          <span
            className="font-mono animate-pulse"
            style={{ fontSize: '12px', letterSpacing: '4px', color: '#00b4d8' }}
          >
            LOADING STAMPS...
          </span>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <section className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="font-mono uppercase mb-3"
            style={{ fontSize: '10px', letterSpacing: '4px', color: '#00b4d8' }}
          >
            // STAMP CARD
          </p>
          <h1
            className="font-display font-bold tracking-wider mb-2"
            style={{ fontSize: '28px', color: '#1a1a2e' }}
          >
            YOUR STAMPS
          </h1>
          <div className="w-24 h-[1px] bg-techfest mx-auto" />
        </div>

        {/* Total progress bar */}
        <div className="w-full max-w-sm mb-10">
          <div className="flex items-center justify-between mb-2">
            <span
              className="font-mono uppercase"
              style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(26,26,46,0.4)' }}
            >
              TOTAL
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '12px',
                letterSpacing: '2px',
                color: allComplete ? '#00b4d8' : 'rgba(26,26,46,0.4)',
              }}
            >
              {totalCount}/{booths.length}
            </span>
          </div>
          <div
            className="w-full h-1"
            style={{ backgroundColor: 'rgba(26,26,46,0.08)' }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: '#00b4d8' }}
              initial={{ width: 0 }}
              animate={{ width: `${(totalCount / booths.length) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* All complete banner */}
        {allComplete && (
          <motion.div
            className="w-full max-w-sm mb-8 p-4 text-center"
            style={{
              border: '1px solid rgba(0,180,216,0.3)',
              backgroundColor: 'rgba(0,180,216,0.05)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p
              className="font-mono uppercase"
              style={{ fontSize: '11px', letterSpacing: '3px', color: '#00b4d8' }}
            >
              ALL STAMPS COLLECTED — GO TO CLAIM STATION
            </p>
          </motion.div>
        )}

        {/* Flip hint */}
        <p
          className="font-mono mb-4 flex items-center gap-2"
          style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(26,26,46,0.25)' }}
        >
          <span
            className="inline-block spin-slow"
            style={{ fontSize: '14px' }}
          >
            ⟳
          </span>
          TAP TO FLIP
        </p>

        {/* Flip card */}
        <div
          className="relative cursor-pointer float-gentle"
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '380px',
            perspective: '1200px',
          }}
          onClick={() => setFlipped((f) => !f)}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Front: GameFest */}
            <CardFace
              title="Game Fest"
              subtitle="DAY 1 · MAY 23"
              accent="#ff007f"
              accentDim="rgba(255,0,127,0.15)"
              booths={gamefestBooths}
              stamps={stamps}
              count={gamefestCount}
              total={gamefestBooths.length}
            />

            {/* Back: TechFest */}
            <div
              className="absolute inset-0"
              style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <CardFace
                title="TechFest 2.0"
                subtitle="DAY 2 · MAY 24"
                accent="#00b4d8"
                accentDim="rgba(0,180,216,0.15)"
                booths={techfestBooths}
                stamps={stamps}
                count={techfestCount}
                total={techfestBooths.length}
              />
            </div>
          </motion.div>
        </div>

        {/* Scan button */}
        <motion.button
          type="button"
          onClick={() => setScannerOpen(true)}
          className="mt-10 w-full max-w-sm py-4 font-mono uppercase cursor-pointer"
          style={{
            fontSize: '13px',
            letterSpacing: '4px',
            backgroundColor: '#00b4d8',
            color: '#1a1a2e',
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
            style={{ fontSize: '10px', letterSpacing: '4px', color: 'rgba(26,26,46,0.4)' }}
          >
            YOUR VERIFICATION CODE
          </p>
          <p
            className="font-mono mb-6"
            style={{ fontSize: '11px', color: 'rgba(26,26,46,0.3)' }}
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
