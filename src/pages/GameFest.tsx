import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'

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
  { rank: '1ST', amount: 'RM1,500', label: 'Champion', highlight: true },
  { rank: '2ND', amount: 'RM800', label: 'Runner Up', highlight: false },
  { rank: '3RD', amount: 'RM400', label: 'Third Place', highlight: false },
]

function PrizepoolTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      {prizes.map((prize, i) => (
        <RevealOnScroll key={prize.rank} direction="up" delay={i * 0.15}>
          <div
            className="p-8 text-center"
            style={{
              border: prize.highlight
                ? '1px solid rgba(255,184,48,0.6)'
                : '1px solid rgba(255,184,48,0.2)',
              backgroundColor: prize.highlight
                ? 'rgba(255,184,48,0.04)'
                : 'transparent',
            }}
          >
            <p
              className="font-mono text-gamefest mb-4"
              style={{ fontSize: '12px', letterSpacing: '4px' }}
            >
              {prize.rank}
            </p>
            <p
              className="font-display font-bold text-text-base mb-2"
              style={{ fontSize: '28px' }}
            >
              {prize.amount}
            </p>
            <p className="font-body text-text-muted text-base">
              {prize.label}
            </p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
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
  const [form, setForm] = useState<FormData>({
    fullName: '',
    studentId: '',
    email: '',
    gameCategory: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="max-w-xl p-10 text-center"
        style={{
          border: '1px solid rgba(255,184,48,0.3)',
          backgroundColor: 'rgba(255,184,48,0.03)',
        }}
      >
        <p
          className="font-mono text-gamefest mb-3"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          // REGISTRATION CONFIRMED
        </p>
        <h3 className="font-display font-bold text-text-base text-xl mb-2">
          You're In, {form.fullName}.
        </h3>
        <p className="font-body text-text-muted text-base">
          Check your email for confirmation details and next steps.
        </p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    border: 'none',
    borderBottom: '1px solid rgba(255,184,48,0.3)',
    backgroundColor: 'transparent',
    outline: 'none',
    width: '100%',
    padding: '10px 0',
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '16px',
    color: '#e8e4d4',
  }

  const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = '#ffb830'
    e.currentTarget.style.boxShadow = '0 1px 0 0 #ffb830'
  }

  const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = 'rgba(255,184,48,0.3)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <RevealOnScroll direction="right">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl p-8"
        style={{
          border: '1px solid rgba(255,184,48,0.25)',
        }}
      >
        <div className="space-y-8">
          {/* Full Name */}
          <div>
            <label
              className="font-mono text-text-muted uppercase block mb-2"
              style={{ fontSize: '10px', letterSpacing: '3px' }}
            >
              Full Name
            </label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              style={inputStyle}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
          </div>

          {/* Student ID */}
          <div>
            <label
              className="font-mono text-text-muted uppercase block mb-2"
              style={{ fontSize: '10px', letterSpacing: '3px' }}
            >
              Student ID
            </label>
            <input
              type="text"
              required
              value={form.studentId}
              onChange={(e) => handleChange('studentId', e.target.value)}
              placeholder="e.g. 123456"
              style={inputStyle}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="font-mono text-text-muted uppercase block mb-2"
              style={{ fontSize: '10px', letterSpacing: '3px' }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@student.usm.my"
              style={inputStyle}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
          </div>

          {/* Game Category */}
          <div>
            <label
              className="font-mono text-text-muted uppercase block mb-2"
              style={{ fontSize: '10px', letterSpacing: '3px' }}
            >
              Game Category
            </label>
            <select
              required
              value={form.gameCategory}
              onChange={(e) => handleChange('gameCategory', e.target.value)}
              style={{
                ...inputStyle,
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23ffb830' stroke-width='1.5'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 4px center',
              }}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            >
              <option value="" disabled>Select a category</option>
              <option value="fps">FPS</option>
              <option value="moba">MOBA</option>
              <option value="fighting">Fighting</option>
              <option value="card-game">Card Game</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          aria-label="Submit registration form"
          className="w-full mt-10 py-3.5 font-display font-bold uppercase tracking-widest cursor-pointer transition-opacity duration-150 hover:opacity-90"
          style={{
            backgroundColor: '#ffb830',
            color: '#0a0a0f',
            fontSize: '12px',
            letterSpacing: '3px',
            border: 'none',
          }}
        >
          Submit Registration
        </button>
      </form>
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
