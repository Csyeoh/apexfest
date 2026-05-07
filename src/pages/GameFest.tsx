import { useState } from 'react'

type GameFestTab = 'timeline' | 'rules' | 'prizepool' | 'faq' | 'register'

const tabs: { key: GameFestTab; label: string }[] = [
  { key: 'timeline', label: 'Timeline' },
  { key: 'rules', label: 'Rules' },
  { key: 'prizepool', label: 'Prizepool' },
  { key: 'faq', label: 'FAQ' },
  { key: 'register', label: 'Register' },
]

/* ========================================
   PAGE HEADER
   ======================================== */

function PageHeader() {
  return (
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
    date: 'JUN 01, 2026',
    title: 'Registration Opens',
    description: 'Sign up through the official ApexFest portal. Early registration recommended — slots are limited per game category.',
  },
  {
    date: 'JUN 20, 2026',
    title: 'Registration Closes',
    description: 'Final day to submit your registration form and lock in your game category. No late entries accepted.',
  },
  {
    date: 'JUL 05, 2026',
    title: 'Qualifier Rounds',
    description: 'Online qualifier matches begin. Top performers from each bracket advance to the grand finals stage.',
  },
  {
    date: 'JUL 20, 2026',
    title: 'Grand Finals',
    description: 'Live on-stage finals at USM campus. Champions are crowned, prizes are awarded, legends are made.',
  },
]

function TimelineTab() {
  return (
    <div className="max-w-2xl">
      {timelineEvents.map((event, i) => (
        <div key={event.title} className="flex gap-6">
          {/* Dot + connector */}
          <div className="flex flex-col items-center">
            <div
              className="w-[11px] h-[11px] flex-shrink-0 mt-1"
              style={{ border: '3px solid #ffb830' }}
            />
            {i < timelineEvents.length - 1 && (
              <div className="w-[1px] flex-1 min-h-[48px]" style={{ backgroundColor: 'rgba(255,184,48,0.3)' }} />
            )}
          </div>

          {/* Content */}
          <div className="pb-10">
            <p
              className="font-mono text-gamefest mb-1"
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
      ))}
    </div>
  )
}

/* ========================================
   RULES TAB
   ======================================== */

const rules: string[] = [
  'All participants must present a valid student ID upon check-in. Non-students may participate as wildcard entries subject to slot availability.',
  'Any form of cheating, exploiting, or use of unauthorized third-party software is strictly prohibited and will result in immediate disqualification.',
  'All decisions made by judges and referees are final. Disputes must be raised through the official channel within 15 minutes of the match.',
  'Participants must attend their scheduled match on time. A 10-minute grace period is granted — after which the match is forfeited.',
  'GDGoC USM reserves the right to disqualify any participant or team for unsportsmanlike conduct, harassment, or violation of event policies.',
  'Game-specific rules, settings, and ban/pick formats will be announced one week before the qualifier rounds via the official Discord server.',
]

function RulesTab() {
  return (
    <div
      className="max-w-3xl p-8"
      style={{
        border: '1px solid rgba(255,184,48,0.25)',
        backgroundColor: 'rgba(255,184,48,0.02)',
      }}
    >
      <p
        className="font-mono text-gamefest mb-6"
        style={{ fontSize: '10px', letterSpacing: '3px' }}
      >
        // GENERAL RULES
      </p>

      <ol className="space-y-5">
        {rules.map((rule, i) => (
          <li key={i} className="flex gap-4">
            <span
              className="font-mono text-gamefest flex-shrink-0 mt-0.5"
              style={{ fontSize: '13px', letterSpacing: '1px' }}
            >
              {String(i + 1).padStart(2, '0')}.
            </span>
            <p className="font-body text-text-muted text-base leading-relaxed">
              {rule}
            </p>
          </li>
        ))}
      </ol>
    </div>
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
      {prizes.map((prize) => (
        <div
          key={prize.rank}
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
      ))}
    </div>
  )
}

/* ========================================
   FAQ TAB
   ======================================== */

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Who can participate in Game Fest 2026?',
    answer: 'Game Fest is open to all currently enrolled students at USM. External participants may join as wildcard entries if slots are available. Each participant must have a valid student ID for verification during check-in.',
  },
  {
    question: 'What games will be featured?',
    answer: 'The game lineup includes titles across FPS, MOBA, Fighting, and Card Game categories. Specific titles and tournament formats will be announced on our official Discord server two weeks before qualifiers begin.',
  },
  {
    question: 'Is there an entry fee?',
    answer: 'No. Game Fest 2026 is completely free to enter for all registered participants. There are no hidden fees or paid tiers — just show up, compete, and have fun.',
  },
  {
    question: 'Can I join multiple game categories?',
    answer: 'Yes, you may register for up to two game categories. However, you are responsible for ensuring your match schedules do not conflict. In case of overlap, you must choose one and forfeit the other.',
  },
]

function FAQTab() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl space-y-0">
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            style={{
              borderBottom: '1px solid rgba(255,184,48,0.15)',
              borderTop: i === 0 ? '1px solid rgba(255,184,48,0.15)' : 'none',
            }}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-label={`${item.question} — click to ${isOpen ? 'collapse' : 'expand'}`}
              className="w-full flex items-center justify-between py-5 px-2 text-left cursor-pointer transition-colors duration-150"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,184,48,0.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span className="font-display text-text-base text-sm tracking-wide pr-4">
                {item.question}
              </span>
              <span
                className="font-mono text-gamefest flex-shrink-0"
                style={{ fontSize: '18px', lineHeight: 1 }}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="px-2 pb-5">
                <p className="font-body text-text-muted text-base leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
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
  )
}

/* ========================================
   PAGE COMPONENT
   ======================================== */

export default function GameFest() {
  const [activeTab, setActiveTab] = useState<GameFestTab>('timeline')

  const renderTab = (): React.ReactNode => {
    switch (activeTab) {
      case 'timeline':
        return <TimelineTab />
      case 'rules':
        return <RulesTab />
      case 'prizepool':
        return <PrizepoolTab />
      case 'faq':
        return <FAQTab />
      case 'register':
        return <RegisterTab />
    }
  }

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-10 md:py-16">
      <PageHeader />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <div key={activeTab} className="tab-content-enter" role="tabpanel">
        {renderTab()}
      </div>
    </section>
  )
}
