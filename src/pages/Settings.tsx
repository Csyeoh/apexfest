import { useState } from 'react'
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../lib/firebase'
import PageWrapper from '../components/PageWrapper'
import { motion } from 'framer-motion'

export default function Settings() {
  const { user } = useAuth()

  const [displayName, setDisplayName] = useState(user?.displayName ?? '')
  const [nameStatus, setNameStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [nameError, setNameError] = useState('')

  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwStatus, setPwStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [pwError, setPwError] = useState('')

  const isGoogleUser = user?.providerData.some((p) => p.providerId === 'google.com') ?? false

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !displayName.trim()) return

    setNameStatus('saving')
    setNameError('')
    try {
      await updateProfile(user, { displayName: displayName.trim() })
      await updateDoc(doc(db, 'users', user.uid), { displayName: displayName.trim() })
      setNameStatus('saved')
      setTimeout(() => setNameStatus('idle'), 2000)
    } catch (err: unknown) {
      setNameError(err instanceof Error ? err.message : 'Failed to update name')
      setNameStatus('error')
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !user.email) return

    if (newPw.length < 6) {
      setPwError('Password must be at least 6 characters')
      setPwStatus('error')
      return
    }
    if (newPw !== confirmPw) {
      setPwError('Passwords do not match')
      setPwStatus('error')
      return
    }

    setPwStatus('saving')
    setPwError('')
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPw)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPw)
      setPwStatus('saved')
      setCurrentPw('')
      setNewPw('')
      setConfirmPw('')
      setTimeout(() => setPwStatus('idle'), 2000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update password'
      setPwError(message.includes('wrong-password') || message.includes('invalid-credential') ? 'Current password is incorrect' : message)
      setPwStatus('error')
    }
  }

  const inputStyle = {
    backgroundColor: 'rgba(248,249,250,0.8)',
    border: '1px solid rgba(0,180,216,0.3)',
    color: '#1a1a2e',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '13px',
    letterSpacing: '1px',
  }

  const labelStyle = {
    fontSize: '10px',
    letterSpacing: '2px',
    color: 'rgba(26,26,46,0.5)',
  }

  return (
    <PageWrapper>
      <section className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <p
            className="eyebrow font-mono uppercase mb-3"
            style={{ fontSize: '10px', letterSpacing: '4px', color: '#00b4d8' }}
          >
            // SETTINGS
          </p>
          <h1
            className="font-display font-bold tracking-wider"
            style={{ fontSize: '28px', color: '#1a1a2e' }}
          >
            ACCOUNT
          </h1>
          <hr className="hr-techfest mt-4" style={{ maxWidth: '120px' }} />
        </div>

        {/* Profile Section */}
        <motion.div
          className="mb-10 p-6"
          style={{ backgroundColor: 'rgba(248,249,250,0.6)', border: '1px solid rgba(0,180,216,0.15)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2
            className="font-mono uppercase mb-6"
            style={{ fontSize: '11px', letterSpacing: '3px', color: '#00b4d8' }}
          >
            PROFILE
          </h2>

          <form onSubmit={handleSaveName} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono uppercase mb-1.5" style={labelStyle}>
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-none outline-none focus:border-techfest transition-colors"
                style={inputStyle}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-mono uppercase mb-1.5" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                value={user?.email ?? ''}
                disabled
                className="w-full px-4 py-3 rounded-none outline-none"
                style={{
                  ...inputStyle,
                  opacity: 0.5,
                  cursor: 'not-allowed',
                }}
              />
              <p
                className="font-mono mt-1"
                style={{ fontSize: '9px', letterSpacing: '1px', color: 'rgba(26,26,46,0.3)' }}
              >
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block font-mono uppercase mb-1.5" style={labelStyle}>
                Sign-in Method
              </label>
              <div
                className="px-4 py-3 font-mono uppercase"
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: isGoogleUser ? '#ff007f' : '#00b4d8',
                  border: `1px solid ${isGoogleUser ? 'rgba(255,0,127,0.3)' : 'rgba(0,180,216,0.3)'}`,
                  backgroundColor: 'rgba(248,249,250,0.8)',
                }}
              >
                {isGoogleUser ? 'Google' : 'Email / Password'}
              </div>
            </div>

            {nameError && (
              <p className="font-mono" style={{ fontSize: '11px', color: '#ff4444', letterSpacing: '0.5px' }}>
                {nameError}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={nameStatus === 'saving'}
              className="self-start px-6 py-2.5 font-mono uppercase cursor-pointer disabled:opacity-50"
              style={{
                fontSize: '11px',
                letterSpacing: '3px',
                backgroundColor: nameStatus === 'saved' ? 'rgba(0,180,216,0.2)' : 'rgba(0,180,216,0.1)',
                color: '#00b4d8',
                border: '1px solid rgba(0,180,216,0.3)',
              }}
              whileHover={{ backgroundColor: 'rgba(0,180,216,0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              {nameStatus === 'saving' ? 'SAVING...' : nameStatus === 'saved' ? 'SAVED' : 'SAVE NAME'}
            </motion.button>
          </form>
        </motion.div>

        {/* Password Section — only for email/password users */}
        {!isGoogleUser && (
          <motion.div
            className="mb-10 p-6"
            style={{ backgroundColor: 'rgba(248,249,250,0.6)', border: '1px solid rgba(255,0,127,0.15)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2
              className="font-mono uppercase mb-6"
              style={{ fontSize: '11px', letterSpacing: '3px', color: '#ff007f' }}
            >
              CHANGE PASSWORD
            </h2>

            <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
              <div>
                <label className="block font-mono uppercase mb-1.5" style={labelStyle}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-none outline-none focus:border-gamefest transition-colors"
                  style={inputStyle}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block font-mono uppercase mb-1.5" style={labelStyle}>
                  New Password
                </label>
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-none outline-none focus:border-gamefest transition-colors"
                  style={inputStyle}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block font-mono uppercase mb-1.5" style={labelStyle}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-none outline-none focus:border-gamefest transition-colors"
                  style={inputStyle}
                  placeholder="••••••••"
                />
              </div>

              {pwError && (
                <p className="font-mono" style={{ fontSize: '11px', color: '#ff4444', letterSpacing: '0.5px' }}>
                  {pwError}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={pwStatus === 'saving'}
                className="self-start px-6 py-2.5 font-mono uppercase cursor-pointer disabled:opacity-50"
                style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  backgroundColor: pwStatus === 'saved' ? 'rgba(255,0,127,0.2)' : 'rgba(255,0,127,0.1)',
                  color: '#ff007f',
                  border: '1px solid rgba(255,0,127,0.3)',
                }}
                whileHover={{ backgroundColor: 'rgba(255,0,127,0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                {pwStatus === 'saving' ? 'UPDATING...' : pwStatus === 'saved' ? 'UPDATED' : 'UPDATE PASSWORD'}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Account Info */}
        <motion.div
          className="p-6"
          style={{ backgroundColor: 'rgba(248,249,250,0.6)', border: '1px solid rgba(26,26,46,0.08)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2
            className="font-mono uppercase mb-4"
            style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(26,26,46,0.4)' }}
          >
            ACCOUNT INFO
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(26,26,46,0.06)' }}>
              <span className="font-mono uppercase" style={{ ...labelStyle }}>User ID</span>
              <span className="font-mono truncate ml-4" style={{ fontSize: '11px', color: 'rgba(26,26,46,0.3)', maxWidth: '200px' }}>
                {user?.uid}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-mono uppercase" style={{ ...labelStyle }}>Account Created</span>
              <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(26,26,46,0.3)' }}>
                {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
