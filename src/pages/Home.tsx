import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'
import FAQ from '../components/FAQ'

import msLeongImage from '../assets/speakers/msleong.jpg'
import slide1 from '../assets/slideshow/img_1556.webp'
import slide2 from '../assets/slideshow/img_1561.webp'
import slide3 from '../assets/slideshow/img_1574.webp'
import slide4 from '../assets/slideshow/img_1914.webp'

/* ========================================
   HERO — Split layout + CSS illustrations
   ======================================== */

function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-[320px] md:min-h-[420px]">
      {/* Gradient blob background */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(255,0,127,0.3), rgba(190,107,255,0.2), rgba(0,180,216,0.2))',
        }}
      />

      {/* Game controller */}
      <motion.div
        className="absolute"
        style={{ top: '15%', left: '20%' }}
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
          <rect x="8" y="16" width="64" height="28" rx="14" stroke="#ff007f" strokeWidth="2.5" fill="rgba(255,0,127,0.06)" />
          <circle cx="24" cy="30" r="4" stroke="#ff007f" strokeWidth="1.5" />
          <line x1="22" y1="30" x2="26" y2="30" stroke="#ff007f" strokeWidth="1" />
          <line x1="24" y1="28" x2="24" y2="32" stroke="#ff007f" strokeWidth="1" />
          <circle cx="52" cy="26" r="2.5" fill="#ff007f" opacity="0.6" />
          <circle cx="58" cy="30" r="2.5" fill="#be6bff" opacity="0.6" />
          <circle cx="52" cy="34" r="2.5" fill="#ff007f" opacity="0.4" />
          <circle cx="46" cy="30" r="2.5" fill="#be6bff" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Laptop */}
      <motion.div
        className="absolute"
        style={{ top: '50%', right: '15%' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <svg width="90" height="64" viewBox="0 0 90 64" fill="none">
          <rect x="15" y="8" width="60" height="40" rx="4" stroke="#00b4d8" strokeWidth="2" fill="rgba(0,180,216,0.05)" />
          <rect x="20" y="13" width="50" height="30" rx="2" fill="rgba(0,180,216,0.08)" />
          <path d="M8 48 L15 48 L15 48 L75 48 L82 48 L82 52 C82 54 80 56 78 56 L12 56 C10 56 8 54 8 52 Z" stroke="#00b4d8" strokeWidth="2" fill="rgba(0,180,216,0.04)" />
          {/* Screen content lines */}
          <line x1="26" y1="20" x2="50" y2="20" stroke="#00b4d8" strokeWidth="1" opacity="0.4" />
          <line x1="26" y1="25" x2="60" y2="25" stroke="#00b4d8" strokeWidth="1" opacity="0.3" />
          <line x1="26" y1="30" x2="44" y2="30" stroke="#00b4d8" strokeWidth="1" opacity="0.3" />
          <rect x="26" y="34" width="16" height="5" rx="2" fill="rgba(0,180,216,0.2)" />
        </svg>
      </motion.div>

      {/* Pixel blocks */}
      {[
        { x: '65%', y: '10%', color: '#ff007f', size: 16, delay: 0 },
        { x: '72%', y: '18%', color: '#be6bff', size: 12, delay: 0.3 },
        { x: '58%', y: '22%', color: '#00b4d8', size: 10, delay: 0.6 },
        { x: '78%', y: '8%', color: '#44a5ff', size: 8, delay: 0.9 },
      ].map((block, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm"
          style={{
            left: block.x,
            top: block.y,
            width: block.size,
            height: block.size,
            backgroundColor: block.color,
            opacity: 0.6,
            boxShadow: `0 0 8px ${block.color}44`,
          }}
          animate={{ y: [0, -6, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: block.delay }}
        />
      ))}

      {/* Floating card shapes */}
      <motion.div
        className="absolute rounded-xl"
        style={{
          top: '30%',
          left: '55%',
          width: '60px',
          height: '40px',
          border: '1.5px solid rgba(190,107,255,0.4)',
          backgroundColor: 'rgba(190,107,255,0.06)',
        }}
        animate={{ y: [0, -10, 0], rotate: [8, 12, 8] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Confetti dots */}
      {Array.from({ length: 8 }).map((_, i) => {
        const colors = ['#ff007f', '#00b4d8', '#be6bff', '#44a5ff']
        return (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 70}%`,
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              backgroundColor: colors[i % colors.length],
              opacity: 0.4,
            }}
            animate={{ y: [0, -15 - Math.random() * 10, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        )
      })}

      {/* 3D cube shape */}
      <motion.div
        className="absolute"
        style={{ bottom: '20%', left: '25%' }}
        animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <polygon points="24,4 44,16 44,36 24,44 4,36 4,16" stroke="#44a5ff" strokeWidth="1.5" fill="rgba(68,165,255,0.06)" />
          <line x1="24" y1="4" x2="24" y2="44" stroke="#44a5ff" strokeWidth="1" opacity="0.3" />
          <line x1="4" y1="16" x2="44" y2="36" stroke="#44a5ff" strokeWidth="1" opacity="0.2" />
          <line x1="44" y1="16" x2="4" y2="36" stroke="#44a5ff" strokeWidth="1" opacity="0.2" />
        </svg>
      </motion.div>
    </div>
  )
}

function HeroSection() {
  const navigate = useNavigate()

  return (
    <section
      id="home"
      className="w-full max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Left: text */}
        <div>
          <motion.p
            className="font-mono mb-4"
            style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            GDGoC USM PRESENTS
          </motion.p>

          <motion.h1
            className="font-display font-bold leading-none mb-3"
            style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', color: '#1a1a2e' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            APEXFEST
            <br />
            <span style={{ color: '#1a1a2e', opacity: 0.3 }}>2026</span>
          </motion.h1>

          <motion.p
            className="font-display font-semibold mb-4"
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              background: 'linear-gradient(90deg, #ff007f, #be6bff, #00b4d8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            GameFest &times; TechFest
          </motion.p>

          <motion.p
            className="font-mono mb-3"
            style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(26,26,46,0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            COMPETE. LEARN. BUILD. CONNECT.
          </motion.p>

          <motion.p
            className="font-body text-base md:text-lg leading-relaxed mb-8 max-w-md"
            style={{ color: 'rgba(26,26,46,0.6)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A student festival celebrating technology, creativity, esports and innovation.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="button"
              onClick={() => navigate('/gamefest')}
              className="font-display font-semibold cursor-pointer transition-all duration-200 rounded-full"
              style={{
                fontSize: '14px',
                letterSpacing: '0.5px',
                background: 'linear-gradient(135deg, #be6bff, #ff007f)',
                color: '#ffffff',
                padding: '12px 28px',
                border: 'none',
                boxShadow: '0 4px 16px rgba(190,107,255,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(190,107,255,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(190,107,255,0.3)'
              }}
            >
              Register Now
            </button>
            <button
              type="button"
              onClick={() => navigate('/#events')}
              className="font-display font-semibold cursor-pointer transition-all duration-200 rounded-full"
              style={{
                fontSize: '14px',
                letterSpacing: '0.5px',
                backgroundColor: 'transparent',
                color: '#1a1a2e',
                padding: '12px 28px',
                border: '1.5px solid rgba(26,26,46,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00b4d8'
                e.currentTarget.style.color = '#00b4d8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26,26,46,0.15)'
                e.currentTarget.style.color = '#1a1a2e'
              }}
            >
              Explore Events
            </button>
          </motion.div>

          {/* Chips */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: '\u{1F4CD}', label: 'USM Penang' },
              { icon: '\u{1F4C5}', label: 'May 16-24, 2026' },
              { icon: '\u{1F465}', label: 'Open to all students' },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 font-body rounded-full"
                style={{
                  fontSize: '12px',
                  color: 'rgba(26,26,46,0.6)',
                  backgroundColor: 'rgba(26,26,46,0.04)',
                  border: '1px solid rgba(26,26,46,0.08)',
                  padding: '6px 14px',
                }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  )
}

/* ========================================
   COUNTDOWN
   ======================================== */

function CountdownSection() {
  const events = [
    { date: new Date('2026-05-16T20:00:00'), label: 'GameFest Online Qualifier', accent: '#ff007f' },
    { date: new Date('2026-05-23T09:00:00'), label: 'GameFest Physical D-Day', accent: '#ff007f' },
    { date: new Date('2026-05-24T09:00:00'), label: 'TechFest 2.0', accent: '#00b4d8' },
  ]

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Find the next upcoming event
  const nextEvent = events.find((e) => e.date.getTime() > now.getTime())

  // All events passed
  if (!nextEvent) {
    return (
      <section className="w-full max-w-7xl mx-auto px-6 py-16">
        <RevealOnScroll direction="up">
          <div
            className="max-w-xl mx-auto text-center p-10 md:p-12"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              border: '1px solid rgba(26,26,46,0.06)',
            }}
          >
            <p
              className="font-mono mb-3"
              style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}
            >
              APEXFEST 2026
            </p>
            <p
              className="font-display font-bold mb-2"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}
            >
              Thank You!
            </p>
            <p className="font-body text-base" style={{ color: 'rgba(26,26,46,0.5)' }}>
              ApexFest 2026 has concluded. See you next year!
            </p>
          </div>
        </RevealOnScroll>
      </section>
    )
  }

  const diff = nextEvent.date.getTime() - now.getTime()
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24))
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60))
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60))

  const daysLabel = days === 1 ? 'DAY LEFT' : 'DAYS LEFT'

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <RevealOnScroll direction="up">
        <div
          className="max-w-xl mx-auto text-center p-10 md:p-12"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            border: '1px solid rgba(26,26,46,0.06)',
          }}
        >
          <p
            className="font-mono mb-3"
            style={{ fontSize: '10px', letterSpacing: '3px', color: nextEvent.accent }}
          >
            COUNTDOWN
          </p>
          <p
            className="font-display font-bold mb-2"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#1a1a2e' }}
          >
            {days} <span style={{ fontSize: '0.5em', opacity: 0.5 }}>{daysLabel}</span>
          </p>
          <p
            className="font-body text-sm mb-8"
            style={{ color: 'rgba(26,26,46,0.5)' }}
          >
            to {nextEvent.label}
          </p>

          <div className="flex justify-center gap-3 md:gap-4 mb-6">
            {[
              { value: String(hours).padStart(2, '0'), label: 'HRS' },
              { value: String(minutes).padStart(2, '0'), label: 'MIN' },
              { value: String(seconds).padStart(2, '0'), label: 'SEC' },
            ].map((block) => (
              <div
                key={block.label}
                className="flex flex-col items-center p-3 md:p-4"
                style={{
                  backgroundColor: 'rgba(26,26,46,0.03)',
                  borderRadius: '16px',
                  minWidth: '72px',
                }}
              >
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: '24px', color: '#1a1a2e' }}
                >
                  {block.value}
                </span>
                <span
                  className="font-mono mt-1"
                  style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(26,26,46,0.35)' }}
                >
                  {block.label}
                </span>
              </div>
            ))}
          </div>

          <p className="font-body text-sm" style={{ color: 'rgba(26,26,46,0.4)' }}>
            Limited seats available
          </p>
        </div>
      </RevealOnScroll>
    </section>
  )
}

/* ========================================
   ABOUT — 3 feature cards
   ======================================== */

const aboutCards = [
  {
    icon: '\u{1F3AE}',
    title: 'Play',
    desc: 'Compete in GameFest tournaments and side quests',
    accent: '#ff007f',
    bg: 'rgba(255,0,127,0.04)',
  },
  {
    icon: '\u{1F4A1}',
    title: 'Learn',
    desc: 'Hands-on workshops and talks on emerging tech',
    accent: '#00b4d8',
    bg: 'rgba(0,180,216,0.04)',
  },
  {
    icon: '\u{1F91D}',
    title: 'Connect',
    desc: 'Network with peers, speakers, and industry leaders',
    accent: '#be6bff',
    bg: 'rgba(190,107,255,0.04)',
  },
]

function AboutSection() {
  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-6 py-20">
      <RevealOnScroll direction="up">
        <div className="text-center mb-12">
          <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
            // WHO WE ARE
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}>
            About <span style={{ color: '#00b4d8' }}>ApexFest</span>
          </h2>
        </div>
      </RevealOnScroll>

      <RevealOnScroll direction="up" delay={0.1}>
        <p className="font-body text-center max-w-2xl mx-auto mb-14 text-base md:text-lg leading-relaxed" style={{ color: 'rgba(26,26,46,0.6)' }}>
          ApexFest is a two-day tech and gaming festival organized by GDGoC USM.
          Whether you want to level up your skills, explore hands-on workshops, or
          connect with a passionate community — there is something for everyone.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
        {aboutCards.map((card, i) => (
          <RevealOnScroll key={card.title} direction="up" delay={i * 0.1}>
            <div
              className="p-7 transition-all duration-300 cursor-default"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                border: '1px solid rgba(26,26,46,0.06)',
                borderLeft: `3px solid ${card.accent}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'
              }}
            >
              <span className="text-3xl mb-4 block">{card.icon}</span>
              <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>
                {card.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,26,46,0.5)' }}>
                {card.desc}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

/* ========================================
   EVENTS — 2 large colorful cards
   ======================================== */

function EventsSection() {
  const navigate = useNavigate()

  return (
    <section id="events" className="w-full max-w-7xl mx-auto px-6 py-20">
      <RevealOnScroll direction="up">
        <div className="text-center mb-12">
          <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
            // THE EVENTS
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}>
            Two Ways to <span style={{ color: '#ff007f' }}>Play</span>
          </h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* GameFest Card */}
        <RevealOnScroll direction="left">
          <div
            className="relative p-8 md:p-10 overflow-hidden transition-all duration-300 cursor-pointer group"
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255,0,127,0.06), rgba(190,107,255,0.06))',
              border: '1px solid rgba(255,0,127,0.15)',
            }}
            onClick={() => navigate('/gamefest')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,0,127,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Pixel decorations */}
            <div className="absolute top-4 right-4 flex gap-1.5 opacity-40">
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#ff007f' }} />
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#be6bff' }} />
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#ff007f', opacity: 0.5 }} />
            </div>

            <p className="font-mono mb-4" style={{ fontSize: '10px', letterSpacing: '3px', color: '#ff007f' }}>
              DAY 1 &middot; MAY 23
            </p>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: '#1a1a2e' }}>
              GameFest
            </h3>
            <div className="space-y-2 mb-6">
              {['Tournament', 'Challenges', 'Prizes'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#ff007f' }} />
                  <span className="font-body text-sm" style={{ color: 'rgba(26,26,46,0.6)' }}>{item}</span>
                </div>
              ))}
            </div>
            <span
              className="font-display font-semibold inline-flex items-center gap-1 transition-colors duration-200 group-hover:text-gamefest"
              style={{ fontSize: '14px', color: 'rgba(26,26,46,0.5)' }}
            >
              Explore <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>
        </RevealOnScroll>

        {/* TechFest Card */}
        <RevealOnScroll direction="right">
          <div
            className="relative p-8 md:p-10 overflow-hidden transition-all duration-300 cursor-pointer group"
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(0,180,216,0.06), rgba(68,165,255,0.06))',
              border: '1px solid rgba(0,180,216,0.15)',
            }}
            onClick={() => navigate('/techfest')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,180,216,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <p className="font-mono mb-4" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
              DAY 2 &middot; MAY 24
            </p>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: '#1a1a2e' }}>
              TechFest 2.0
            </h3>
            <div className="space-y-2 mb-6">
              {['Talks', 'Workshops', 'Showcase'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00b4d8' }} />
                  <span className="font-body text-sm" style={{ color: 'rgba(26,26,46,0.6)' }}>{item}</span>
                </div>
              ))}
            </div>
            <span
              className="font-display font-semibold inline-flex items-center gap-1 transition-colors duration-200 group-hover:text-techfest"
              style={{ fontSize: '14px', color: 'rgba(26,26,46,0.5)' }}
            >
              Explore <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ========================================
   SPEAKERS — Circular carousel
   ======================================== */

