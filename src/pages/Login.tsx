import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import PageWrapper from '../components/PageWrapper'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, displayName)
      } else {
        await signInWithEmail(email, password)
      }
      navigate('/stamps')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/stamps')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    backgroundColor: 'rgba(15,15,26,0.8)',
    border: '1px solid rgba(70,244,255,0.3)',
    color: '#d7fdff',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '13px',
    letterSpacing: '1px',
  }

  return (
    <PageWrapper>
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-20">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <p
              className="eyebrow font-mono uppercase mb-3"
              style={{ color: '#46f4ff', fontSize: '10px', letterSpacing: '4px' }}
            >
              // AUTHENTICATION
            </p>
            <h1
              className="font-display font-bold tracking-wider"
              style={{ fontSize: '28px', color: '#d7fdff' }}
            >
              {isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </h1>
            <hr className="hr-techfest mt-4 mx-auto" style={{ maxWidth: '120px' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div>
                <label
                  className="block font-mono uppercase mb-1.5"
                  style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(215,253,255,0.5)' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-none outline-none focus:border-techfest transition-colors"
                  style={inputStyle}
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <label
                className="block font-mono uppercase mb-1.5"
                style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(215,253,255,0.5)' }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-none outline-none focus:border-techfest transition-colors"
                style={inputStyle}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                className="block font-mono uppercase mb-1.5"
                style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(215,253,255,0.5)' }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-none outline-none focus:border-techfest transition-colors"
                style={inputStyle}
                placeholder="••••••••"
              />
            </div>

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
              disabled={loading}
              className="w-full py-3 font-mono uppercase cursor-pointer disabled:opacity-50"
              style={{
                fontSize: '12px',
                letterSpacing: '3px',
                backgroundColor: '#46f4ff',
                color: '#081120',
                border: 'none',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'PROCESSING...' : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px]" style={{ backgroundColor: 'rgba(70,244,255,0.15)' }} />
            <span
              className="font-mono uppercase"
              style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(215,253,255,0.3)' }}
            >
              OR
            </span>
            <div className="flex-1 h-[1px]" style={{ backgroundColor: 'rgba(70,244,255,0.15)' }} />
          </div>

          {/* Google Sign In */}
          <motion.button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full py-3 font-mono uppercase cursor-pointer disabled:opacity-50"
            style={{
              fontSize: '12px',
              letterSpacing: '3px',
              backgroundColor: 'transparent',
              color: '#d7fdff',
              border: '1px solid rgba(255,0,127,0.4)',
            }}
            whileHover={{ borderColor: '#ff007f', color: '#ff007f' }}
            whileTap={{ scale: 0.98 }}
          >
            SIGN IN WITH GOOGLE
          </motion.button>

          {/* Toggle */}
          <p
            className="text-center mt-6 font-mono"
            style={{ fontSize: '11px', color: 'rgba(215,253,255,0.5)' }}
          >
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
              className="cursor-pointer bg-transparent border-none font-mono uppercase"
              style={{ fontSize: '11px', color: '#46f4ff', letterSpacing: '1px' }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
