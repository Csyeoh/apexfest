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
  const colors = ['#46f4ff', '#ff007f', '#be6bff', '#44a5ff']
  const particles: Particle[] = []
  for (let i = 0; i < 14; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[i % colors.length],
      opacity: 0.08 + Math.random() * 0.06,
      duration: 20 + Math.random() * 25,
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
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 3,
            height: 3,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 6px ${p.color}`,
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
