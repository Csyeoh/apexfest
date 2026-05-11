import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
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
    <div className="relative flex items-center justify-center min-h-[320px] md:min-h-[420px]">
      {/* Main glow */}
      <div
        className="absolute w-[400px] h-[400px] md:w-[520px] md:h-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,127,0.2) 0%, rgba(190,107,255,0.15) 40%, rgba(0,180,216,0.12) 70%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main glass card */}
      <div
        className="relative w-[260px] h-[180px] md:w-[320px] md:h-[220px] flex items-center justify-center z-10"
        style={{
          borderRadius: '40px',
          backgroundColor: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <span
          className="font-display font-black"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            background: 'linear-gradient(135deg, #ff007f, #be6bff, #00b4d8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          APEX
        </span>
      </div>

      {/* Floating tech tags */}
      {[
        { label: 'GameFest', x: '-8%', y: '15%', accent: '#ff007f' },
        { label: 'TechFest', x: '70%', y: '8%', accent: '#00b4d8' },
        { label: 'GDGoC', x: '-5%', y: '70%', accent: '#be6bff' },
      ].map((tag) => (
        <div
          key={tag.label}
          className="absolute z-10 px-5 py-3 rounded-3xl font-display font-semibold"
          style={{
            left: tag.x,
            top: tag.y,
            fontSize: '14px',
            color: tag.accent,
            backgroundColor: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {tag.label}
        </div>
      ))}

      {/* Floating colored dots */}
      {[
        { x: '55%', y: '12%', color: '#ff007f', size: 6 },
        { x: '80%', y: '45%', color: '#be6bff', size: 5 },
        { x: '15%', y: '45%', color: '#00b4d8', size: 4 },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Orbital rings */}
      <div className="absolute inset-0 border border-slate-200/50 rounded-full scale-[1.1]" />
      <div className="absolute inset-0 border border-slate-200/30 rounded-full scale-[1.25]" />
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
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(26,26,46,0.08)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00b4d8' }} />
            <span className="font-body text-sm" style={{ color: 'rgba(26,26,46,0.6)' }}>
              GDGoC USM presents
            </span>
          </motion.div>

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
                padding: '14px 32px',
                border: 'none',
                boxShadow: '0 8px 24px rgba(190,107,255,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(190,107,255,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(190,107,255,0.3)'
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
                backgroundColor: 'rgba(255,255,255,0.7)',
                color: '#1a1a2e',
                padding: '14px 32px',
                border: '1px solid rgba(26,26,46,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.7)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              Learn More
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
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <RevealOnScroll direction="up">
          <div
            className="max-w-xl mx-auto text-center p-10 md:p-12"
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: '40px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
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
    <section className="w-full max-w-7xl mx-auto px-6 py-20">
      <RevealOnScroll direction="up">
        <div
          className="max-w-xl mx-auto text-center p-10 md:p-12"
          style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.8)',
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
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
    title: 'GameFest Tournaments',
    desc: 'Compete in high-stakes TETR.IO battles and side quests',
    gradient: 'linear-gradient(135deg, #ff007f22, #be6bff22)',
    accent: '#ff007f',
  },
  {
    title: 'Hands-on Workshops',
    desc: 'Cloud, AI, cybersecurity, and fullstack development',
    gradient: 'linear-gradient(135deg, #00b4d822, #44a5ff22)',
    accent: '#00b4d8',
  },
  {
    title: 'Tech Talks',
    desc: 'Industry speakers sharing real-world insights',
    gradient: 'linear-gradient(135deg, #be6bff22, #00b4d822)',
    accent: '#be6bff',
  },
  {
    title: 'Networking',
    desc: 'Connect with peers, mentors, and industry leaders',
    gradient: 'linear-gradient(135deg, #44a5ff22, #ff007f22)',
    accent: '#44a5ff',
  },
]

function AboutSection() {
  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-6 py-20">
      <RevealOnScroll direction="up">
        <div
          className="p-8 md:p-12"
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.8)',
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
          }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: text */}
            <div>
              <p className="font-mono mb-4" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
                ABOUT APEXFEST
              </p>
              <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#1a1a2e' }}>
                A festival built for students.
              </h2>
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: 'rgba(26,26,46,0.6)' }}>
                A two-day tech and gaming festival organized by GDGoC USM.
                Whether you want to compete, learn hands-on, or connect with a
                passionate community — there is something for everyone.
              </p>
            </div>

            {/* Right: 2x2 feature cards */}
            <div className="grid grid-cols-2 gap-4">
              {aboutCards.map((card) => (
                <div
                  key={card.title}
                  className="p-5 md:p-6 transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(26,26,46,0.05)',
                    borderRadius: '24px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl mb-4"
                    style={{ background: card.gradient }}
                  />
                  <h3 className="font-display font-bold text-sm md:text-base mb-1" style={{ color: '#1a1a2e' }}>
                    {card.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm leading-relaxed" style={{ color: 'rgba(26,26,46,0.5)' }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
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
            className="group p-8 md:p-10 transition-all duration-300 cursor-pointer"
            style={{
              borderRadius: '32px',
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            }}
            onClick={() => navigate('/gamefest')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.04)'
            }}
          >
            <div
              className="w-16 h-16 rounded-3xl mb-6"
              style={{ background: 'linear-gradient(135deg, #ff007f22, #be6bff22)' }}
            />
            <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#ff007f' }}>
              DAY 1 &middot; MAY 16 &amp; 23
            </p>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: '#1a1a2e' }}>
              GameFest
            </h3>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'rgba(26,26,46,0.5)' }}>
              TETR.IO tournament with online qualifiers and a physical showdown.
            </p>
            <span
              className="font-display font-semibold inline-flex items-center gap-1 transition-all duration-200"
              style={{ fontSize: '14px', color: '#ff007f' }}
            >
              Explore <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </span>
          </div>
        </RevealOnScroll>

        {/* TechFest Card */}
        <RevealOnScroll direction="right">
          <div
            className="group p-8 md:p-10 transition-all duration-300 cursor-pointer"
            style={{
              borderRadius: '32px',
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            }}
            onClick={() => navigate('/techfest')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.04)'
            }}
          >
            <div
              className="w-16 h-16 rounded-3xl mb-6"
              style={{ background: 'linear-gradient(135deg, #00b4d822, #44a5ff22)' }}
            />
            <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
              DAY 2 &middot; MAY 24
            </p>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: '#1a1a2e' }}>
              TechFest 2.0
            </h3>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'rgba(26,26,46,0.5)' }}>
              Hands-on workshops and talks on AI, cloud, cybersecurity, and more.
            </p>
            <span
              className="font-display font-semibold inline-flex items-center gap-1 transition-all duration-200"
              style={{ fontSize: '14px', color: '#00b4d8' }}
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
        <div
          className="p-8 md:p-12"
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.8)',
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
          }}
        >
          <div className="text-center mb-10">
            <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
              // MEET THE SPEAKERS
            </p>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}>
              Our <span style={{ color: '#00b4d8' }}>Speakers</span>
            </h2>
          </div>

          <Swiper
            slidesPerView={1.5}
            spaceBetween={24}
            centeredSlides={true}
            loop={true}
    
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
            }}
            className="w-full !pb-4"
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
        </div>
      </RevealOnScroll>
    </section>
  )
}