interface Speaker {
  name: string
  role: string
  org: string
  initials: string
  image?: string
  accent: string
}

const speakers: Speaker[] = [
  { name: 'Ms. Leong Lai Fong', role: 'Senior AI Engineer', org: 'Guest Speaker', initials: 'LF', image: msLeongImage, accent: '#00b4d8' },
  { name: 'Ms. Ho Zhi Yi', role: 'Speaker', org: 'Confirmed', initials: 'ZY', accent: '#ff007f' },
  { name: 'Mr. Kenichi Kambara', role: 'Speaker', org: 'Pending', initials: 'KK', accent: '#be6bff' },
  { name: 'Mr. Jeremy Lau', role: 'Speaker', org: 'Pending', initials: 'JL', accent: '#44a5ff' },
]

function SpeakersSection() {
  return (
    <section id="speakers" className="w-full max-w-7xl mx-auto px-6 py-20">
      <RevealOnScroll direction="up">
        <div className="text-center mb-12">
          <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
            // MEET THE SPEAKERS
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}>
            Our <span style={{ color: '#00b4d8' }}>Speakers</span>
          </h2>
        </div>
      </RevealOnScroll>

      <Swiper
        slidesPerView={1.5}
        spaceBetween={24}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        modules={[Autoplay]}
        className="w-full !pb-8"
      >
        {speakers.map((speaker, i) => (
          <SwiperSlide key={i}>
            <RevealOnScroll direction="up" delay={i * 0.1}>
              <div className="flex flex-col items-center text-center py-6">
                {/* Circular avatar */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-4 overflow-hidden"
                  style={{
                    border: `2px solid ${speaker.accent}`,
                    boxShadow: `0 0 20px ${speaker.accent}22`,
                    backgroundColor: `${speaker.accent}08`,
                  }}
                >
                  {speaker.image ? (
                    <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                  ) : (
                    <span
                      className="font-display font-bold"
                      style={{ fontSize: '24px', color: speaker.accent }}
                    >
                      {speaker.initials}
                    </span>
                  )}
                </div>
                <h3 className="font-display font-semibold text-base mb-1" style={{ color: '#1a1a2e' }}>
                  {speaker.name}
                </h3>
                <p className="font-body text-sm mb-1" style={{ color: 'rgba(26,26,46,0.5)' }}>
                  {speaker.role}
                </p>
                <span
                  className="font-mono inline-block px-3 py-1 rounded-full"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '1px',
                    color: speaker.accent,
                    backgroundColor: `${speaker.accent}08`,
                    border: `1px solid ${speaker.accent}20`,
                  }}
                >
                  {speaker.org}
                </span>
              </div>
            </RevealOnScroll>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

/* ========================================
   SPONSORS — Logo wall
   ======================================== */

const sponsors = [
  { name: 'Hilti', image: '/images/Hilti.jpg', role: 'Main Sponsor' },
  { name: 'Micro Modular System', image: '/images/MMS.png', role: 'Co-Sponsor' },
  { name: 'Digital Penang', image: '/images/Digital Penang.png', role: 'Co-Sponsor' },
  { name: 'The Empyrean', image: '/images/Empyrean.jpg', role: 'Co-Sponsor' },
  { name: 'ZUS Coffee', image: '/images/ZUS.png', role: 'In-Kind Sponsor' },
  { name: 'Vida', image: '/images/vida.png', role: 'In-Kind Sponsor' },
  { name: 'Printcious', image: '/images/printcious.jpg', role: 'In-Kind Sponsor' },
]

function SponsorsSection() {
  return (
    <section id="sponsors" className="w-full max-w-7xl mx-auto px-6 py-20">
      <RevealOnScroll direction="up">
        <div className="text-center mb-12">
          <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
            // PARTNERS &amp; SPONSORS
          </p>
          <h2 className="font-display font-bold mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}>
            Our <span style={{ color: '#00b4d8' }}>Sponsors</span>
          </h2>
          <p className="font-body text-sm" style={{ color: 'rgba(26,26,46,0.4)' }}>
            Powered by industry leaders
          </p>
        </div>
      </RevealOnScroll>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto">
        {sponsors.map((sponsor, i) => (
          <RevealOnScroll key={sponsor.name} direction="up" delay={i * 0.05}>
            <div
              className="group flex items-center justify-center transition-all duration-300"
              style={{ width: '120px', height: '80px' }}
            >
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="max-w-full max-h-full object-contain select-none transition-all duration-300"
                style={{ filter: 'grayscale(100%) opacity(0.4)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%) opacity(1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%) opacity(0.4)'
                }}
                draggable="false"
              />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

/* ========================================
   GALLERY — Polaroid/scrapbook style
   ======================================== */

function GallerySection() {
  const photos = [
    { src: slide1, rotation: -3 },
    { src: slide2, rotation: 2 },
    { src: slide3, rotation: -2 },
    { src: slide4, rotation: 4 },
  ]

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20">
      <RevealOnScroll direction="up">
        <div className="text-center mb-12">
          <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
            // LAST YEAR
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}>
            Event <span style={{ color: '#be6bff' }}>Highlights</span>
          </h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
        {photos.map((photo, i) => (
          <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
            <div
              className="transition-all duration-300 hover:scale-105 hover:z-10"
              style={{
                transform: `rotate(${photo.rotation}deg)`,
                backgroundColor: '#ffffff',
                padding: '8px 8px 28px 8px',
                borderRadius: '4px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
            >
              <div className="aspect-square overflow-hidden rounded-sm">
                <img
                  src={photo.src}
                  alt={`ApexFest highlight ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

/* ========================================
   FINAL CTA
   ======================================== */

function FinalCtaSection() {
  const navigate = useNavigate()

  return (
    <section className="w-full px-6 py-20">
      <RevealOnScroll direction="up">
        <div
          className="max-w-4xl mx-auto text-center py-16 md:py-20 px-6"
          style={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #ff007f, #be6bff, #00b4d8)',
          }}
        >
          <h2
            className="font-display font-bold mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ffffff' }}
          >
            Ready to join ApexFest?
          </h2>
          <button
            type="button"
            onClick={() => navigate('/gamefest')}
            className="font-display font-bold cursor-pointer transition-all duration-200 rounded-full"
            style={{
              fontSize: '15px',
              letterSpacing: '0.5px',
              backgroundColor: '#ffffff',
              color: '#1a1a2e',
              padding: '14px 36px',
              border: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
            }}
          >
            Register Now
          </button>
        </div>
      </RevealOnScroll>
    </section>
  )
}

/* ========================================
   HOME PAGE
   ======================================== */

export default function Home() {
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    if (location.hash) {
      const targetHash = location.hash

      const attemptScroll = () => {
        lenis.resize()
        lenis.scrollTo(targetHash, { offset: -72, duration: 1.2 })
      }

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
      <HeroSection />
      <CountdownSection />
      <AboutSection />
      <EventsSection />
      <SpeakersSection />
      <SponsorsSection />
      <GallerySection />
      <FinalCtaSection />
      <FAQ />
    </PageWrapper>
  )
}
