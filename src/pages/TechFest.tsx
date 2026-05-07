import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'

type TechFestTab = 'timeline' | 'speakers' | 'topics' | 'faq'

const tabs: { key: TechFestTab; label: string }[] = [
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
        style={{ border: '1px solid rgba(0,220,192,0.3)' }}
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
                backgroundColor: isActive ? '#00dcc0' : 'transparent',
                color: isActive ? '#0a0a0f' : 'rgba(232,228,212,0.5)',
                fontWeight: isActive ? 700 : 400,
                borderRight: i < tabs.length - 1 ? '1px solid rgba(0,220,192,0.2)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#00dcc0'
                  e.currentTarget.style.backgroundColor = 'rgba(0,220,192,0.06)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(232,228,212,0.5)'
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
   TIMELINE TAB
   ======================================== */

interface TimelineEvent {
  date: string
  title: string
  description: string
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'JUL 10, 2026',
    title: 'Speaker Announcement',
    description: 'The full speaker lineup is revealed. Follow our socials for exclusive previews and session breakdowns leading up to the event.',
  },
  {
    date: 'JUL 18, 2026',
    title: 'Registration Closes',
    description: 'Last day to secure your seat. Walk-ins may be accommodated subject to venue capacity on the day itself.',
  },
  {
    date: 'JUL 25, 2026',
    title: 'TechFest Day',
    description: 'A full day of keynotes, panels, workshops, and networking at USM campus. Doors open at 8:00 AM — be early, be ready.',
  },
]

function TimelineTab() {
  return (
    <div className="max-w-2xl">
      {timelineEvents.map((event, i) => (
        <RevealOnScroll key={event.title} direction="left" delay={i * 0.1}>
          <div className="flex gap-6">
            {/* Dot + connector */}
            <div className="flex flex-col items-center">
              <div
                className="w-[11px] h-[11px] flex-shrink-0 mt-1"
                style={{ border: '3px solid #00dcc0' }}
              />
              {i < timelineEvents.length - 1 && (
                <div className="w-[1px] flex-1 min-h-[48px]" style={{ backgroundColor: 'rgba(0,220,192,0.3)' }} />
              )}
            </div>

            {/* Content */}
            <div className="pb-10">
              <p
                className="font-mono text-techfest mb-1"
                style={{ fontSize: '10px', letterSpacing: '3px' }}
              >
                {event.date}
              </p>
              <h3 className="font-display font-bold text-text-base text-lg mb-2">
                {event.title}
              </h3>
              <p className="font-body text-text-muted text-base leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      ))}
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
}

const speakers: Speaker[] = [
  { id: 'SPEAKER_01', name: 'TBA', role: 'Keynote Speaker', org: 'To Be Announced', initials: '?' },
  { id: 'SPEAKER_02', name: 'TBA', role: 'Workshop Lead', org: 'To Be Announced', initials: '?' },
  { id: 'SPEAKER_03', name: 'TBA', role: 'Panelist', org: 'To Be Announced', initials: '?' },
]

function SpeakersTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      {speakers.map((speaker, i) => (
        <RevealOnScroll key={speaker.id} direction="up" delay={i * 0.15}>
          <div
            className="group"
            style={{ border: '1px solid rgba(0,220,192,0.2)' }}
          >
            {/* Top accent line */}
            <div className="w-full h-[2px]" style={{ backgroundColor: '#00dcc0' }} />

            <div className="p-6">
              {/* ID tag */}
              <p
                className="font-mono text-techfest mb-5"
                style={{ fontSize: '9px', letterSpacing: '3px' }}
              >
                {speaker.id}
              </p>

              {/* Avatar placeholder */}
              <div
                className="w-20 h-20 flex items-center justify-center mb-5 mx-auto"
                style={{ border: '1px solid rgba(0,220,192,0.4)' }}
              >
                <span
                  className="font-display font-bold text-techfest"
                  style={{ fontSize: '28px' }}
                >
                  {speaker.initials}
                </span>
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

const topics: Topic[] = [
  { number: '01', title: 'Generative AI in Production' },
  { number: '02', title: 'Prompt Engineering Deep Dive' },
  { number: '03', title: 'AI Ethics and Responsible Deployment' },
  { number: '04', title: 'Building with LLM APIs' },
  { number: '05', title: 'The Future of Human-AI Collaboration' },
]

function TopicsTab() {
  return (
    <div className="max-w-3xl space-y-3">
      {topics.map((topic, i) => (
        <RevealOnScroll key={topic.number} direction="left" delay={i * 0.1}>
          <div
            className="flex items-center gap-5 py-4 px-5 transition-all duration-200 cursor-default"
            style={{
              borderLeft: '2px solid rgba(0,220,192,0.2)',
              backgroundColor: 'rgba(0,220,192,0.02)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderLeftColor = '#00dcc0'
              e.currentTarget.style.backgroundColor = 'rgba(0,220,192,0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderLeftColor = 'rgba(0,220,192,0.2)'
              e.currentTarget.style.backgroundColor = 'rgba(0,220,192,0.02)'
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
      ))}
    </div>
  )
}

/* ========================================
   PAGE COMPONENT
   ======================================== */

export default function TechFest() {
  const [activeTab, setActiveTab] = useState<TechFestTab>('timeline')

  const renderTab = (): React.ReactNode => {
    switch (activeTab) {
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
