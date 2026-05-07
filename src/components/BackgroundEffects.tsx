import { memo, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  color: string
  opacity: number
  duration: number
  driftX: number
  driftY: number
}

function generateParticles(): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < 12; i++) {
    const isAmber = i % 2 === 0
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: isAmber ? '#ffb830' : '#00dcc0',
      opacity: isAmber ? 0.12 : 0.10,
      duration: 20 + Math.random() * 20,
      driftX: (Math.random() - 0.5) * 60,
      driftY: (Math.random() - 0.5) * 100,
    })
  }
  return particles
}

function BackgroundEffects() {
  const particles = useMemo(() => generateParticles(), [])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Disable particles on mobile for performance
  if (isMobile) return null

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 4,
            height: 4,
            backgroundColor: p.color,
            opacity: p.opacity,
            willChange: 'transform',
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default memo(BackgroundEffects)
