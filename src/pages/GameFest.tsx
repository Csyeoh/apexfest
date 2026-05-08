import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'
import gfqr from '../assets/qr/gfqr.png'

type GameFestTab = 'about' | 'timeline' | 'rules' | 'prizepool' | 'register'

const tabs: { key: GameFestTab; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'rules', label: 'Rules' },
  { key: 'prizepool', label: 'Prizepool' },
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
          className="font-mono text-gamefest mb-3"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          EVENT_01 // GAMING
        </p>
        <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: '56px' }}>
          <span className="text-text-base">Game Fest </span>
          <span className="text-gamefest">2026</span>
        </h1>
        <div className="w-24 h-[1px] bg-gamefest" />
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   TAB BAR
   ======================================== */

interface TabBarProps {
  activeTab: GameFestTab
  onTabChange: (tab: GameFestTab) => void
}

function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <RevealOnScroll direction="up" delay={0.1}>
      <div
        className="flex w-fit mb-12 overflow-x-auto max-w-full"
        style={{ border: '1px solid rgba(255,184,48,0.3)' }}
        role="tablist"
        aria-label="GameFest sections"
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
                backgroundColor: isActive ? '#ffb830' : 'transparent',
                color: isActive ? '#0a0a0f' : 'rgba(232,228,212,0.5)',
                fontWeight: isActive ? 700 : 400,
                borderRight: i < tabs.length - 1 ? '1px solid rgba(255,184,48,0.2)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#ffb830'
                  e.currentTarget.style.backgroundColor = 'rgba(255,184,48,0.06)'
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
   ABOUT TAB
   ======================================== */

function AboutTab() {
  return (
    <RevealOnScroll direction="up">
      <div className="max-w-3xl">
        <p className="font-body text-text-base text-lg leading-relaxed mb-8">
          <strong className="text-gamefest font-display tracking-wide">Gamefest 2026</strong> is the ultimate hybrid gaming experience organized by GDGoC USM. Featuring the high-stakes, block-stacking intensity of TETR.IO, the event is designed to transition from wide-scale online qualifiers to a pulse-pounding physical finale.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-gamefest rounded-full" />
            <div>
              <h3 className="font-mono text-gamefest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>PARTICIPATION</h3>
              <p className="font-body text-text-muted text-base">The event is completely free and open to all undergraduate students.</p>
            </div>
          </div>

          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-gamefest rounded-full" />
            <div>
              <h3 className="font-mono text-gamefest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>PERKS</h3>
              <p className="font-body text-text-muted text-base">The top 3 champions will walk away with legit gear, including a keyboard, headphones, and a mouse.</p>
            </div>
          </div>

          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-gamefest rounded-full" />
            <div>
              <h3 className="font-mono text-gamefest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>PHASE 1 - ONLINE OPEN QUALIFIER</h3>
              <p className="font-body text-text-muted text-base">Players will compete in Free-For-All (FFA) rounds to determine skill rankings. The field will be narrowed down to the Top 32 players.</p>
            </div>
          </div>

          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-gamefest rounded-full" />
            <div>
              <h3 className="font-mono text-gamefest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>PHASE 2 - PHYSICAL D-DAY</h3>
              <p className="font-body text-text-muted text-base">The Top 32 finalists receive exclusive invites to battle in a group tournament featuring high-energy, live-projected gameplay. All 32 finalists will also have meals and drinks provided on this day.</p>
            </div>
          </div>

          <div className="flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-md">
            <div className="w-1 h-auto bg-gamefest rounded-full" />
            <div>
              <h3 className="font-mono text-gamefest mb-1" style={{ fontSize: '11px', letterSpacing: '2px' }}>SIDE QUESTS</h3>
              <p className="font-body text-text-muted text-base">Open to all attendees (not just finalists), featuring interactive booths like Competitive Monkeytype, the classic Chrome Dinosaur Game, and massive Jackbox play.</p>
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
  location?: string
  isMatch?: boolean
  sectionHeader?: string
}

interface TimelineEvent {
  id: string
  tabLabel: string
  date: string
  title: string
  description: string
  agenda?: AgendaItem[]
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'day1',
    tabLabel: 'Day 1 // Online',
    date: 'MAY 16, 2026',
    title: 'Online Qualification Day',
    description: 'Meeting Platform: Cisco Webex | Game Platform: TETR.IO',
    agenda: [
      { time: '08:00 PM', event: 'Participant Check-in', sectionHeader: 'Pre-match' },
      { time: '08:15 PM', event: 'Technical Briefing' },
      { time: '08:30 PM', event: 'Tier 1 Start (Parallel)', isMatch: true, sectionHeader: 'Qualification Rounds' },
      { time: '09:00 PM', event: 'Tier 1 Results & Break' },
      { time: '09:15 PM', event: 'Tier 2 Start (Parallel)', isMatch: true },
      { time: '09:45 PM', event: 'Final Finalist Reveal', sectionHeader: 'Wrap-up' },
      { time: '10:00 PM', event: 'Closing & RSVP' },
    ]
  },
  {
    id: 'day2',
    tabLabel: 'Day 2 // Physical',
    date: 'MAY 23, 2026',
    title: 'Physical D-Day',
    description: 'Venue: School of Computer Science Auditorium',
    agenda: [
      { time: '09:00 AM', event: 'Registration Open', location: 'Auditorium', sectionHeader: 'Setup & Opening' },
      { time: '09:30 AM', event: 'Booth Open for Monkeytype and Jackbox', location: 'SCL1&2' },
      { time: '10:00 AM', event: 'Opening Ceremony & Finalist Introduction', location: 'Auditorium' },
      { time: '10:30 AM', event: 'Group Stage Qualifiers for Groups A & B - Recursive FFA', location: 'Auditorium', isMatch: true, sectionHeader: 'Group Stage' },
      { time: '12:00 PM', event: 'Group Stage Qualifiers for Groups C & D - Recursive FFA', location: 'Auditorium', isMatch: true },
      { time: '01:00 PM', event: 'Rest Time & Side Booth Activation', location: 'SCL1&2' },
      { time: '02:00 PM', event: 'The Knockout Stage - Top 8 Bracket Bo3', location: 'Auditorium', isMatch: true, sectionHeader: 'Finals' },
      { time: '04:00 PM', event: 'Grand Finals - Top 2 Championship Match Bo5', location: 'Auditorium', isMatch: true },
      { time: '04:45 PM', event: 'Prize Ceremony & Photography', location: 'Auditorium', sectionHeader: 'Closing' },
      { time: '05:15 PM', event: 'Teardown & Event Adjourned', location: 'Auditorium' },
    ]
  },
]

