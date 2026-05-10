import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

interface NavItem {
  to: string
  label: string
}

const navLinks: NavItem[] = [
  { to: '/#home', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/gamefest', label: 'GameFest' },
  { to: '/techfest', label: 'TechFest' },
  { to: '/#sponsors', label: 'Sponsors' },
  { to: '/#faq', label: 'FAQ' },
]

function NavLinkItem({ link }: { link: NavItem }) {
  const [hovered, setHovered] = useState(false)
  const location = useLocation()

  const isHashLink = link.to.includes('#')
  const targetHash = isHashLink ? link.to.split('#')[1] : ''
  const currentHash = location.hash.replace('#', '')

  let isActive = false
  if (isHashLink) {
    if (location.pathname === '/') {
      isActive = currentHash === targetHash || (targetHash === 'home' && currentHash === '')
    }
  } else {
    isActive = location.pathname.startsWith(link.to)
  }

  return (
    <li>
      <Link
        to={link.to}
        className={`relative inline-block font-mono uppercase transition-colors duration-200 ${
          isActive
            ? 'text-techfest'
            : 'text-text-muted hover:text-text-base'
        }`}
        style={{
          fontSize: '10px',
          letterSpacing: '3px',
        }}
        aria-label={`Navigate to ${link.label}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {link.label}
        <motion.span
          className="absolute bottom-[-4px] left-0 w-full h-[1px]"
          style={{
            backgroundColor: '#00dcc0',
            transformOrigin: 'left',
          }}
          initial={false}
          animate={{ scaleX: isActive ? 1 : hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          aria-hidden="true"
        />
      </Link>
    </li>
  )
}

function ProfileDropdown({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function handleNavigate(path: string) {
    navigate(path)
    setOpen(false)
    onClose?.()
  }

  async function handleLogout() {
    await signOut()
    navigate('/')
    setOpen(false)
    onClose?.()
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => {
          navigate('/login')
          onClose?.()
        }}
        className="font-mono uppercase cursor-pointer transition-colors duration-200"
        style={{
          fontSize: '10px',
          letterSpacing: '3px',
          backgroundColor: 'transparent',
          border: '1px solid rgba(255,184,48,0.4)',
          color: '#ffb830',
          padding: '4px 12px',
        }}
      >
        LOGIN
      </button>
    )
  }

  const initials = (user.displayName || user.email || 'U')
    .split(/[\s@]/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('')

  const menuItems = [
    { label: 'STAMPS', path: '/stamps', icon: '◆' },
    { label: 'SETTINGS', path: '/settings', icon: '◇' },
  ]

  return (
    <div ref={dropdownRef} className="relative">
      {/* Profile button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center cursor-pointer"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: `1px solid ${open ? '#00dcc0' : 'rgba(0,220,192,0.3)'}`,
          backgroundColor: open ? 'rgba(0,220,192,0.1)' : 'transparent',
          transition: 'all 0.2s',
        }}
        aria-label="Profile menu"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span
            className="font-mono"
            style={{
              fontSize: '11px',
              letterSpacing: '0',
              color: '#00dcc0',
            }}
          >
            {initials}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 z-50"
            style={{
              width: '200px',
              backgroundColor: 'rgba(15,15,26,0.97)',
              border: '1px solid rgba(0,220,192,0.2)',
              backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {/* User info */}
            <div
              className="px-4 py-3"
              style={{ borderBottom: '1px solid rgba(0,220,192,0.1)' }}
            >
              <p
                className="font-mono truncate"
                style={{ fontSize: '11px', color: '#e8e4d4', letterSpacing: '0.5px' }}
              >
                {user.displayName || user.email}
              </p>
            </div>

            {/* Menu items */}
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.path)}
                className="w-full text-left px-4 py-3 font-mono uppercase cursor-pointer transition-colors duration-150 block"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,220,192,0.06)',
                  color: 'rgba(232,228,212,0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00dcc0'
                  e.currentTarget.style.backgroundColor = 'rgba(0,220,192,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(232,228,212,0.6)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 font-mono uppercase cursor-pointer transition-colors duration-150 block"
              style={{
                fontSize: '10px',
                letterSpacing: '2px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'rgba(255,68,68,0.6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ff4444'
                e.currentTarget.style.backgroundColor = 'rgba(255,68,68,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,68,68,0.6)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              LOGOUT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'rgba(10,10,15,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,220,192,0.2)',
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/#home"
          className="font-display font-bold text-lg tracking-wider select-none"
          aria-label="ApexFest home"
          onClick={closeMenu}
        >
          <span style={{ color: '#00dcc0' }}>GDGoC</span>{' '}
          <span style={{ color: '#ffb830' }}>USM</span>{' '}
          <span style={{ color: '#00dcc0' }}>// APEX</span>
          <span style={{ color: '#ffb830' }}>FEST</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLinkItem key={link.to} link={link} />
            ))}
          </ul>
          <ProfileDropdown />
        </div>

        {/* Hamburger — mobile only */}
        <div className="md:hidden flex items-center gap-3">
          <ProfileDropdown onClose={closeMenu} />
          <button
            type="button"
            className="flex flex-col justify-center items-center gap-[5px] cursor-pointer w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-[1.5px] transition-all duration-200"
              style={{
                backgroundColor: '#00dcc0',
                transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-[1.5px] transition-all duration-200"
              style={{
                backgroundColor: '#00dcc0',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[1.5px] transition-all duration-200"
              style={{
                backgroundColor: '#00dcc0',
                transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            style={{
              borderTop: '1px solid rgba(0,220,192,0.1)',
              backgroundColor: 'rgba(10,10,15,0.97)',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => {
                const isHashLink = link.to.includes('#')
                const targetHash = isHashLink ? link.to.split('#')[1] : ''
                const currentHash = location.hash.replace('#', '')

                let isActive = false
                if (isHashLink) {
                  if (location.pathname === '/') {
                    isActive = currentHash === targetHash || (targetHash === 'home' && currentHash === '')
                  }
                } else {
                  isActive = location.pathname.startsWith(link.to)
                }

                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={closeMenu}
                      className="block py-3 font-mono uppercase transition-colors duration-150"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '3px',
                        color: isActive ? '#00dcc0' : 'rgba(232,228,212,0.5)',
                        borderBottom: '1px solid rgba(0,220,192,0.06)',
                      }}
                      aria-label={`Navigate to ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
