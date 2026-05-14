import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import RevealOnScroll from '../components/RevealOnScroll'
import gfqr from '../assets/qr/gfqr.png'
import prize1 from '../assets/prize/1.png'
import prize2 from '../assets/prize/2.png'
import prize3 from '../assets/prize/3.png'
import prize4 from '../assets/prize/4.png'
import prize5 from '../assets/prize/5.png'
import prize6 from '../assets/prize/6.png'
import prizeCaps from '../assets/prize/caps.png'
import prizeDino from '../assets/prize/dino.png'

type GameFestTab = 'about' | 'timeline' | 'rules' | 'prize' | 'giftaway' | 'register'

const tabs: { key: GameFestTab; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'rules', label: 'Rules' },
  { key: 'prize', label: 'Prize' },
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
        style={{ border: '1px solid rgba(255,0,127,0.3)' }}
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
                backgroundColor: isActive ? '#ff007f' : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(26,26,46,0.5)',
                fontWeight: isActive ? 700 : 400,
                borderRight: i < tabs.length - 1 ? '1px solid rgba(255,0,127,0.2)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#ff007f'
                  e.currentTarget.style.backgroundColor = 'rgba(255,0,127,0.06)'
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
      { time: '06:00 PM', event: 'End', location: 'Auditorium' },
    ]
  },
]