function TimelineTab() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1')

  const currentEvent = timelineEvents.find(e => e.id === activeDay)!

  return (
    <div className="max-w-3xl">
      {/* TAB SWITCHER */}
      <div className="flex w-full mb-10" style={{ border: '1px solid rgba(255,184,48,0.3)' }}>
        {timelineEvents.map((evt) => {
          const isActive = activeDay === evt.id
          return (
            <button
              key={evt.id}
              onClick={() => setActiveDay(evt.id as 'day1' | 'day2')}
              className="flex-1 font-display uppercase transition-colors duration-200 cursor-pointer"
              style={{
                padding: '12px 0',
                backgroundColor: isActive ? '#ffb830' : 'transparent',
                color: isActive ? '#0b0906' : 'rgba(232,228,212,0.5)',
                fontWeight: isActive ? 700 : 400,
                fontSize: '14px',
                letterSpacing: '2px',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#ffb830'
                  e.currentTarget.style.backgroundColor = 'rgba(255,184,48,0.06)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(232,228,212,0.5)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {evt.tabLabel}
            </button>
          )
        })}
      </div>

      {/* DAY PANEL */}
      <RevealOnScroll key={activeDay} direction="up">
        <div className="mb-8 flex items-start sm:items-center gap-4">
          <div className="w-[8px] h-[8px] bg-[#ffb830] rounded-sm flex-shrink-0 mt-2 sm:mt-0" />
          <div>
            <h2 className="font-display font-bold text-text-base text-xl sm:text-2xl uppercase tracking-wide">
              {currentEvent.date} // {currentEvent.title}
            </h2>
            <p className="font-mono text-[#ffb830] opacity-80 mt-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>
              {currentEvent.description}
            </p>
          </div>
        </div>

        {/* AGENDA LIST */}
        <div className="flex flex-col">
          {currentEvent.agenda?.map((row, idx) => (
            <div key={idx}>
              {/* Section Label */}
              {row.sectionHeader && (
                <div className={`mb-2 ${idx !== 0 ? 'mt-8' : ''}`}>
                  <span className="font-mono text-[#ffb830] opacity-50 uppercase" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                    // {row.sectionHeader}
                  </span>
                </div>
              )}

              {/* Agenda Row */}
              <div 
                className="flex items-stretch transition-colors duration-200"
                style={{
                  border: row.isMatch ? '1px solid rgba(255,184,48,0.35)' : '1px solid rgba(255,184,48,0.1)',
                  backgroundColor: row.isMatch ? 'rgba(255,184,48,0.06)' : 'transparent',
                  marginBottom: '8px',
                }}
                onMouseEnter={(e) => {
                  if (!row.isMatch) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,184,48,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255,184,48,0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!row.isMatch) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255,184,48,0.1)'
                  }
                }}
              >
                {/* Time Column */}
                <div 
                  className="w-[72px] flex-shrink-0 flex items-center justify-center p-3"
                  style={{ borderRight: '1px solid rgba(255,184,48,0.12)' }}
                >
                  <span className="font-mono text-[#ffb830] text-center" style={{ fontSize: '10px' }}>
                    {row.time}
                  </span>
                </div>

                {/* Event Column */}
                <div className="flex-1 flex flex-col justify-center p-3 pl-4">
                  <span className="font-display text-[#e8e4d4]" style={{ fontSize: '14px', fontWeight: row.isMatch ? 700 : 400, letterSpacing: '0.5px' }}>
                    {row.event}
                  </span>
                  {row.location && (
                    <span className="font-mono text-text-muted mt-1 uppercase" style={{ fontSize: '9px', letterSpacing: '1px' }}>
                      {row.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  )
}

/* ========================================
   RULES TAB
   ======================================== */

function RulesTab() {
  return (
    <RevealOnScroll direction="up">
      <div
        className="max-w-4xl p-2 sm:p-4"
        style={{
          border: '1px solid rgba(255,184,48,0.25)',
          backgroundColor: 'rgba(255,184,48,0.02)',
        }}
      >
        <div className="flex justify-between items-center mb-4 px-2">
          <p
            className="font-mono text-gamefest"
            style={{ fontSize: '10px', letterSpacing: '3px' }}
          >
            // OFFICIAL RULEBOOK
          </p>
          <a
            href="https://drive.google.com/file/d/1Q9bbf7vlQU3li_KKyfKkcCDRLuHTAghY/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-text-muted hover:text-gamefest transition-colors"
            style={{ fontSize: '10px', letterSpacing: '1px' }}
          >
            [ OPEN IN NEW TAB ]
          </a>
        </div>

        <div className="w-full aspect-[1/1.4] md:aspect-video relative overflow-hidden rounded">
          <iframe
            src="https://drive.google.com/file/d/1Q9bbf7vlQU3li_KKyfKkcCDRLuHTAghY/preview"
            className="absolute top-0 left-0 w-full h-full border-none"
            allow="autoplay"
            title="GameFest Official Rulebook"
          ></iframe>
        </div>
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   PRIZEPOOL TAB
   ======================================== */

interface PrizeEntry {
  rank: string
  amount: string
  label: string
  highlight: boolean
}

const prizes: PrizeEntry[] = [
  { rank: '1ST', amount: '?', label: 'Champion', highlight: true },
  { rank: '2ND', amount: '?', label: '1st Runner Up', highlight: false },
  { rank: '3RD', amount: '?', label: '2nd Runner Up', highlight: false },
]

function PrizepoolTab() {
  const podiumPrizes = [prizes[1], prizes[0], prizes[2]]
  
  const getPodiumStyles = (rank: string) => {
    if (rank === '1ST') {
      return {
        height: '110px',
        borderTop: '2px solid #ffb830',
        borderLeft: '1px solid #ffb830',
        borderRight: '1px solid #ffb830',
        borderBottom: 'none',
        backgroundColor: 'rgba(255,184,48,0.06)'
      }
    }
    if (rank === '2ND') {
      return {
        height: '75px',
        borderTop: '2px solid rgba(255,184,48,0.35)',
        borderLeft: '1px solid rgba(255,184,48,0.35)',
        borderRight: '1px solid rgba(255,184,48,0.35)',
        borderBottom: 'none',
        backgroundColor: 'rgba(255,184,48,0.03)'
      }
    }
    return {
      height: '50px',
      borderTop: '2px solid rgba(255,184,48,0.2)',
      borderLeft: '1px solid rgba(255,184,48,0.2)',
      borderRight: '1px solid rgba(255,184,48,0.2)',
      borderBottom: 'none',
      backgroundColor: 'transparent'
    }
  }

  const renderAmount = (amount: string, isFirst: boolean, isPodium: boolean) => {
    if (amount === '?') {
      return (
        <span 
          className="inline-block font-mono text-gamefest border border-gamefest rounded-sm"
          style={{ fontSize: '9px', padding: '2px 7px', letterSpacing: '1px' }}
        >
          TBA
        </span>
      )
    }
    return (
      <span 
        style={{ 
          fontFamily: "'Orbitron', sans-serif", 
          fontWeight: 900,
          fontSize: isPodium ? (isFirst ? '26px' : '20px') : (isFirst ? '16px' : '14px'),
          color: isFirst ? '#ffb830' : (isPodium ? '#e8e4d4' : 'rgba(232, 228, 212, 0.6)')
        }}
      >
        {amount}
      </span>
    )
  }

  return (
    <RevealOnScroll direction="up">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-12">
        
        {/* PODIUM */}
        <div className="grid grid-cols-3 items-end gap-2 sm:gap-4 w-full pt-8 px-2 sm:px-12">
          {podiumPrizes.map((prize) => {
            const isFirst = prize.rank === '1ST'
            const num = prize.rank.replace('ST', '').replace('ND', '').replace('RD', '')
            return (
              <div key={prize.rank} className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 text-center">
                  <span className="font-mono text-gamefest mb-2" style={{ fontSize: '10px', letterSpacing: '2px' }}>
                    {prize.rank}
                  </span>
                  {renderAmount(prize.amount, isFirst, true)}
                  <span className="font-body text-text-muted mt-2" style={{ fontSize: '13px' }}>
                    {prize.label}
                  </span>
                </div>
                
                <div 
                  className="w-full relative flex justify-center items-center overflow-hidden rounded-t-sm"
                  style={getPodiumStyles(prize.rank)}
                >
                  <span 
                    className="absolute inset-0 flex items-center justify-center leading-none select-none pointer-events-none"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 900,
                      fontSize: isFirst ? '90px' : prize.rank === '2ND' ? '60px' : '40px',
                      color: '#ffb830',
                      opacity: 0.18,
                      zIndex: 0
                    }}
                  >
                    {num}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* DETAIL STRIP */}
        <div 
          className="w-full flex flex-col rounded-sm"
          style={{
            border: '1px solid rgba(255,184,48,0.15)',
            backgroundColor: 'rgba(255,184,48,0.02)'
          }}
        >
          {prizes.map((prize, i) => {
            const isFirst = prize.rank === '1ST'
            const borderColor = isFirst ? '#ffb830' : prize.rank === '2ND' ? 'rgba(255,184,48,0.4)' : 'rgba(255,184,48,0.2)'
            const isLast = i === prizes.length - 1

            return (
              <div 
                key={prize.rank}
                className="grid grid-cols-[60px_1fr_1fr] items-center px-6 py-4 transition-colors duration-200"
                style={{
                  borderLeft: `2px solid ${borderColor}`,
                  borderBottom: isLast ? 'none' : '1px solid rgba(255,184,48,0.08)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,184,48,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span className="font-mono text-gamefest" style={{ fontSize: '10px', letterSpacing: '3px' }}>
                  {prize.rank}
                </span>
                <span className="font-display font-semibold" style={{ fontSize: '15px', color: '#e8e4d4' }}>
                  {prize.label}
                </span>
                <div className="text-right flex justify-end">
                  {renderAmount(prize.amount, isFirst, false)}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   REGISTER TAB
   ======================================== */

interface FormData {
  fullName: string
  studentId: string
  email: string
  gameCategory: string
}

function RegisterTab() {
  return (
    <RevealOnScroll direction="up">
      <div
        className="max-w-xl p-10 text-center flex flex-col items-center mx-auto"
        style={{
          border: '1px solid rgba(255,184,48,0.25)',
          backgroundColor: 'rgba(255,184,48,0.02)',
        }}
      >
        <p
          className="font-mono text-gamefest mb-6"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          // SCAN TO REGISTER
        </p>

        <div className="w-64 h-64 bg-white p-3 rounded-lg mb-8 shadow-[0_0_30px_rgba(255,184,48,0.15)] transition-transform duration-300 hover:scale-105">
          <img 
            src={gfqr} 
            alt="GameFest Registration QR Code" 
            className="w-full h-full object-contain"
            draggable="false"
          />
        </div>

        <p className="font-body text-text-muted text-base mb-8 max-w-sm mx-auto leading-relaxed">
          Ready to join the action? Scan the QR code above or click the button below to fill out the official registration form.
        </p>

        <a
          href="https://forms.gle/8adxFEuoF28uA3bV7"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-10 py-4 font-display font-bold uppercase tracking-widest cursor-pointer transition-transform duration-200 hover:-translate-y-1 inline-block text-center rounded-sm"
          style={{
            backgroundColor: '#ffb830',
            color: '#0a0a0f',
            fontSize: '13px',
            letterSpacing: '3px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(255,184,48,0.2)',
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

export default function GameFest() {
  const [activeTab, setActiveTab] = useState<GameFestTab>('about')

  const renderTab = (): React.ReactNode => {
    switch (activeTab) {
      case 'about':
        return <AboutTab />
      case 'timeline':
        return <TimelineTab />
      case 'rules':
        return <RulesTab />
      case 'prizepool':
        return <PrizepoolTab />
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
