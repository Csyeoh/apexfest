import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'
import msLeongImage from '../assets/speakers/msleong.jpg'

type TechFestTab = 'about' | 'timeline' | 'speakers' | 'topics'

const tabs: { key: TechFestTab; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'speakers', label: 'Speakers' },
  { key: 'topics', label: 'Topics' },
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
        <h1 className="font-display font-black leading-none mb-3" style={{ fontSize: '56px' }}>
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
        style={{ border: '1px solid rgba(70,244,255,0.3)' }}
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
                backgroundColor: isActive ? '#46f4ff' : 'transparent',
                color: isActive ? '#0a0a0f' : 'rgba(215,253,255,0.5)',
                fontWeight: isActive ? 700 : 400,
                borderRight: i < tabs.length - 1 ? '1px solid rgba(70,244,255,0.2)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#46f4ff'
                  e.currentTarget.style.backgroundColor = 'rgba(70,244,255,0.06)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(215,253,255,0.5)'
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
  isHighlight?: boolean
}

const techfestAgenda: AgendaItem[] = [
  { time: '09:00 AM', event: 'Opening Ceremony' },
  { time: '09:20 AM', event: 'Hands-on Session: "Building ADK with Skills and Tools" by Ms. Leong Lai Fong', isHighlight: true },
  { time: '10:20 AM', event: 'Hands-on Session: Cloud Computing', isHighlight: true },
  { time: '11:20 AM', event: 'Interactive Booth Sessions (All Tech Tracks)' },
  { time: '12:30 PM', event: 'Break' },
  { time: '02:00 PM', event: 'Hands-on Session: Generative AI, Machine Learning', isHighlight: true },
  { time: '03:00 PM', event: 'Hands-on Session: Cybersecurity', isHighlight: true },
  { time: '04:00 PM', event: 'Interactive Booth Sessions (All Tech Tracks)' },
  { time: '05:00 PM', event: 'Closing Ceremony' },
  { time: '05:45 PM', event: 'End' },
]

function TimelineTab() {
  return (
    <div className="max-w-3xl">
      {/* DAY PANEL */}
      <RevealOnScroll direction="up">
        <div className="mb-8 flex items-start sm:items-center gap-4">
          <div className="w-[8px] h-[8px] bg-[#46f4ff] rounded-sm flex-shrink-0 mt-2 sm:mt-0" />
          <div>
            <h2 className="font-display font-bold text-text-base text-xl sm:text-2xl uppercase tracking-wide">
              MAY 24, 2026 // TechFest 2.0
            </h2>
            <p className="font-mono text-[#46f4ff] opacity-80 mt-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>
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
                border: row.isHighlight ? '1px solid rgba(70,244,255,0.35)' : '1px solid rgba(70,244,255,0.1)',
                backgroundColor: row.isHighlight ? 'rgba(70,244,255,0.06)' : 'transparent',
                marginBottom: '8px',
              }}
              onMouseEnter={(e) => {
                if (!row.isHighlight) {
                  e.currentTarget.style.backgroundColor = 'rgba(70,244,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(70,244,255,0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (!row.isHighlight) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(70,244,255,0.1)'
                }
              }}
            >
              {/* Time Column */}
              <div 
                className="w-[90px] flex-shrink-0 flex items-center justify-center p-3"
                style={{ borderRight: '1px solid rgba(70,244,255,0.12)' }}
              >
                <span className="font-mono font-bold text-[#46f4ff] text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
                  {row.time}
                </span>
              </div>

              {/* Event Column */}
              <div className="flex-1 flex flex-col justify-center p-3 pl-4">
                <span className="font-display text-[#d7fdff]" style={{ fontSize: '14px', fontWeight: row.isHighlight ? 700 : 400, letterSpacing: '0.5px' }}>
                  {row.event}
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
  { id: 'SPEAKER_01', name: 'Ms. Leong Lai Fong', role: 'Senior AI Engineer', org: 'Guest Speaker', initials: 'LF', image: msLeongImage },
  { id: 'SPEAKER_02', name: 'TBA', role: 'Workshop Lead', org: 'To Be Announced', initials: '?' },
  { id: 'SPEAKER_03', name: 'TBA', role: 'Panelist', org: 'To Be Announced', initials: '?' },
]

function SpeakersTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      {speakers.map((speaker, i) => (
        <RevealOnScroll key={speaker.id} direction="up" delay={i * 0.15}>
          <div
            className="group relative"
            style={{ border: '1px solid rgba(70,244,255,0.2)' }}
          >
            {/* Top accent line — positioned at top edge */}
            <div className="absolute left-0 right-0 h-[2px]" style={{ top: '-1px', backgroundColor: '#46f4ff' }} />

            <div className="p-6">
              {/* ID tag */}
              <p
                className="font-mono text-techfest mb-5"
                style={{ fontSize: '9px', letterSpacing: '3px' }}
              >
                {speaker.id}
              </p>

              {/* Avatar placeholder / image */}
              <div
                className="w-20 h-20 flex items-center justify-center mb-5 mx-auto overflow-hidden"
                style={{ border: '1px solid rgba(70,244,255,0.4)' }}
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
              <h3 className="font-display font-bold text-text-base text-base text-center mb-1">
                {speaker.name}
              </h3>

              {/* Role */}
              <p className="font-body text-text-muted text-sm text-center mb-2">
                {speaker.role}
              </p>

              {/* Org */}
              <p
                className="font-mono text-techfest text-center"
                style={{ fontSize: '10px', letterSpacing: '2px' }}
              >
                {speaker.org}
              </p>
            </div>
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
}

const speakerTopics: Topic[] = [
  { number: 'S1', title: 'Building ADK with Skills and Tools' },
  { number: 'S2', title: 'Cloud Computing' },
  { number: 'S3', title: 'Generative AI & Machine Learning' },
  { number: 'S4', title: 'Cybersecurity' },
]

const boothTopics: Topic[] = [
  { number: 'B1', title: 'Fullstack Development' },
  { number: 'B2', title: 'Cloud Computing' },
  { number: 'B3', title: 'Generative AI' },
  { number: 'B4', title: 'Machine Learning' },
  { number: 'B5', title: 'Cybersecurity' },
]

function TopicItem({ topic, delay }: { topic: Topic; delay: number }) {
  return (
    <RevealOnScroll direction="left" delay={delay}>
      <div
        className="flex items-center gap-5 py-4 px-5 transition-all duration-200 cursor-default"
        style={{
          borderLeft: '2px solid rgba(70,244,255,0.2)',
          backgroundColor: 'rgba(70,244,255,0.02)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderLeftColor = '#46f4ff'
          e.currentTarget.style.backgroundColor = 'rgba(70,244,255,0.06)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderLeftColor = 'rgba(70,244,255,0.2)'
          e.currentTarget.style.backgroundColor = 'rgba(70,244,255,0.02)'
        }}
      >
        <span
          className="font-mono text-techfest flex-shrink-0"
          style={{ fontSize: '13px', letterSpacing: '2px' }}
        >
          {topic.number}
        </span>
        <span className="font-body text-text-base text-lg">
          {topic.title}
        </span>
      </div>
    </RevealOnScroll>
  )
}

function TopicsTab() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <p className="font-mono text-techfest mb-6 opacity-60 uppercase" style={{ fontSize: '11px', letterSpacing: '3px' }}>
          // Speaker Sessions
        </p>
        <div className="space-y-3">
          {speakerTopics.map((topic, i) => (
            <TopicItem key={topic.number} topic={topic} delay={i * 0.1} />
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-techfest mb-6 opacity-60 uppercase" style={{ fontSize: '11px', letterSpacing: '3px' }}>
          // Booth Sessions
        </p>
        <div className="space-y-3">
          {boothTopics.map((topic, i) => (
            <TopicItem key={topic.number} topic={topic} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </div>
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
