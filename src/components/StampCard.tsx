import { motion } from 'framer-motion'
import type { Booth } from '../lib/booths'

interface StampCardProps {
  booth: Booth
  isStamped: boolean
  index: number
}

export default function StampCard({ booth, isStamped, index }: StampCardProps) {
  const accent = booth.event === 'techfest' ? '#00dcc0' : '#ffb830'

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center p-4 aspect-square"
      style={{
        backgroundColor: isStamped ? 'rgba(15,15,26,0.95)' : 'rgba(15,15,26,0.5)',
        border: isStamped ? `2px solid ${accent}` : '2px dashed rgba(232,228,212,0.15)',
        boxShadow: isStamped ? `0 0 20px ${accent}22, inset 0 0 30px ${accent}08` : 'none',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Booth code */}
      <span
        className="font-mono uppercase"
        style={{ fontSize: '10px', letterSpacing: '3px', color: accent }}
      >
        {booth.code}
      </span>

      {/* Booth name */}
      <span
        className="font-display text-center mt-1 font-semibold uppercase"
        style={{ fontSize: '13px', letterSpacing: '1px', color: isStamped ? '#e8e4d4' : 'rgba(232,228,212,0.3)' }}
      >
        {booth.name}
      </span>

      {/* Stamp indicator */}
      <div className="mt-3">
        {isStamped ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="2" />
              <path
                d="M8 12l2.5 2.5L16 9"
                stroke={accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="rgba(232,228,212,0.15)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        )}
      </div>
    </motion.div>
  )
}