function TimelineTab() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1')

  const currentEvent = timelineEvents.find(e => e.id === activeDay)!

  return (
    <div className="max-w-3xl">
      {/* TAB SWITCHER */}
      <div className="flex w-full mb-10" style={{ border: '1px solid rgba(255,0,127,0.3)' }}>
        {timelineEvents.map((evt) => {
          const isActive = activeDay === evt.id
          return (
            <button
              key={evt.id}
              onClick={() => setActiveDay(evt.id as 'day1' | 'day2')}
              className="flex-1 font-display uppercase transition-colors duration-200 cursor-pointer"
              style={{
                padding: '12px 0',
                backgroundColor: isActive ? '#ff007f' : 'transparent',
                color: isActive ? '#1a1a2e' : 'rgba(26,26,46,0.5)',
                fontWeight: isActive ? 700 : 400,
                fontSize: '14px',
                letterSpacing: '2px',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#ff007f'
                  e.currentTarget.style.backgroundColor = 'rgba(255,0,127,0.06)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(26,26,46,0.5)'
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
          <div className="w-[8px] h-[8px] bg-[#ff007f] rounded-sm flex-shrink-0 mt-2 sm:mt-0" />
          <div>
            <h2 className="font-display font-bold text-text-base text-xl sm:text-2xl uppercase tracking-wide">
              {currentEvent.date} // {currentEvent.title}
            </h2>
            <p className="font-mono text-[#ff007f] opacity-80 mt-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>
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
                  <span className="font-mono text-[#ff007f] opacity-50 uppercase" style={{ fontSize: '9px', letterSpacing: '3px' }}>
                    // {row.sectionHeader}
                  </span>
                </div>
              )}

              {/* Agenda Row */}
              <div 
                className="flex items-stretch transition-colors duration-200"
                style={{
                  border: row.isMatch ? '1px solid rgba(255,0,127,0.35)' : '1px solid rgba(255,0,127,0.1)',
                  backgroundColor: row.isMatch ? 'rgba(255,0,127,0.06)' : 'transparent',
                  marginBottom: '8px',
                }}
                onMouseEnter={(e) => {
                  if (!row.isMatch) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,0,127,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255,0,127,0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!row.isMatch) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255,0,127,0.1)'
                  }
                }}
              >
                {/* Time Column */}
                <div 
                  className="w-[90px] flex-shrink-0 flex items-center justify-center p-3"
                  style={{ borderRight: '1px solid rgba(255,0,127,0.12)' }}
                >
                  <span className="font-mono font-bold text-[#ff007f] text-center" style={{ fontSize: '12px', letterSpacing: '1px' }}>
                    {row.time}
                  </span>
                </div>

                {/* Event Column */}
                <div className="flex-1 flex flex-col justify-center p-3 pl-4">
                  <span className="font-display text-[#1a1a2e]" style={{ fontSize: '14px', fontWeight: row.isMatch ? 700 : 400, letterSpacing: '0.5px' }}>
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
          border: '1px solid rgba(255,0,127,0.25)',
          backgroundColor: 'rgba(255,0,127,0.02)',
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
   PRIZE TAB
   ======================================== */

interface PrizeEntry {
  rank: string
  model: string
  value: string
  image: string
}

const prizes: PrizeEntry[] = [
  { rank: '1ST', model: 'Fantech MK856 Green MAXFIT87', value: 'RM189', image: prize1 },
  { rank: '2ND', model: 'Fantech Helios XD3 Wireless Mouse', value: 'RM292', image: prize2 },
  { rank: '3RD', model: 'Attack Shark X82 Pro HE Manga', value: 'RM299', image: prize3 },
  { rank: '4TH', model: 'MOFII Sweet 2.4G Wireless Keyboard', value: 'RM130', image: prize4 },
  { rank: '5TH', model: 'MOFII Honey BT 5.1 Keyboard 83 Key', value: 'RM109', image: prize5 },
  { rank: '6TH', model: 'Lawak Kampus Deskmat', value: 'RM99', image: prize6 },
]

const giftaways = [
  { name: 'GDGoC USM Cap', qty: 2, image: prizeCaps },
  { name: 'Dino Plush Keychain', qty: 2, image: prizeDino },
]

/* ── Tier badge SVG ── */
function RankBadge({ rank, size = 64 }: { rank: string; size?: number }) {
  const num = rank.replace(/\D/g, '')
  const isTop3 = ['1ST', '2ND', '3RD'].includes(rank)
  const accent = isTop3 ? '#ff007f' : 'rgba(26,26,46,0.15)'

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" stroke={accent} strokeWidth="1.5" />
      {isTop3 && <circle cx="32" cy="32" r="25" stroke={accent} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />}
      <text
        x="32"
        y="30"
        textAnchor="middle"
        dominantBaseline="central"
        fill={accent}
        fontSize={isTop3 ? '20' : '16'}
        fontFamily="'Sora', sans-serif"
        fontWeight="700"
      >
        {num}
      </text>
      <text
        x="32"
        y="44"
        textAnchor="middle"
        dominantBaseline="central"
        fill={isTop3 ? accent : 'rgba(26,26,46,0.3)'}
        fontSize="7"
        fontFamily="'Sora', sans-serif"
        fontWeight="500"
        letterSpacing="1"
      >
        {rank.slice(-2)}
      </text>
    </svg>
  )
}

function PrizeTab() {
  const top3 = prizes.slice(0, 3)
  const rest = prizes.slice(3, 6)

  return (
    <RevealOnScroll direction="up">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-10">

        {/* TOP 3 CARDS */}
        <div>
          <p className="font-mono text-gamefest mb-5 opacity-60 uppercase" style={{ fontSize: '11px', letterSpacing: '3px' }}>
            // Top 3
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {top3.map((prize) => {
              const isFirst = prize.rank === '1ST'
              return (
                <div
                  key={prize.rank}
                  className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: isFirst ? 'rgba(255,0,127,0.04)' : 'rgba(255,255,255,0.7)',
                    border: isFirst ? '1px solid rgba(255,0,127,0.25)' : '1px solid rgba(255,0,127,0.1)',
                    borderRadius: '20px',
                    boxShadow: isFirst ? '0 8px 30px rgba(255,0,127,0.08)' : '0 4px 20px rgba(0,0,0,0.03)',
                  }}
                >
                  <RankBadge rank={prize.rank} size={isFirst ? 72 : 64} />
                  <div
                    className="w-full flex items-center justify-center my-4 overflow-hidden"
                    style={{ height: '120px', borderRadius: '12px', backgroundColor: 'rgba(255,0,127,0.03)' }}
                  >
                    <img
                      src={prize.image}
                      alt={prize.model}
                      className="w-full h-full object-contain p-3 select-none"
                      draggable="false"
                    />
                  </div>
                  <span className="font-display font-semibold block mb-1" style={{ fontSize: '13px', color: '#1a1a2e' }}>
                    {prize.model}
                  </span>
                  <span
                    className="font-mono text-gamefest border border-gamefest rounded-sm mt-1"
                    style={{ fontSize: '9px', padding: '2px 8px', letterSpacing: '1px' }}
                  >
                    {prize.value}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 4TH–6TH ROW */}
        <div>
          <p className="font-mono text-gamefest mb-5 opacity-60 uppercase" style={{ fontSize: '11px', letterSpacing: '3px' }}>
            // 4th – 6th
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rest.map((prize) => (
              <div
                key={prize.rank}
                className="flex flex-col items-center text-center p-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(26,26,46,0.06)',
                  borderRadius: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
                }}
              >
                <RankBadge rank={prize.rank} size={52} />
                <div
                  className="w-full flex items-center justify-center my-3 overflow-hidden"
                  style={{ height: '100px', borderRadius: '10px', backgroundColor: 'rgba(26,26,46,0.02)' }}
                >
                  <img
                    src={prize.image}
                    alt={prize.model}
                    className="w-full h-full object-contain p-3 select-none"
                    draggable="false"
                  />
                </div>
                <span className="font-display font-semibold block mb-1" style={{ fontSize: '12px', color: '#1a1a2e' }}>
                  {prize.model}
                </span>
                <span
                  className="font-mono border rounded-sm mt-1"
                  style={{ fontSize: '9px', padding: '2px 8px', letterSpacing: '1px', color: 'rgba(26,26,46,0.35)', borderColor: 'rgba(26,26,46,0.12)' }}
                >
                  {prize.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   GIFTAWAY TAB
   ======================================== */

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
                border: '1px solid rgba(255,0,127,0.12)',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div
                className="w-full overflow-hidden mb-5"
                style={{ height: '200px', borderRadius: '14px', backgroundColor: 'rgba(255,0,127,0.03)' }}
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
              <span className="font-mono text-gamefest opacity-60" style={{ fontSize: '11px', letterSpacing: '1px' }}>
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
          border: '1px solid rgba(255,0,127,0.25)',
          backgroundColor: 'rgba(255,0,127,0.02)',
        }}
      >
        <p
          className="font-mono text-gamefest mb-6"
          style={{ fontSize: '10px', letterSpacing: '3px' }}
        >
          // SCAN TO REGISTER
        </p>

        <div className="w-64 h-64 bg-white p-3 rounded-lg mb-8 shadow-[0_0_30px_rgba(255,0,127,0.15)] transition-transform duration-300 hover:scale-105">
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
            backgroundColor: '#ff007f',
            color: '#ffffff',
            fontSize: '13px',
            letterSpacing: '3px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(255,0,127,0.2)',
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
      case 'prize':
        return <PrizeTab />
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
