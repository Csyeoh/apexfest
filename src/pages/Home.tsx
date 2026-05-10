import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import About from './About'
import Sponsors from './Sponsors'
import FAQ from '../components/FAQ'

/* ========================================
   CORNER BRACKET — animated draw-in
   ======================================== */

function CornerBracketTopLeft() {
  return (
    <div className="absolute top-4 left-4 md:top-6 md:left-6 pointer-events-none z-10">
      {/* Horizontal bar */}
      <motion.div
        className="absolute top-0 left-0 h-[2px]"
        style={{ backgroundColor: '#ff007f' }}
        initial={{ width: 0 }}
        animate={{ width: 20 }}
        transition={{ duration: 0.3, delay: 1.2, ease: 'easeOut' }}
      />
      {/* Vertical bar */}
      <motion.div
        className="absolute top-0 left-0 w-[2px]"
        style={{ backgroundColor: '#ff007f' }}
        initial={{ height: 0 }}
        animate={{ height: 20 }}
        transition={{ duration: 0.3, delay: 1.3, ease: 'easeOut' }}
      />
    </div>
  )
}

function CornerBracketBottomRight() {
  return (
    <div className="absolute bottom-14 right-4 md:bottom-14 md:right-6 pointer-events-none z-10">
      {/* Horizontal bar — draws right to left */}
      <motion.div
        className="absolute bottom-0 right-0 h-[2px]"
        style={{ backgroundColor: '#00dcc0' }}
        initial={{ width: 0 }}
        animate={{ width: 20 }}
        transition={{ duration: 0.3, delay: 1.2, ease: 'easeOut' }}
      />
      {/* Vertical bar — draws bottom to top */}
      <motion.div
        className="absolute bottom-0 right-0 w-[2px]"
        style={{ backgroundColor: '#00dcc0' }}
        initial={{ height: 0 }}
        animate={{ height: 20 }}
        transition={{ duration: 0.3, delay: 1.3, ease: 'easeOut' }}
      />
    </div>
  )
}

/* ========================================
   STATUS BAR
   ======================================== */

const STATUS_TEXT = 'SYS::APEXFEST — ONLINE'

function HeroStatusBar() {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    // Wait for the status bar to fade in (1.1s delay) before starting typewriter
    const startDelay = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(STATUS_TEXT.slice(0, i))
        if (i >= STATUS_TEXT.length) clearInterval(interval)
      }, 40)
      return () => clearInterval(interval)
    }, 1100)
    return () => clearTimeout(startDelay)
  }, [])

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 bg-surface/80 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 z-10"
      style={{ borderTop: '1px solid rgba(70,244,255,0.1)' }}
      role="status"
      aria-label="Event status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.1, ease: 'easeOut' }}
    >
      <span
        className="font-mono text-techfest"
        style={{ fontSize: '10px', letterSpacing: '2px', minWidth: '220px' }}
      >
        {displayed}
        <span className="animate-pulse" aria-hidden="true">▌</span>
      </span>

      <div className="flex items-center gap-2">
        <span className="pulse-dot pulse-dot-cyan" aria-hidden="true" />
        <span
          className="font-mono text-techfest"
          style={{ fontSize: '10px', letterSpacing: '2px' }}
        >
          LIVE
        </span>
      </div>

    </motion.div>
  )
}

/* ========================================
   EVENT CARD — with hover animations
   ======================================== */

interface EventCardProps {
  accent: 'gamefest' | 'techfest'
  tag: string
  title: string
  description: string
  metaItems: string[]
  to: string
  delay: number
}

