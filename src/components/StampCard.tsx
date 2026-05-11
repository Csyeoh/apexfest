import { motion } from 'framer-motion'
import type { Booth } from '../lib/booths'

interface StampCardProps {
  booth: Booth
  isStamped: boolean
  index: number
}

export default function StampCard({ booth, isStamped, index }: StampCardProps) {
  const accent = booth.event === 'techfest' ? '#00b4d8' : '#ff007f'
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      style={{ width: '88px', height: '88px' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      {isStamped ? (
        /* ── STAMPED: circular tech-styled mark ── */
        <motion.div
          className="relative flex items-center justify-center"
          style={{ width: '80px', height: '80px', filter: `drop-shadow(0 0 6px ${accent}44)` }}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: index * 0.08 + 0.1 }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            style={{ transform: 'rotate(-8deg)' }}
          >
            {/* Outer ring */}
            <circle cx="40" cy="40" r="36" stroke={accent} strokeWidth="2.5" />
            {/* Inner dashed ring */}
            <circle cx="40" cy="40" r="30" stroke={accent} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
            {/* Circuit dots at N/S/E/W */}
            <circle cx="40" cy="4" r="2.5" fill={accent} />
            <circle cx="40" cy="76" r="2.5" fill={accent} />
            <circle cx="4" cy="40" r="2.5" fill={accent} />
            <circle cx="76" cy="40" r="2.5" fill={accent} />
            {/* Small connector lines from dots to outer ring */}
            <line x1="40" y1="6.5" x2="40" y2="10" stroke={accent} strokeWidth="1" opacity="0.4" />
            <line x1="40" y1="70" x2="40" y2="73.5" stroke={accent} strokeWidth="1" opacity="0.4" />
            <line x1="6.5" y1="40" x2="10" y2="40" stroke={accent} strokeWidth="1" opacity="0.4" />
            <line x1="70" y1="40" x2="73.5" y2="40" stroke={accent} strokeWidth="1" opacity="0.4" />
            {/* Booth code */}
            <text
              x="40"
              y="38"
              textAnchor="middle"
              dominantBaseline="central"
              fill={accent}
              fontSize="16"
              fontFamily="'Share Tech Mono', monospace"
              fontWeight="bold"
              letterSpacing="2"
            >
              {booth.code}
            </text>
            {/* Small dot separator */}
            <circle cx="40" cy="48" r="1" fill={accent} opacity="0.5" />
            {/* Booth name (truncated) */}
            <text
              x="40"
              y="56"
              textAnchor="middle"
              dominantBaseline="central"
              fill={accent}
              fontSize="6"
              fontFamily="'Share Tech Mono', monospace"
              letterSpacing="0.5"
              opacity="0.7"
            >
              {booth.name.length > 12 ? booth.name.slice(0, 12) + '...' : booth.name}
            </text>
          </svg>
        </motion.div>
      ) : (
        /* ── UNSTAMPED: empty dashed box ── */
        <div
          className="flex flex-col items-center justify-center w-full h-full"
          style={{
            border: '2px dashed rgba(26,26,46,0.12)',
            backgroundColor: 'rgba(248,249,250,0.6)',
          }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(26,26,46,0.2)' }}
          >
            {booth.code}
          </span>
          <div
            className="w-5 h-5 mt-1 rounded-full"
            style={{ border: '1.5px dashed rgba(26,26,46,0.1)' }}
          />
        </div>
      )}
    </motion.div>
  )
}
