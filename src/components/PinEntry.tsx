import { useState } from 'react'
import { motion } from 'framer-motion'

interface PinEntryProps {
  onSubmit: (pin: string) => void
  error?: string
}

export default function PinEntry({ onSubmit, error }: PinEntryProps) {
  const [pin, setPin] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pin.length >= 4) {
      onSubmit(pin)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#0a0a0f' }}>
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className="block font-mono uppercase mb-3"
          style={{ fontSize: '10px', letterSpacing: '4px', color: '#00dcc0' }}
        >
          // VERIFICATION STATION
        </span>
        <h1
          className="font-display font-bold tracking-wider mb-2"
          style={{ fontSize: '24px', color: '#e8e4d4' }}
        >
          ENTER PIN
        </h1>
        <p
          className="font-mono mb-8"
          style={{ fontSize: '11px', letterSpacing: '1px', color: 'rgba(232,228,212,0.4)' }}
        >
          Staff access only
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            autoFocus
            className="w-full px-4 py-4 text-center font-mono outline-none"
            style={{
              fontSize: '24px',
              letterSpacing: '12px',
              backgroundColor: 'rgba(15,15,26,0.8)',
              border: `1px solid ${error ? '#ff4444' : 'rgba(0,220,192,0.3)'}`,
              color: '#e8e4d4',
            }}
          />

          {error && (
            <p
              className="font-mono"
              style={{ fontSize: '11px', color: '#ff4444', letterSpacing: '0.5px' }}
            >
              {error}
            </p>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 font-mono uppercase cursor-pointer"
            style={{
              fontSize: '12px',
              letterSpacing: '3px',
              backgroundColor: '#00dcc0',
              color: '#0a0a0f',
              border: 'none',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            UNLOCK
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