/* ========================================
   SPONSORS — Logo wall
   ======================================== */

const sponsors = [
  { name: 'Hilti', image: '/images/Hilti.jpg', role: 'Main Sponsor', imageWidth: 'w-[80%]' },
  { name: 'Micro Modular System', image: '/images/MMS.png', role: 'Co-Sponsor', imageWidth: 'w-[70%]' },
  { name: 'Digital Penang', image: '/images/Digital Penang.png', role: 'Co-Sponsor', imageWidth: 'w-[70%]' },
  { name: 'The Empyrean', image: '/images/Empyrean.jpg', role: 'Co-Sponsor', imageWidth: 'w-[50%]' },
  { name: 'ZUS Coffee', image: '/images/ZUS.png', role: 'In-Kind Sponsor', imageWidth: 'w-full' },
  { name: 'Vida', image: '/images/vida.png', role: 'In-Kind Sponsor', imageWidth: 'w-[80%]' },
  { name: 'Printcious', image: '/images/printcious.jpg', role: 'In-Kind Sponsor', imageWidth: 'w-[85%]' },
]

function SponsorsSection() {
  return (
    <section id="sponsors" className="w-full max-w-7xl mx-auto px-6 py-20 overflow-hidden">
      <RevealOnScroll direction="up">
        <div
          className="p-8 md:p-12"
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.8)',
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
          }}
        >
          <div className="text-center mb-10">
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

          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination]}
            className="w-full !pb-14"
          >
            {sponsors.map((sponsor) => (
              <SwiperSlide key={sponsor.name} className="!w-[280px] sm:!w-[300px]">
                <div
                  className="flex flex-col items-center justify-start rounded-2xl pt-8 pb-6 px-6 h-full"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(26,26,46,0.08)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  <div
                    className={`h-36 ${sponsor.imageWidth || 'w-[80%]'} flex items-center justify-center overflow-hidden rounded-xl bg-white p-4`}
                    style={{ border: '1px solid rgba(26,26,46,0.04)' }}
                  >
                    <img
                      alt={sponsor.name}
                      className="w-full h-full object-contain select-none"
                      src={sponsor.image}
                      draggable="false"
                    />
                  </div>
                  <p
                    className="text-center font-display font-semibold tracking-wide text-lg mt-6"
                    style={{
                      color: sponsor.role.includes('Main') ? '#ff007f' : '#00b4d8',
                    }}
                  >
                    {sponsor.role}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </RevealOnScroll>
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
        <div
          className="p-8 md:p-12"
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.8)',
            borderRadius: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
          }}
        >
          <div className="text-center mb-12">
            <p className="font-mono mb-3" style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}>
              // LAST YEAR
            </p>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}>
              Event <span style={{ color: '#be6bff' }}>Highlights</span>
            </h2>
          </div>

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
        </div>
      </RevealOnScroll>
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
            borderRadius: '40px',
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
