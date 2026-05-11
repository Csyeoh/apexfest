import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'

interface FAQItem {
  question: string
  answer: string
}

const gameFestFaqItems: FAQItem[] = [
  {
    question: 'Who can participate?',
    answer: 'The event is open to all undergraduates students.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No, participation is completely free for all undergraduates students.',
  },
  {
    question: 'How do I qualify for the physical D-Day ?',
    answer: 'Only the Top 32 players from Online Open Qualifier will receive an exclusive invite to the physical event.',
  },
  {
    question: 'Who can join the side quest?',
    answer: 'The side booths are open to all attendees, not just the Top 32 finalists.',
  },
  {
    question: 'Will there be MyCSD points?',
    answer: 'Yes! Gamefest will provide MyCSD points for participants.',
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

  const isGamefest = activeEvent === 'gamefest'
  const accentColor = isGamefest ? '#ff007f' : '#00b4d8'
  const borderColor = isGamefest ? 'rgba(255,0,127,0.12)' : 'rgba(0,180,216,0.12)'
  const items = isGamefest ? gameFestFaqItems : techFestFaqItems

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleToggle = (event: 'gamefest' | 'techfest') => {
    if (activeEvent !== event) {
      setActiveEvent(event)
      setOpenIndex(null)
    }
  }

  return (
    <section id="faq" className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
      <RevealOnScroll direction="up">
        <div className="mb-12 flex flex-col items-center text-center">
          <p
            className="font-mono mb-3"
            style={{ fontSize: '10px', letterSpacing: '3px', color: '#00b4d8' }}
          >
            // GOT QUESTIONS?
          </p>
          <h1 className="font-display font-bold leading-none mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a2e' }}>
            <span>Event </span>
            <span style={{ color: accentColor, transition: 'color 0.3s ease' }}>FAQ</span>
          </h1>
          <div
            className="w-24 h-[2px] rounded-full"
            style={{ backgroundColor: accentColor, transition: 'background-color 0.3s ease' }}
          />
        </div>
      </RevealOnScroll>

      {/* Toggle Switch */}
      <RevealOnScroll direction="up">
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => handleToggle('gamefest')}
            className="font-mono px-6 py-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              border: isGamefest ? '1px solid rgba(255,0,127,0.4)' : '1px solid rgba(26,26,46,0.1)',
              backgroundColor: isGamefest ? 'rgba(255,0,127,0.06)' : 'transparent',
              color: isGamefest ? '#ff007f' : 'rgba(26,26,46,0.4)',
              fontSize: '11px',
              letterSpacing: '2px',
            }}
          >
            GAMEFEST
          </button>
          <button
            onClick={() => handleToggle('techfest')}
            className="font-mono px-6 py-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              border: !isGamefest ? '1px solid rgba(0,180,216,0.4)' : '1px solid rgba(26,26,46,0.1)',
              backgroundColor: !isGamefest ? 'rgba(0,180,216,0.06)' : 'transparent',
              color: !isGamefest ? '#00b4d8' : 'rgba(26,26,46,0.4)',
              fontSize: '11px',
              letterSpacing: '2px',
            }}
          >
            TECHFEST
          </button>
        </div>
      </RevealOnScroll>

      {/* FAQ Accordion */}
      <div className="w-full max-w-3xl space-y-0" style={{ minHeight: '400px' }}>
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
                  className="transition-colors duration-200"
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    borderTop: i === 0 ? `1px solid ${borderColor}` : 'none',
                    borderRadius: '0',
                    backgroundColor: isOpen ? (isGamefest ? 'rgba(255,0,127,0.02)' : 'rgba(0,180,216,0.02)') : 'transparent',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(i)}
                    className="w-full py-5 px-4 text-left flex justify-between items-center group focus:outline-none cursor-pointer transition-colors duration-150"
                  >
                    <span
                      className="font-display font-medium text-base md:text-lg tracking-wide transition-colors duration-200"
                      style={{ color: isOpen ? accentColor : '#1a1a2e' }}
                    >
                      {item.question}
                    </span>
                    <div className="w-6 h-6 flex flex-shrink-0 items-center justify-center ml-4">
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className="font-mono flex-shrink-0"
                        style={{ fontSize: '20px', lineHeight: 1, color: isOpen ? accentColor : 'rgba(26,26,46,0.3)' }}
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
                        <div className="px-4 pb-6 font-body text-base leading-relaxed text-left" style={{ color: 'rgba(26,26,46,0.6)' }}>
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
