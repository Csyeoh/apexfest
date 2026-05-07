import { motion } from 'framer-motion'

interface RevealOnScrollProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
}: RevealOnScrollProps) {
  const axis = direction === 'up' ? 'y' : 'x'
  const offset =
    direction === 'up' ? 24 : direction === 'left' ? -24 : 24

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: offset }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
