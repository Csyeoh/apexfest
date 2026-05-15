import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'
import msLeongImage from '../assets/speakers/msleong.jpg'
import zhiyiImage from '../assets/speakers/zhiyi.png'
import kenichiImage from '../assets/speakers/kenichi.jpg'
import jeremyImage from '../assets/speakers/jeremy.jpg'
import tfqr from '../assets/qr/tfqr.png'
import prizeCaps from '../assets/prize/caps.png'
import prizeDino from '../assets/prize/dino.png'

type TechFestTab = 'about' | 'timeline' | 'speakers' | 'topics' | 'giftaway' | 'register'

const tabs: { key: TechFestTab; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'speakers', label: 'Speakers' },
  { key: 'topics', label: 'Topics' },
  { key: 'giftaway', label: 'Giftaway' },
  { key: 'register', label: 'Register' },
]

/* ========================================
   PAGE HEADER
   ======================================== */

function PageHeader() {
  return (
    <RevealOnScroll direction="left">
      <div className="mb-12">
        <p
          className="font-mono text-techfest mb-3"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          EVENT_02 // AI & TECH
        </p>
        <h1 className="font-display font-black leading-none mb-3" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>
          <span className="text-text-base">TechFest </span>
          <span className="text-techfest">2.0</span>
        </h1>
        <p
          className="font-mono text-text-muted mb-5"
          style={{ fontSize: '12px', letterSpacing: '2px' }}
        >
          BEYOND THE PROMPT
        </p>
        <div className="w-24 h-[1px] bg-techfest" />
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   TAB BAR
   ======================================== */

interface TabBarProps {
  activeTab: TechFestTab
  onTabChange: (tab: TechFestTab) => void
}

function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <RevealOnScroll direction="up" delay={0.1}>
      <div
        className="flex w-fit mb-12 overflow-x-auto max-w-full"
        style={{ border: '1px solid rgba(0,180,216,0.3)' }}
        role="tablist"
        aria-label="TechFest sections"
      >
        {tabs.map((tab, i) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${tab.label} tab`}
              onClick={() => onTabChange(tab.key)}
              className="font-display uppercase transition-colors duration-150 cursor-pointer flex-shrink-0"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                padding: '10px 22px',
                backgroundColor: isActive ? '#00b4d8' : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(26,26,46,0.5)',
                fontWeight: isActive ? 700 : 400,
                borderRight: i < tabs.length - 1 ? '1px solid rgba(0,180,216,0.2)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#00b4d8'
                  e.currentTarget.style.backgroundColor = 'rgba(0,180,216,0.06)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(26,26,46,0.5)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   ABOUT TAB
   ======================================== */

function AboutTab() {
  return (
    <RevealOnScroll direction="up">
      <div className="max-w-3xl">
        <p className="font-body text-text-base text-lg leading-relaxed mb-8">
          <strong className="text-techfest font-display tracking-wide">TechFest 2.0</strong> is a one-day interactive event designed to empower university students with hands-on experience across various Google technologies. The event aims to bridge the gap between learning and innovation while building a strong, collaborative community of future tech leaders.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-techfest rounded-full" />
            <div>
              <h3 className="font-mono text-techfest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>PARTICIPATION</h3>
              <p className="font-body text-text-muted text-base">Open to all passionate students from higher education institutions in Malaysia who are eager to explore Google technologies.</p>
            </div>
          </div>
          
          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-techfest rounded-full" />
            <div>
              <h3 className="font-mono text-techfest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>EVENT IMPACT</h3>
              <p className="font-body text-text-muted text-base">Attendees will gain hands-on experience, discover real-world applications, and accelerate their technical learning.</p>
            </div>
          </div>

          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-techfest rounded-full" />
            <div>
              <h3 className="font-mono text-techfest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>EVENT FORMAT</h3>
              <p className="font-body text-text-muted text-base">The day features four expert speaker sharing sessions and five interactive booth sessions.</p>
            </div>
          </div>

          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-techfest rounded-full" />
            <div>
              <h3 className="font-mono text-techfest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>MAJOR TECH TRACKS</h3>
              <p className="font-body text-text-muted text-base">Activities and sessions will dive into five key areas: Fullstack Development, Cloud Computing, Generative AI, Machine Learning, and Cybersecurity.</p>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   TIMELINE TAB
   ======================================== */

interface AgendaItem {
  time: string
  event: string
  venue: string
  isHighlight?: boolean
}

const techfestAgenda: AgendaItem[] = [
  { time: '08:30 AM', event: 'Registration', venue: 'Auditorium' },
  { time: '09:00 AM', event: 'Opening Ceremony - Dr Gan Keng Hoon & Yeoh Chong Siang', venue: 'Auditorium' },
  { time: '10:00 AM', event: 'Building ADK with Skills and Tools - Leong Lai Fong', venue: 'Auditorium', isHighlight: true },
  { time: '11:00 AM', event: 'Hands-On Building Flutter Apps with Generative AI - Kenichi Kambara', venue: 'Auditorium', isHighlight: true },
  { time: '12:00 PM', event: 'Booth Visit & Networking', venue: 'SCL 1&2' },
  { time: '12:30 PM', event: 'Break', venue: 'Outside ELL' },
  { time: '02:00 PM', event: 'Hands-on Session 3 - Jeremy Lau Wei Han', venue: 'Auditorium', isHighlight: true },
  { time: '03:00 PM', event: 'Rapid Prototyping with AI Studio - Ho Zhi Yi', venue: 'Auditorium', isHighlight: true },
  { time: '04:00 PM', event: 'Booth Visit & Networking', venue: 'SCL 1&2' },
  { time: '05:00 PM', event: 'Closing Ceremony - Dr Gan Keng Hoon & Yeoh Chong Siang', venue: 'Auditorium' },
]

function TimelineTab() {
  return (
    <div className="max-w-3xl">
      {/* DAY PANEL */}
      <RevealOnScroll direction="up">
        <div className="mb-8 flex items-start sm:items-center gap-4">
          <div className="w-[8px] h-[8px] bg-[#00b4d8] rounded-sm flex-shrink-0 mt-2 sm:mt-0" />
          <div>
            <h2 className="font-display font-bold text-text-base text-xl sm:text-2xl uppercase tracking-wide">
              MAY 24, 2026 // TechFest 2.0
            </h2>
            <p className="font-mono text-[#00b4d8] opacity-80 mt-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>
              Venue: Universiti Sains Malaysia Main Campus
            </p>
          </div>
        </div>

        {/* AGENDA LIST */}
        <div className="flex flex-col">
          {techfestAgenda.map((row, idx) => (
            <div 
              key={idx}
              className="flex items-stretch transition-colors duration-200"
              style={{
                border: row.isHighlight ? '1px solid rgba(0,180,216,0.35)' : '1px solid rgba(0,180,216,0.1)',
                backgroundColor: row.isHighlight ? 'rgba(0,180,216,0.06)' : 'transparent',
                marginBottom: '8px',
              }}
              onMouseEnter={(e) => {
                if (!row.isHighlight) {
                  e.currentTarget.style.backgroundColor = 'rgba(0,180,216,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(0,180,216,0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (!row.isHighlight) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(0,180,216,0.1)'
                }
              }}
            >
              {/* Time Column */}
              <div 
                className="w-[70px] sm:w-[90px] flex-shrink-0 flex items-center justify-center p-3"
                style={{ borderRight: '1px solid rgba(0,180,216,0.12)' }}
              >
                <span className="font-mono font-bold text-[#00b4d8] text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
                  {row.time}
                </span>
              </div>

              {/* Event Column */}
              <div className="flex-1 flex flex-col justify-center p-3 pl-4">
                <span className="font-display text-[#1a1a2e]" style={{ fontSize: '14px', fontWeight: row.isHighlight ? 700 : 400, letterSpacing: '0.5px' }}>
                  {row.event}
                </span>
                <span className="font-mono text-[#00b4d8] opacity-70 sm:hidden mt-1" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                  {row.venue}
                </span>
              </div>

              {/* Venue Column */}
              <div
                className="hidden sm:flex w-[120px] flex-shrink-0 items-center justify-center p-3"
                style={{ borderLeft: '1px solid rgba(0,180,216,0.12)' }}
              >
                <span className="font-mono text-[#00b4d8] opacity-70 text-center" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                  {row.venue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  )
}

/* ========================================
   SPEAKERS TAB
   ======================================== */

interface Speaker {
  id: string
  name: string
  role: string
  org: string
  initials: string
  image?: string
}

const speakers: Speaker[] = [
  { id: 'SPEAKER_01', name: 'Leong Lai Fong', role: 'Senior AI Engineer', org: 'Guest Speaker', initials: 'LF', image: msLeongImage },
  { id: 'SPEAKER_02', name: 'Kenichi Kambara', role: 'Principal Evangelist (Tech) • SekaiPhone Owner', org: 'Guest Speaker', initials: 'KK', image: kenichiImage },
  { id: 'SPEAKER_03', name: 'Jeremy Lau Wei Han', role: 'Digital Analyst @ Central Bank of Malaysia (BNM)', org: 'Guest Speaker', initials: 'JL', image: jeremyImage },
  { id: 'SPEAKER_04', name: 'Ho Zhi Yi', role: 'Developer Community Manager for Singapore and Malaysia, Google', org: 'Guest Speaker', initials: 'ZY', image: zhiyiImage },
]

function SpeakersTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
      {speakers.map((speaker, i) => (
        <RevealOnScroll key={speaker.id} direction="up" delay={i * 0.15}>
          <div
            className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(0,180,216,0.15)',
              borderRadius: '24px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
            }}
          >
            {/* ID tag */}
            <p
              className="font-mono text-techfest mb-5 opacity-60"
              style={{ fontSize: '9px', letterSpacing: '3px' }}
            >
              {speaker.id}
            </p>

            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-5 overflow-hidden"
              style={{
                border: '2px solid rgba(0,180,216,0.4)',
                boxShadow: '0 0 20px rgba(0,180,216,0.1)',
                backgroundColor: 'rgba(0,180,216,0.04)',
              }}
            >
              {speaker.image ? (
                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
              ) : (
                <span
                  className="font-display font-bold text-techfest"
                  style={{ fontSize: '28px' }}
                >
                  {speaker.initials}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="font-display font-bold text-text-base text-base mb-1">
              {speaker.name}
            </h3>

            {/* Role */}
            <p className="font-body text-text-muted text-xs mb-3 min-h-[3.5rem]">
              {speaker.role}
            </p>

            {/* Org badge */}
            <span
              className="font-mono inline-block px-3 py-1 rounded-full"
              style={{
                fontSize: '9px',
                letterSpacing: '1px',
                color: '#00b4d8',
                backgroundColor: 'rgba(0,180,216,0.06)',
                border: '1px solid rgba(0,180,216,0.15)',
              }}
            >
              {speaker.org}
            </span>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  )
}

/* ========================================
   TOPICS TAB
   ======================================== */

interface Topic {
  number: string
  title: string
  desc?: string
  icon: React.ReactNode
}

/* ── Standardized topic icons (20×20, 1.5px stroke, single-color) ── */
const iconStyle = { width: 20, height: 20, color: '#00b4d8' }

const IconADK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const IconGenAI = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M18 14l.75 2.25L21 17l-2.25.75L18 20l-.75-2.25L15 17l2.25-.75z" />
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5z" />
  </svg>
)

const IconCyber = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconRapidProto = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconFullstack = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const IconML = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    {/* Cell body */}
    <circle cx="9" cy="12" r="3" />
    {/* Dendrites */}
    <path d="M6 9L3 6" />
    <path d="M6 12L2 12" />
    <path d="M6 15L3 18" />
    {/* Axon */}
    <path d="M12 12h4" />
    <path d="M16 12c1.5 0 3-1 4-3" />
    <path d="M16 12c1.5 0 3 1 4 3" />
    {/* Axon terminals */}
    <circle cx="20" cy="9" r="1" />
    <circle cx="20" cy="15" r="1" />
    {/* Dendrite tips */}
    <circle cx="3" cy="6" r="1" />
    <circle cx="3" cy="18" r="1" />
  </svg>
)

const IconCloud = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
  </svg>
)

const speakerTopics: Topic[] = [
  {
    number: 'S1',
    title: 'Building ADK with Skills and Tools',
    desc: "Agent Development Kit (ADK)'s SkillToolset enables agents to load domain expertise on demand. With the right skill configuration, your agent can generate entirely new expertise at runtime. In this session, you will first discover how to initialise a new ADK agent project and compose a robust system prompt using structured builder. Next, you will learn adding tools and dynamically load skills into the agent's toolset. After that, you will learn testing the agent's execution locally.",
    icon: IconADK,
  },
  { number: 'S2', title: 'Hands-On Building Flutter Apps with Generative AI', desc: 'In this hands-on workshop, participants will use Generative AI together with Flutter to build their own original mobile app step by step. The session will also briefly introduce some of the latest AI trends and practical AI-powered development workflows.', icon: IconGenAI },
  { number: 'S3', title: 'Hands-On Building Smart Projects with AI', desc: 'In this hands-on session, participants will learn how to leverage AI tools to brainstorm, plan, and build a working project from scratch. The session covers practical workflows for turning ideas into prototypes using AI-assisted development, making it ideal for both beginners and those preparing for hackathons.', icon: IconRapidProto },
  {
    number: 'S4',
    title: 'Rapid Prototyping with AI Studio',
    desc: 'This is an introductory session aims to empower anyone, with or without technical background, to build and deploy an application in less than 30 minutes. If you are not building and shipping application yet, don\'t miss out!',
    icon: IconRapidProto,
  },
]

const boothTopics: Topic[] = [
  {
    number: 'B1',
    title: 'Fullstack Development',
    desc: 'An introductory session that guides participants through the fundamentals of Full Stack Development using Firebase Studio. Learn how modern web applications are built and deployed through a simple hands-on development workflow.',
    icon: IconFullstack,
  },
  {
    number: 'B2',
    title: 'Machine Learning',
    desc: 'A beginner-friendly introduction to Machine Learning with TensorFlow, covering neural networks, AI model training, and real-world applications of intelligent systems in modern technology.',
    icon: IconML,
  },
  {
    number: 'B3',
    title: 'Generative AI',
    desc: 'Discover how Generative AI can be integrated into modern applications to create smarter, more personalized user experiences through intelligent recommendations, automation, and multi-agent systems.',
    icon: IconGenAI,
  },
  {
    number: 'B4',
    title: 'Cloud Computing',
    desc: 'Explore how autonomous AI agents are built using modern cloud technologies, tool integrations, and AI workflows. This session introduces the fundamentals of agentic AI development and deployment in real-world applications.',
    icon: IconCloud,
  },
  {
    number: 'B5',
    title: 'Cybersecurity',
    desc: 'Test your cybersecurity skills through interactive hacking challenges, phishing simulations, and Mini-CTF activities designed to introduce real-world digital security concepts in a fun and engaging way.',
    icon: IconCyber,
  },
]

function BoothAccordion({ topic, delay, isOpen, onToggle }: { topic: Topic; delay: number; isOpen: boolean; onToggle: () => void }) {

  return (
    <RevealOnScroll direction="up" delay={delay}>
      <div
        className="transition-colors duration-200"
        style={{
          borderBottom: '1px solid rgba(0,180,216,0.12)',
          backgroundColor: isOpen ? 'rgba(0,180,216,0.02)' : 'transparent',
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full py-5 px-5 text-left flex items-center gap-4 group focus:outline-none cursor-pointer transition-colors duration-150"
        >
          <span
            className="flex-shrink-0 flex items-center justify-center"
            style={{ opacity: isOpen ? 1 : 0.6, transition: 'opacity 0.2s' }}
          >
            {topic.icon}
          </span>
          <span
            className="font-display font-medium text-base md:text-lg tracking-wide flex-1 transition-colors duration-200"
            style={{ color: isOpen ? '#00b4d8' : '#1a1a2e' }}
          >
            {topic.title}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            className="font-mono flex-shrink-0"
            style={{ fontSize: '20px', lineHeight: 1, color: isOpen ? '#00b4d8' : 'rgba(26,26,46,0.3)' }}
          >
            +
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && topic.desc && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-6 pl-[calc(44px+20px)] font-body text-base leading-relaxed" style={{ color: 'rgba(26,26,46,0.6)' }}>
                {topic.desc}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RevealOnScroll>
  )
}

function TopicsTab() {
  const [openSpeaker, setOpenSpeaker] = useState<number | null>(null)
  const [openBooth, setOpenBooth] = useState<number | null>(null)

  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <p className="font-mono text-techfest mb-6 opacity-60 uppercase" style={{ fontSize: '11px', letterSpacing: '3px' }}>
          // Hands-on Sessions
        </p>
        <div>
          {speakerTopics.map((topic, i) => (
            <BoothAccordion
              key={topic.number}
              topic={topic}
              delay={i * 0.1}
              isOpen={openSpeaker === i}
              onToggle={() => setOpenSpeaker(openSpeaker === i ? null : i)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-techfest mb-6 opacity-60 uppercase" style={{ fontSize: '11px', letterSpacing: '3px' }}>
          // Booth Sessions
        </p>
        <div>
          {boothTopics.map((topic, i) => (
            <BoothAccordion
              key={topic.number}
              topic={topic}
              delay={i * 0.1}
              isOpen={openBooth === i}
              onToggle={() => setOpenBooth(openBooth === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ========================================
   GIFTAWAY TAB
   ======================================== */

const giftaways = [
  { name: 'GDGoC USM Cap', qty: 2, image: prizeCaps },
  { name: 'Dino Plush Keychain', qty: 2, image: prizeDino },
]

function GiftawayTab() {
  return (
    <RevealOnScroll direction="up">
      <div className="max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {giftaways.map((gift) => (
            <div
              key={gift.name}
              className="flex flex-col items-center text-center p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(0,180,216,0.12)',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div
                className="w-full overflow-hidden mb-5"
                style={{ height: '200px', borderRadius: '14px', backgroundColor: 'rgba(0,180,216,0.03)' }}
              >
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-contain p-4 select-none"
                  draggable="false"
                />
              </div>
              <span className="font-display font-semibold block mb-1" style={{ fontSize: '16px', color: '#1a1a2e' }}>
                {gift.name}
              </span>
              <span className="font-mono text-techfest opacity-60" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                x{gift.qty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   REGISTER TAB
   ======================================== */

function RegisterTab() {
  return (
    <RevealOnScroll direction="up">
      <div
        className="max-w-xl p-10 text-center flex flex-col items-center mx-auto"
        style={{
          border: '1px solid rgba(0,180,216,0.25)',
          backgroundColor: 'rgba(0,180,216,0.02)',
        }}
      >
        <p
          className="font-mono text-techfest mb-6"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          // SCAN TO REGISTER
        </p>

        <div className="w-64 h-64 bg-white p-3 rounded-lg mb-8 shadow-[0_0_30px_rgba(0,180,216,0.15)] transition-transform duration-300 hover:scale-105">
          <img
            src={tfqr}
            alt="TechFest Registration QR Code"
            className="w-full h-full object-contain"
            draggable="false"
          />
        </div>

        <p className="font-body text-text-muted text-base mb-8 max-w-sm mx-auto leading-relaxed">
          Ready to join the action? Scan the QR code above or click the button below to fill out the official registration form.
        </p>

        <a
          href="https://forms.gle/wBMxKnnLFbC7tdBx6"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-10 py-4 font-display font-bold uppercase tracking-widest cursor-pointer transition-transform duration-200 hover:-translate-y-1 inline-block text-center rounded-sm"
          style={{
            backgroundColor: '#00b4d8',
            color: '#ffffff',
            fontSize: '13px',
            letterSpacing: '3px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(0,180,216,0.2)',
          }}
        >
          Open Form Link
        </a>
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   PAGE COMPONENT
   ======================================== */

export default function TechFest() {
  const [activeTab, setActiveTab] = useState<TechFestTab>('about')

  const renderTab = (): React.ReactNode => {
    switch (activeTab) {
      case 'about':
        return <AboutTab />
      case 'timeline':
        return <TimelineTab />
      case 'speakers':
        return <SpeakersTab />
      case 'topics':
        return <TopicsTab />
      case 'giftaway':
        return <GiftawayTab />
      case 'register':
        return <RegisterTab />
    }
  }

  return (
    <PageWrapper>
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-10 md:py-16">
      <PageHeader />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <div key={activeTab} className="tab-content-enter" role="tabpanel">
        {renderTab()}
      </div>
    </section>
    </PageWrapper>
  )
}
