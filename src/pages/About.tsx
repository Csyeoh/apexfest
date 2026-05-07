import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'

/* ========================================
   PAGE HEADER
   ======================================== */

function PageHeader() {
  return (
    <RevealOnScroll direction="left">
      <div className="mb-16">
        <p
          className="font-mono text-text-muted mb-3"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          // WHO WE ARE
        </p>
        <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: '56px' }}>
          <span className="text-text-base">About </span>
          <span className="text-techfest">ApexFest</span>
        </h1>
        <div className="w-24 h-[1px] bg-techfest" />
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   PROSE COLUMN — staggered paragraphs
   ======================================== */

const paragraphs = [
  {
    key: 'intro',
    content: (
      <>
        GDGoC USM ApexFest is the flagship annual event hosted by the Google Developer
        Groups on Campus chapter at Universiti Sains Malaysia. Designed to bring together
        students from every discipline, ApexFest is a celebration of skill, creativity,
        and the drive to build something bigger than ourselves.
      </>
    ),
  },
  {
    key: 'gamefest',
    content: (
      <>
        <span className="text-gamefest font-semibold">Game Fest 2026</span> is the
        competitive heart of ApexFest — a multi-title gaming tournament where players
        battle across FPS, MOBA, fighting, and card game brackets. From solo showdowns to
        team-based warfare, Game Fest is where campus legends are forged and rivalries
        ignite.
      </>
    ),
  },
  {
    key: 'techfest',
    content: (
      <>
        <span className="text-techfest font-semibold">TechFest 2.0</span> pushes the
        boundary of what students know about artificial intelligence and emerging
        technology. Featuring industry speakers, hands-on workshops, and deep-dive
        sessions, TechFest goes beyond the prompt — exploring real-world AI deployment,
        ethics, and the tools shaping our future.
      </>
    ),
  },
  {
    key: 'closing',
    content: (
      <>
        ApexFest is where gamers, builders, and thinkers converge. Whether you're here to
        compete, learn, or connect — you belong. Two events. One stage. Infinite
        possibilities.
      </>
    ),
  },
]

function ProseColumn() {
  return (
    <div className="space-y-6">
      {paragraphs.map((para, i) => (
        <motion.p
          key={para.key}
          className="font-body text-text-muted"
          style={{ fontSize: '17px', lineHeight: 1.7 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.15 }}
        >
          {para.content}
        </motion.p>
      ))}
    </div>
  )
}

/* ========================================
   STAT CARDS — scale pop-in
   ======================================== */

interface StatCard {
  value: string
  label: string
  valueColor: 'amber' | 'cyan'
}

const stats: StatCard[] = [
  { value: '2', label: 'Events', valueColor: 'amber' },
  { value: 'USM', label: 'Campus', valueColor: 'cyan' },
  { value: '2026', label: 'Year', valueColor: 'amber' },
  { value: '∞', label: 'Possibilities', valueColor: 'cyan' },
]

function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="p-6 text-center"
          style={{
            backgroundColor: '#0f0f1a',
            border: '1px solid rgba(0,220,192,0.2)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
        >
          <p
            className="font-display font-bold mb-1"
            style={{
              fontSize: '28px',
              color: stat.valueColor === 'amber' ? '#ffb830' : '#00dcc0',
            }}
          >
            {stat.value}
          </p>
          <p className="font-body text-text-muted text-sm">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

/* ========================================
   MISSION STATEMENT — slide from left
   ======================================== */

function MissionStatement() {
  return (
    <motion.section
      className="mt-20 mb-16"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.6 }}
    >
      <div className="flex gap-6">
        {/* Vertical amber accent line */}
        <div className="w-[2px] flex-shrink-0 bg-gamefest" />

        <div>
          <p
            className="font-mono text-text-muted mb-3"
            style={{ fontSize: '10px', letterSpacing: '3px' }}
          >
            OUR MISSION
          </p>
          <p
            className="font-body text-text-base"
            style={{ fontSize: '18px', lineHeight: 1.7 }}
          >
            To build a thriving community of student developers, gamers, and innovators
            at USM through events that inspire, challenge, and connect.
          </p>
        </div>
      </div>
    </motion.section>
  )
}

/* ========================================
   GDGoC BADGE — spring bounce-in
   ======================================== */

function GDGoCBadge() {
  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.2,
      }}
    >
      <div
        className="inline-flex items-center gap-3 px-6 py-3"
        style={{ border: '1px solid rgba(0,220,192,0.3)' }}
      >
        {/* GDGoC logo placeholder */}
        <div
          className="flex items-center justify-center px-3 py-1"
          style={{ border: '1px solid rgba(0,220,192,0.4)' }}
        >
          <span
            className="font-display font-bold text-techfest"
            style={{ fontSize: '11px', letterSpacing: '2px' }}
          >
            GDGoC
          </span>
        </div>

        {/* Chapter name */}
        <div className="flex flex-col">
          <span
            className="font-mono text-text-base"
            style={{ fontSize: '11px', letterSpacing: '1px' }}
          >
            Universiti Sains Malaysia
          </span>
          <span
            className="font-mono text-text-muted"
            style={{ fontSize: '9px', letterSpacing: '2px' }}
          >
            CAMPUS CHAPTER // VERIFIED
          </span>
        </div>

        {/* Verified indicator */}
        <span
          className="w-[8px] h-[8px] flex-shrink-0"
          style={{
            backgroundColor: '#00dcc0',
            borderRadius: '50%',
            boxShadow: '0 0 6px rgba(0,220,192,0.5)',
          }}
        />
      </div>
    </motion.div>
  )
}

/* ========================================
   PAGE COMPONENT
   ======================================== */

export default function About() {
  return (
    <PageWrapper>
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-16">
      <PageHeader />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {/* Left — prose (takes 2 cols) */}
        <div className="md:col-span-2">
          <ProseColumn />
        </div>

        {/* Right — stat cards (takes 1 col) */}
        <div className="flex items-start">
          <StatCards />
        </div>
      </div>

      <MissionStatement />
      <GDGoCBadge />
    </section>
    </PageWrapper>
  )
}
