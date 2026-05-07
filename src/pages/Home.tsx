import { useNavigate } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 md:py-32 px-6">
      {/* Corner bracket — top-left amber */}
      <div
        className="absolute top-8 left-8 w-5 h-5 pointer-events-none"
        style={{
          borderTop: '2px solid #ffb830',
          borderLeft: '2px solid #ffb830',
        }}
        aria-hidden="true"
      />
      {/* Corner bracket — bottom-right cyan */}
      <div
        className="absolute bottom-8 right-8 w-5 h-5 pointer-events-none"
        style={{
          borderBottom: '2px solid #00dcc0',
          borderRight: '2px solid #00dcc0',
        }}
        aria-hidden="true"
      />

      {/* Eyebrow */}
      <p
        className="font-mono text-techfest mb-6"
        style={{ fontSize: '11px', letterSpacing: '4px' }}
      >
        // GDGoC USM presents //
      </p>

      {/* Main title — responsive: text-4xl on mobile, 72px on md+ */}
      <h1 className="font-display font-black text-center leading-none mb-6">
        <span className="block text-text-base text-4xl md:text-7xl">
          APEX
        </span>
        <span className="block text-gamefest text-4xl md:text-7xl">
          FEST_2026
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="font-mono text-text-muted text-center text-[10px] md:text-xs"
        style={{ letterSpacing: '3px' }}
      >
        TWO EVENTS. ONE STAGE. INFINITE POSSIBILITIES.
      </p>
    </section>
  )
}

function HeroStatusBar() {
  return (
    <div
      className="w-full bg-surface px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2"
      style={{ borderTop: '1px solid rgba(0,220,192,0.1)', borderBottom: '1px solid rgba(0,220,192,0.1)' }}
      role="status"
      aria-label="Event status"
    >
      {/* Left */}
      <span
        className="font-mono text-techfest"
        style={{ fontSize: '10px', letterSpacing: '2px' }}
      >
        SYS::APEXFEST_2026 — ONLINE
      </span>

      {/* Center — pulsing dot + LIVE */}
      <div className="flex items-center gap-2">
        <span className="pulse-dot pulse-dot-cyan" aria-hidden="true" />
        <span
          className="font-mono text-techfest"
          style={{ fontSize: '10px', letterSpacing: '2px' }}
        >
          LIVE
        </span>
      </div>

      {/* Right */}
      <span
        className="font-mono text-text-muted"
        style={{ fontSize: '10px', letterSpacing: '2px' }}
      >
        GDGoC_USM // v2.0.26
      </span>
    </div>
  )
}

interface EventCardProps {
  accent: 'gamefest' | 'techfest'
  tag: string
  title: string
  description: string
  metaItems: string[]
  to: string
}

function EventCard({ accent, tag, title, description, metaItems, to }: EventCardProps) {
  const navigate = useNavigate()

  const isAmber = accent === 'gamefest'
  const accentColor = isAmber ? '#ffb830' : '#00dcc0'
  const accentColorMuted = isAmber ? 'rgba(255,184,48,0.15)' : 'rgba(0,220,192,0.15)'
  const borderMuted = isAmber ? 'rgba(255,184,48,0.25)' : 'rgba(0,220,192,0.25)'
  const borderHover = isAmber ? 'rgba(255,184,48,0.6)' : 'rgba(0,220,192,0.6)'
  const bgHover = isAmber ? 'rgba(255,184,48,0.04)' : 'rgba(0,220,192,0.04)'

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="group relative text-left w-full transition-all duration-200 cursor-pointer"
      style={{
        border: `1px solid ${borderMuted}`,
        backgroundColor: 'transparent',
        transform: 'translateY(0)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = borderHover
        e.currentTarget.style.backgroundColor = bgHover
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = borderMuted
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      aria-label={`View ${title} details`}
    >
      {/* Top accent line */}
      <div className="w-full h-[2px]" style={{ backgroundColor: accentColor }} aria-hidden="true" />

      <div className="p-6 md:p-8">
        {/* Tag */}
        <p
          className="font-mono mb-4"
          style={{ fontSize: '10px', letterSpacing: '3px', color: accentColor }}
        >
          {tag}
        </p>

        {/* Title */}
        <h2
          className="font-display font-bold text-text-base mb-4 text-xl md:text-2xl"
        >
          {title}
        </h2>

        {/* Description */}
        <p className="font-body text-text-muted text-base leading-relaxed mb-6">
          {description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          {metaItems.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <span
                className="font-mono"
                style={{ fontSize: '10px', letterSpacing: '2px', color: accentColor }}
              >
                {item}
              </span>
              {i < metaItems.length - 1 && (
                <span
                  className="inline-block w-[3px] h-[3px] rounded-full"
                  style={{ backgroundColor: accentColorMuted }}
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

function EventCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EventCard
          accent="gamefest"
          tag="EVENT_01 // GAMING"
          title="Game Fest 2026"
          description="Compete in high-stakes gaming tournaments across multiple titles. From solo showdowns to team battles — prove your skill on the biggest stage of the year."
          metaItems={['TIMELINE', 'PRIZEPOOL', 'REGISTER']}
          to="/gamefest"
        />
        <EventCard
          accent="techfest"
          tag="EVENT_02 // AI & TECH"
          title="TechFest 2.0 / Beyond the Prompt"
          description="Explore the frontier of artificial intelligence and emerging technology. Industry speakers, live demos, and workshops that go beyond the surface."
          metaItems={['TIMELINE', 'SPEAKERS', 'TOPICS']}
          to="/techfest"
        />
      </div>
    </section>
  )
}

function CTAButtons() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pb-16 md:pb-24 px-6">
      <button
        type="button"
        onClick={() => navigate('/gamefest')}
        className="font-display uppercase text-gamefest transition-all duration-200 cursor-pointer w-full sm:w-auto"
        style={{
          fontSize: '10px',
          letterSpacing: '3px',
          border: '1px solid rgba(255,184,48,0.5)',
          backgroundColor: 'transparent',
          padding: '14px 32px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,184,48,0.08)'
          e.currentTarget.style.borderColor = '#ffb830'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(255,184,48,0.5)'
        }}
        aria-label="Register for GameFest"
      >
        Register // GameFest
      </button>

      <button
        type="button"
        onClick={() => navigate('/techfest')}
        className="font-display uppercase text-techfest transition-all duration-200 cursor-pointer w-full sm:w-auto"
        style={{
          fontSize: '10px',
          letterSpacing: '3px',
          border: '1px solid rgba(0,220,192,0.5)',
          backgroundColor: 'transparent',
          padding: '14px 32px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0,220,192,0.08)'
          e.currentTarget.style.borderColor = '#00dcc0'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(0,220,192,0.5)'
        }}
        aria-label="Explore TechFest"
      >
        Explore // TechFest
      </button>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroStatusBar />
      <EventCards />
      <CTAButtons />
    </>
  )
}
