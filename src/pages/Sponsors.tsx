import { useState, useEffect, useRef } from 'react'
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
          // PARTNERS & SPONSORS
        </p>
        <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: '56px' }}>
          <span className="text-text-base">Our </span>
          <span className="text-techfest">Sponsors</span>
        </h1>
        <div className="w-24 h-[1px] bg-techfest" />
      </div>
    </RevealOnScroll>
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
   TITLE SPONSOR — with pulsing border
   ======================================== */

function TitleSponsor() {
  return (
    <RevealOnScroll direction="up">
      <section className="mb-16">
        <SectionLabel label="TITLE SPONSOR" dotColor="amber" />
        <div className="max-w-[400px]">
          <motion.div
            className="flex items-center justify-center"
            style={{
              height: '160px',
              border: '1px solid rgba(255,184,48,0.4)',
              backgroundColor: 'rgba(255,184,48,0.03)',
            }}
            whileHover={{
              borderColor: [
                'rgba(255,184,48,0.4)',
                'rgba(255,184,48,1)',
                'rgba(255,184,48,0.4)',
              ],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <span
              className="font-mono text-center"
              style={{
                fontSize: '12px',
                letterSpacing: '3px',
                color: 'rgba(255,184,48,0.4)',
              }}
            >
              YOUR LOGO HERE
            </span>
          </motion.div>
        </div>
      </section>
    </RevealOnScroll>
  )
}

/* ========================================
   GOLD SPONSORS
   ======================================== */

function GoldSponsors() {
  return (
    <section className="mb-16">
      <RevealOnScroll direction="up">
        <SectionLabel label="GOLD SPONSORS" dotColor="amber" />
      </RevealOnScroll>
      <div className="grid grid-cols-2 gap-4 max-w-[500px]">
        {[0, 1].map((i) => (
          <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
            <PlaceholderBox height={120} accent="amber" label="LOGO" />
          </RevealOnScroll>
        ))}
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
      <RevealOnScroll direction="up">
        <SectionLabel label="SILVER SPONSORS" dotColor="cyan" />
      </RevealOnScroll>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
            <PlaceholderBox height={80} accent="cyan" label="LOGO" labelSize={9} />
          </RevealOnScroll>
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
      <RevealOnScroll direction="up">
        <SectionLabel label="COMMUNITY PARTNERS" dotColor="cyan" />
      </RevealOnScroll>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-[500px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <RevealOnScroll key={i} direction="up" delay={i * 0.1}>
            <div
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
          </RevealOnScroll>
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
   COUNTER STAT — animates from 0 to target
   ======================================== */

interface CounterStatProps {
  target: number
  suffix?: string
  label: string
  color: string
}

function CounterStat({ target, suffix = '', label, color }: CounterStatProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const step = Math.max(1, Math.floor(target / 30))
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + step
        if (next >= target) {
          clearInterval(interval)
          return target
        }
        return next
      })
    }, 35)
    return () => clearInterval(interval)
  }, [hasStarted, target])

  return (
    <div ref={ref} className="text-center">
      <span className="font-display font-bold text-xl" style={{ color }}>
        {count}{suffix}
      </span>
      <span className="font-mono text-text-muted ml-2" style={{ fontSize: '10px', letterSpacing: '2px' }}>
        {label}
      </span>
    </div>
  )
}

/* ========================================
   STATS STRIP
   ======================================== */

function StatsStrip() {
  return (
    <RevealOnScroll direction="up">
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-6 px-8 mb-10"
        style={{
          border: '1px solid rgba(0,220,192,0.12)',
          backgroundColor: 'rgba(0,220,192,0.015)',
        }}
      >
        <CounterStat target={2} label="Events" color="#ffb830" />
        <span className="hidden sm:block font-mono text-text-muted" style={{ fontSize: '10px' }}>·</span>
        <CounterStat target={500} suffix="+" label="Expected Attendees" color="#00dcc0" />
        <span className="hidden sm:block font-mono text-text-muted" style={{ fontSize: '10px' }}>·</span>
        <CounterStat target={10} suffix="+" label="Sponsors" color="#ffb830" />
      </div>
    </RevealOnScroll>
  )
}

/* ========================================
   BECOME A SPONSOR CTA
   ======================================== */

function BecomeASponsor() {
  return (
    <RevealOnScroll direction="up">
      <motion.section
        className="p-10 md:p-12"
        style={{
          border: '1px solid rgba(0,220,192,0.25)',
          backgroundColor: 'rgba(0,220,192,0.02)',
        }}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.2, ease: 'easeOut' },
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
      </motion.section>
    </RevealOnScroll>
  )
}

/* ========================================
   PAGE COMPONENT
   ======================================== */

export default function Sponsors() {
  return (
    <PageWrapper>
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-16">
      <PageHeader />
      <TitleSponsor />
      <GoldSponsors />
      <SilverSponsors />
      <CommunityPartners />
      <StatsStrip />
      <BecomeASponsor />
    </section>
    </PageWrapper>
  )
}
