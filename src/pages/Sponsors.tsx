/* ========================================
   PAGE HEADER
   ======================================== */

function PageHeader() {
  return (
    <div className="mb-16">
      <p
        className="font-mono text-text-muted mb-3"
        style={{ fontSize: '10px', letterSpacing: '3px' }}
      >
        // PARTNERS & SPONSORS
      </p>
      <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: '56px' }}>
        <span className="text-text-base">Our </span>
        <span className="text-techfest">Sponsors</span>
      </h1>
      <div className="w-24 h-[1px] bg-techfest" />
    </div>
  )
}

/* ========================================
   SECTION LABEL
   ======================================== */

interface SectionLabelProps {
  label: string
  dotColor: 'amber' | 'cyan'
}

function SectionLabel({ label, dotColor }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="w-[6px] h-[6px] flex-shrink-0"
        style={{
          backgroundColor: dotColor === 'amber' ? '#ffb830' : '#00dcc0',
          borderRadius: '1px',
        }}
      />
      <span
        className="font-mono text-text-muted"
        style={{ fontSize: '10px', letterSpacing: '3px' }}
      >
        {label}
      </span>
    </div>
  )
}

/* ========================================
   PLACEHOLDER BOX
   ======================================== */

interface PlaceholderBoxProps {
  height: number
  accent: 'amber' | 'cyan'
  label: string
  labelSize?: number
}

function PlaceholderBox({ height, accent, label, labelSize = 11 }: PlaceholderBoxProps) {
  const isAmber = accent === 'amber'
  const borderColor = isAmber ? 'rgba(255,184,48,0.3)' : 'rgba(0,220,192,0.2)'
  const bgColor = isAmber ? 'rgba(255,184,48,0.03)' : 'rgba(0,220,192,0.02)'
  const textColor = isAmber ? 'rgba(255,184,48,0.4)' : 'rgba(0,220,192,0.35)'

  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: `${height}px`,
        border: `1px solid ${borderColor}`,
        backgroundColor: bgColor,
      }}
    >
      <span
        className="font-mono text-center"
        style={{
          fontSize: `${labelSize}px`,
          letterSpacing: '3px',
          color: textColor,
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ========================================
   TITLE SPONSOR
   ======================================== */

function TitleSponsor() {
  return (
    <section className="mb-16">
      <SectionLabel label="TITLE SPONSOR" dotColor="amber" />
      <div className="max-w-[400px]">
        <PlaceholderBox height={160} accent="amber" label="YOUR LOGO HERE" labelSize={12} />
      </div>
    </section>
  )
}

/* ========================================
   GOLD SPONSORS
   ======================================== */

function GoldSponsors() {
  return (
    <section className="mb-16">
      <SectionLabel label="GOLD SPONSORS" dotColor="amber" />
      <div className="grid grid-cols-2 gap-4 max-w-[500px]">
        <PlaceholderBox height={120} accent="amber" label="LOGO" />
        <PlaceholderBox height={120} accent="amber" label="LOGO" />
      </div>
    </section>
  )
}

/* ========================================
   SILVER SPONSORS
   ======================================== */

function SilverSponsors() {
  return (
    <section className="mb-16">
      <SectionLabel label="SILVER SPONSORS" dotColor="cyan" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <PlaceholderBox key={i} height={80} accent="cyan" label="LOGO" labelSize={9} />
        ))}
      </div>
    </section>
  )
}

/* ========================================
   COMMUNITY PARTNERS
   ======================================== */

function CommunityPartners() {
  return (
    <section className="mb-20">
      <SectionLabel label="COMMUNITY PARTNERS" dotColor="cyan" />
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-[500px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{
              width: '100%',
              aspectRatio: '1',
              border: '1px solid rgba(0,220,192,0.15)',
              backgroundColor: 'rgba(0,220,192,0.015)',
            }}
          >
            <span
              className="font-mono"
              style={{ fontSize: '8px', letterSpacing: '1px', color: 'rgba(0,220,192,0.25)' }}
            >
              +
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ========================================
   TIER BENEFITS
   ======================================== */

interface TierBenefit {
  tier: string
  perk: string
  color: string
}

const tierBenefits: TierBenefit[] = [
  { tier: 'TITLE', perk: 'Main stage branding, keynote intro, all digital assets', color: '#ffb830' },
  { tier: 'GOLD', perk: 'Booth space, session sponsorship, social features', color: '#ffb830' },
  { tier: 'SILVER', perk: 'Logo on materials, website listing, event mentions', color: '#00dcc0' },
  { tier: 'COMMUNITY', perk: 'Logo feature, partner shoutout, community access', color: '#00dcc0' },
]

/* ========================================
   BECOME A SPONSOR CTA
   ======================================== */

function BecomeASponsor() {
  return (
    <section
      className="p-10 md:p-12"
      style={{
        border: '1px solid rgba(0,220,192,0.25)',
        backgroundColor: 'rgba(0,220,192,0.02)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left side — pitch */}
        <div>
          <p
            className="font-mono text-techfest mb-4"
            style={{ fontSize: '10px', letterSpacing: '3px' }}
          >
            // INTERESTED IN SPONSORING?
          </p>
          <h2 className="font-display font-bold text-text-base text-2xl mb-4">
            Become a Sponsor
          </h2>
          <p className="font-body text-text-muted text-base leading-relaxed mb-6">
            ApexFest connects you directly with hundreds of USM students — future engineers,
            designers, and founders across gaming and technology. Put your brand at the intersection
            of innovation and community, and gain visibility where it matters most.
          </p>
          <button
            type="button"
            className="font-display uppercase text-techfest cursor-pointer transition-all duration-200"
            style={{
              fontSize: '10px',
              letterSpacing: '3px',
              border: '1px solid rgba(0,220,192,0.5)',
              backgroundColor: 'transparent',
              padding: '12px 28px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,220,192,0.08)'
              e.currentTarget.style.borderColor = '#00dcc0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(0,220,192,0.5)'
            }}
          >
            Contact Us // Sponsorship
          </button>
        </div>

        {/* Right side — tier benefits */}
        <div>
          <p
            className="font-mono text-text-muted mb-5"
            style={{ fontSize: '10px', letterSpacing: '3px' }}
          >
            // TIER OVERVIEW
          </p>
          <div className="space-y-4">
            {tierBenefits.map((benefit) => (
              <div
                key={benefit.tier}
                className="flex gap-4 py-3 px-4"
                style={{ borderLeft: `2px solid ${benefit.color}30` }}
              >
                <span
                  className="font-mono flex-shrink-0 w-20"
                  style={{ fontSize: '10px', letterSpacing: '2px', color: benefit.color }}
                >
                  {benefit.tier}
                </span>
                <span className="font-body text-text-muted text-sm leading-relaxed">
                  {benefit.perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================================
   PAGE COMPONENT
   ======================================== */

export default function Sponsors() {
  return (
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-16">
      <PageHeader />
      <TitleSponsor />
      <GoldSponsors />
      <SilverSponsors />
      <CommunityPartners />
      <BecomeASponsor />
    </section>
  )
}
