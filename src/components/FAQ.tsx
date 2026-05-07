import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'

interface FAQItem {
  question: string
  answer: string
}

const gameFestFaqItems: FAQItem[] = [
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

const techFestFaqItems: FAQItem[] = [
  {
    question: 'Is TechFest free to attend?',
    answer: 'Yes — TechFest 2.0 is completely free for all currently enrolled USM students. External attendees may register subject to availability and a nominal fee that will be announced closer to the event date.',
  },
  {
    question: 'Will sessions be recorded?',
    answer: 'Select sessions will be recorded and made available post-event on our official YouTube channel. However, workshops and interactive panels will not be recorded to encourage open participation.',
  },
  {
    question: 'Can I submit a lightning talk?',
    answer: 'Absolutely. We are running an open call for 5-minute lightning talks on any AI or tech topic. Submission details will be shared via our Discord and social media channels — stay tuned for the announcement.',
  },
]

export default function FAQ() {
  const [activeEvent, setActiveEvent] = useState<'gamefest' | 'techfest'>('gamefest')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const isAmber = activeEvent === 'gamefest'
  const accentColor = isAmber ? '#ffb830' : '#00dcc0'
  const borderColor = isAmber ? 'rgba(255,184,48,0.15)' : 'rgba(0,220,192,0.15)'
  const items = isAmber ? gameFestFaqItems : techFestFaqItems

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Reset open index when switching tabs
  const handleToggle = (event: 'gamefest' | 'techfest') => {
    if (activeEvent !== event) {
      setActiveEvent(event)
      setOpenIndex(null)
    }
  }

  return (
    <section id="faq" className="w-full min-h-screen max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
      <RevealOnScroll direction="up">
        <div className="mb-12 flex flex-col items-center text-center">
          <p
            className="font-mono text-text-muted mb-3"
            style={{ fontSize: '10px', letterSpacing: '3px' }}
          >
            // GOT QUESTIONS?
          </p>
          <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: '56px' }}>
            <span className="text-text-base">Event </span>
            <span style={{ color: accentColor, transition: 'color 0.3s ease' }}>FAQ</span>
          </h1>
          <div 
            className="w-24 h-[1px]" 
            style={{ backgroundColor: accentColor, transition: 'background-color 0.3s ease' }} 
          />
        </div>
      </RevealOnScroll>

      {/* Toggle Switch */}
      <RevealOnScroll direction="up">
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => handleToggle('gamefest')}
            className={`font-mono px-6 py-2 transition-all duration-300 ${isAmber ? 'text-[#ffb830]' : 'text-text-muted hover:text-text-base'}`}
            style={{
              border: isAmber ? '1px solid rgba(255,184,48,0.5)' : '1px solid rgba(255,255,255,0.1)',
              backgroundColor: isAmber ? 'rgba(255,184,48,0.05)' : 'transparent',
              fontSize: '12px',
              letterSpacing: '2px'
            }}
          >
            GAMEFEST
          </button>
          <button
            onClick={() => handleToggle('techfest')}
            className={`font-mono px-6 py-2 transition-all duration-300 ${!isAmber ? 'text-[#00dcc0]' : 'text-text-muted hover:text-text-base'}`}
            style={{
              border: !isAmber ? '1px solid rgba(0,220,192,0.5)' : '1px solid rgba(255,255,255,0.1)',
              backgroundColor: !isAmber ? 'rgba(0,220,192,0.05)' : 'transparent',
              fontSize: '12px',
              letterSpacing: '2px'
            }}
          >
            TECHFEST
          </button>
        </div>
      </RevealOnScroll>

      {/* FAQ Accordion */}
      <div className="w-full max-w-3xl space-y-0 h-[520px] sm:h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    borderTop: i === 0 ? `1px solid ${borderColor}` : 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(i)}
                    className="w-full py-5 px-4 text-left flex justify-between items-center group focus:outline-none transition-colors duration-150"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isAmber ? 'rgba(255,184,48,0.03)' : 'rgba(0,220,192,0.03)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <span
                      className="font-display font-medium text-lg tracking-wide transition-colors duration-200"
                      style={{ color: isOpen ? accentColor : '#e8e4d4' }}
                    >
                      {item.question}
                    </span>
                    <div className="w-6 h-6 flex flex-shrink-0 items-center justify-center ml-4">
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className="font-mono flex-shrink-0"
                        style={{ fontSize: '20px', lineHeight: 1, color: isOpen ? accentColor : 'rgba(232,228,212,0.5)' }}
                      >
                        +
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-6 font-body text-text-muted text-base leading-relaxed text-left">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
