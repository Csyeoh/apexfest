import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'
import FAQ from '../components/FAQ'

import fantechLogo from '../assets/sponsor/fantech.png'
import mofiiLogo from '../assets/sponsor/mofii.jpg'
import slide1 from '../assets/slideshow/img_1556.webp'
import slide2 from '../assets/slideshow/img_1561.webp'
import slide3 from '../assets/slideshow/img_1574.webp'
import slide4 from '../assets/slideshow/img_1914.webp'

import logoImg from '../assets/home/logo.png'
import bg1Img from '../assets/home/bg1.png'
import bg2Img from '../assets/home/bg2.png'
import _shadow1Img from '../assets/home/shadow1.png'
import shadow2Img from '../assets/home/shadow2.png'
import geminiImg from '../assets/home/gemini.png'
import flutterImg from '../assets/home/flutter.png'
import firebaseImg from '../assets/home/firebase.png'
import yellowdotImg from '../assets/home/yellowdot.png'
import bluedotImg from '../assets/home/bluedot.png'
import lightdotImg from '../assets/home/lightdot.png'
import bannerLogo from '../assets/bannerlogo.png'

/* ========================================
   HERO — Split layout + CSS illustrations
   ======================================== */

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto" style={{ aspectRatio: '1 / 1' }}>
      {/* Logo — center of canvas */}
      <img
        src={logoImg}
        alt=""
        className="absolute select-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '180px',
          zIndex: 10,
        }}
        draggable="false"
      />

      {/* bg1 — ring with flower + dots, upper-left quadrant */}
      <img
        src={bg1Img}
        alt=""
        className="absolute select-none"
        style={{ left: '15%', top: '20%', width: '280px', zIndex: 2 }}
        draggable="false"
      />

      {/* bg2 — ring with blue blob + dots, lower-right quadrant */}
      <img
        src={bg2Img}
        alt=""
        className="absolute select-none"
        style={{ right: '20%', bottom: '20%', width: '300px', zIndex: 2 }}
        draggable="false"
      />

      {/* shadow2 — penguin, upper-right area */}
      <img
        src={shadow2Img}
        alt=""
        className="absolute select-none floating"
        style={{ right: '0%', top: '50%', width: '500px', zIndex: 1 }}
        draggable="false"
      />

      {/* shadow1 — Android, lower-left area */}
      {/* <img
        src={_shadow1Img}
        alt=""
        className="absolute select-none floating"
        style={{ left: '8%', bottom: '8%', width: '500px', zIndex: 5 }}
        draggable="false"
      /> */}

      {/* firebase — right side, mid-height */}
      <img
        src={firebaseImg}
        alt=""
        className="absolute select-none floating-r1"
        style={{ right: '20%', top: '70%', width: '150px', zIndex: 4 }}
        draggable="false"
      />

      {/* flutter — left side, lower area */}
      <img
        src={flutterImg}
        alt=""
        className="absolute select-none floating-r2"
        style={{ left: '65%', bottom: '65%', width: '150px', zIndex: 4 }}
        draggable="false"
      />

      {/* gemini */}
      <img
        src={geminiImg}
        alt=""
        className="absolute select-none floating-r3"
        style={{ left: '5%', top: '55%', width: '90px', zIndex: 6 }}
        draggable="false"
      />

      {/* yellow dots */}
      <img
        src={yellowdotImg}
        alt=""
        className="absolute select-none floating-r4"
        style={{ left: '28%', top: '70%', width: '55px', zIndex: 3 }}
        draggable="false"
      />

      {/* blue dots */}
      <img
        src={bluedotImg}
        alt=""
        className="absolute select-none floating-r5"
        style={{ right: '15%', top: '30%', width: '55px', zIndex: 3 }}
        draggable="false"
      />

      {/* light dots */}
      <img
        src={lightdotImg}
        alt=""
        className="absolute select-none floating-r6"
        style={{ left: '15%', top: '40%', width: '50px', zIndex: 6 }}
        draggable="false"
      />
    </div>
  )
}

function HeroSection() {
  const navigate = useNavigate()

  return (
    <section
      id="home"
      className="relative w-full max-w-7xl mx-auto px-6 pt-10 pb-8 md:pt-12 md:pb-10"
    >
      {/* Gradient wash behind hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(190,107,255,0.03) 0%, rgba(0,180,216,0.02) 50%, transparent 100%)',
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center relative z-10">
        {/* Left: text */}
        <div style={{ marginTop: '-48px' }}>
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

      {/* Supported by banner */}
      <div className="flex justify-center mt-2">
        <img
          src={bannerLogo}
          alt="Supported by Universiti Sains Malaysia, Pusat Kreativiti & Inovasi, and Google Developer Group on Campus USM"
          className="select-none"
          style={{ height: '50px', transform: 'translateX(8px)' }}
          draggable="false"
        />
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
      <section className="w-full max-w-7xl mx-auto px-6 py-20 md:py-24">
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
    <section className="w-full max-w-7xl mx-auto px-6 py-20 md:py-24">
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
        <path d="M18 2H6v7a6 6 0 1012 0V2z" />
      </svg>
    ),
  },
  {
    title: 'Hands-on Workshops',
    desc: 'Cloud, AI, cybersecurity, and fullstack development',
    gradient: 'linear-gradient(135deg, #00b4d822, #44a5ff22)',
    accent: '#00b4d8',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'Tech Talks',
    desc: 'Industry speakers sharing real-world insights',
    gradient: 'linear-gradient(135deg, #be6bff22, #00b4d822)',
    accent: '#be6bff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: 'Networking',
    desc: 'Connect with peers, mentors, and industry leaders',
    gradient: 'linear-gradient(135deg, #44a5ff22, #ff007f22)',
    accent: '#44a5ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

function AboutSection() {
  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-6 py-28 md:py-32">
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
                    boxShadow: '0 4px 24px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center"
                    style={{ background: card.gradient, color: card.accent }}
                  >
                    {card.icon}
                  </div>
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
    <section id="events" className="w-full max-w-7xl mx-auto px-6 py-28 md:py-32" style={{ backgroundColor: 'rgba(0,180,216,0.02)' }}>
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
   SPONSORS — Logo wall
   ======================================== */

const sponsors = [
  { name: 'Fantech', image: fantechLogo, role: 'In-Kind Sponsor', imageWidth: 'w-[80%]' },
  { name: 'Mofii', image: mofiiLogo, role: 'In-Kind Sponsor', imageWidth: 'w-[80%]' },
]

function SponsorsSection() {
  return (
    <section id="sponsors" className="w-full max-w-7xl mx-auto px-6 py-24 md:py-28 overflow-hidden" style={{ backgroundColor: 'rgba(26,26,46,0.015)' }}>
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

          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex flex-col items-center justify-start rounded-2xl pt-8 pb-6 px-6 w-[280px] sm:w-[300px]"
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
                  style={{ color: '#00b4d8' }}
                >
                  {sponsor.role}
                </p>
              </div>
            ))}
          </div>
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
    <section className="w-full max-w-7xl mx-auto px-6 py-24 md:py-28">
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
      <SponsorsSection />
      <GallerySection />
      <FinalCtaSection />
      <FAQ />
    </PageWrapper>
  )
}