function EventCard({ accent, tag, title, description, metaItems, to, delay }: EventCardProps) {
  const navigate = useNavigate()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true)
    }, (delay + 0.6) * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  const isAmber = accent === 'gamefest'
  const accentColor = isAmber ? '#ff007f' : '#00dcc0'
  const accentColorMuted = isAmber ? 'rgba(255,0,127,0.15)' : 'rgba(70,244,255,0.15)'
  const borderMuted = isAmber ? 'rgba(255,0,127,0.25)' : 'rgba(70,244,255,0.25)'
  const borderHover = isAmber ? 'rgba(255,0,127,0.6)' : 'rgba(70,244,255,0.6)'
  const bgHover = isAmber ? 'rgba(255,0,127,0.04)' : 'rgba(70,244,255,0.04)'

  return (
    <motion.button
      type="button"
      onClick={() => navigate(to)}
      className="group relative text-left w-full cursor-pointer"
      style={{
        border: `1px solid ${borderMuted}`,
        backgroundColor: 'transparent',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: hasMounted ? 0.2 : 0.6,
        delay: hasMounted ? 0 : delay,
        ease: hasMounted ? 'easeOut' : [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{
        y: -6,
        borderColor: borderHover,
        backgroundColor: bgHover,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      aria-label={`View ${title} details`}
    >
      {/* Top accent line — positioned at top edge */}
      <div
        className="absolute left-0 right-0 h-[2px]"
        style={{ top: '-1px', backgroundColor: accentColor }}
        aria-hidden="true"
      />

      <div className="p-5 md:p-6">
        <p
          className="font-mono mb-3"
          style={{ fontSize: '10px', letterSpacing: '3px', color: accentColor }}
        >
          {tag}
        </p>

        <h2 className="font-display font-bold text-text-base mb-3 text-lg md:text-xl">
          {title}
        </h2>

        <p className="font-body text-text-muted text-sm md:text-base leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {metaItems.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <span
                className="font-mono"
                style={{ fontSize: '10px', letterSpacing: '2px', color: accentColor }}
              >
                {item}
              </span>
              {i < metaItems.length - 1 && (
                <span
                  className="inline-block w-[3px] h-[3px] rounded-full"
                  style={{ backgroundColor: accentColorMuted }}
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

/* ========================================
   HOME PAGE
   ======================================== */

export default function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    if (location.hash) {
      // When navigating from another route (e.g. /gamefest), React Router preserves the Y scroll position.
      // We need to force Lenis to recalculate and scroll to the new target.
      const targetHash = location.hash

      const attemptScroll = () => {
        lenis.resize()
        lenis.scrollTo(targetHash, { offset: -64, duration: 1.2 })
      }

      // Fire across staggered intervals to ensure layout (like Swiper) is fully resolved
      requestAnimationFrame(() => {
        setTimeout(attemptScroll, 50)
        setTimeout(attemptScroll, 300)
        setTimeout(attemptScroll, 800)
      })
    } else {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [location, lenis])

  return (
    <PageWrapper>
      <div className="flex flex-col">
        <section
          id="home"
          className="relative w-full flex flex-col items-center justify-center overflow-hidden"
          style={{ minHeight: 'calc(100vh - 4rem)' }}
        >
        {/* Animated corner brackets */}
        <CornerBracketTopLeft />
        <CornerBracketBottomRight />

        {/* ===== TOP ZONE: Title / Eyebrow / Subtitle ===== */}
        <div className="flex flex-col items-center text-center px-6 mb-5 md:mb-8">
          {/* Eyebrow */}
          <motion.p
            className="font-mono text-techfest mb-3 md:mb-4"
            style={{ fontSize: '11px', letterSpacing: '4px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          >
          // GDGoC USM presents //
          </motion.p>

          {/* Main title */}
          <h1 className="font-display font-black leading-none mb-3 md:mb-4 flex items-center justify-center">
            <motion.span
              className="inline-block text-text-base glitch-text"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
              data-text="APEX"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              APEX
            </motion.span>
            <motion.span
              className="inline-block text-gamefest glitch-text"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
              data-text="FEST"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              FEST
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="font-mono text-text-muted text-[10px] md:text-xs"
            style={{ letterSpacing: '3px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            TWO EVENTS. ONE STAGE. INFINITE POSSIBILITIES.
          </motion.p>
        </div>

        {/* ===== MIDDLE ZONE: Event Cards ===== */}
        <div className="w-full max-w-5xl px-6 mb-4 md:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <EventCard
              accent="gamefest"
              tag="EVENT_01 // GAMING"
              title="Game Fest 2026"
              description="Compete in high-stakes gaming tournaments across multiple titles. From solo showdowns to team battles — prove your skill."
              metaItems={['TIMELINE', 'PRIZEPOOL', 'REGISTER']}
              to="/gamefest"
              delay={0.65}
            />
            <EventCard
              accent="techfest"
              tag="EVENT_02 // AI & TECH"
              title="TechFest 2.0 / Beyond the Prompt"
              description="Explore AI and emerging technology. Industry speakers, live demos, and workshops that go beyond the surface."
              metaItems={['TIMELINE', 'SPEAKERS', 'TOPICS']}
              to="/techfest"
              delay={0.8}
            />
          </div>
        </div>

        {/* ===== BOTTOM ZONE: CTA Buttons ===== */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.95, ease: 'easeOut' }}
        >
          <button
            type="button"
            onClick={() => navigate('/gamefest')}
            className="font-display uppercase text-gamefest transition-all duration-200 cursor-pointer w-full sm:w-auto"
            style={{
              fontSize: '10px',
              letterSpacing: '3px',
              border: '1px solid rgba(255,0,127,0.5)',
              backgroundColor: 'transparent',
              padding: '12px 28px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,0,127,0.08)'
              e.currentTarget.style.borderColor = '#ff007f'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,0,127,0.5)'
            }}
            aria-label="Register for GameFest"
          >
            Register // GameFest
          </button>

          <button
            type="button"
            onClick={() => navigate('/techfest')}
            className="font-display uppercase text-techfest transition-all duration-200 cursor-pointer w-full sm:w-auto"
            style={{
              fontSize: '10px',
              letterSpacing: '3px',
              border: '1px solid rgba(70,244,255,0.5)',
              backgroundColor: 'transparent',
              padding: '12px 28px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(70,244,255,0.08)'
              e.currentTarget.style.borderColor = '#00dcc0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(70,244,255,0.5)'
            }}
            aria-label="Explore TechFest"
          >
            Explore // TechFest
          </button>
        </motion.div>

        {/* Status bar pinned to bottom */}
        <HeroStatusBar />
      </section>

      {/* Merged Pages */}
      <About />
      <Sponsors />
      <FAQ />
      </div>
    </PageWrapper>
  )
}
