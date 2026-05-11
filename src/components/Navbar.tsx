import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

interface NavItem {
  to: string
  label: string
}

const navLinks: NavItem[] = [
  { to: '/#about', label: 'About' },
  { to: '/#events', label: 'Events' },
  { to: '/#speakers', label: 'Speakers' },
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
      isActive = currentHash === targetHash
    }
  } else {
    isActive = location.pathname.startsWith(link.to)
  }

  return (
    <li>
      <Link
        to={link.to}
        className={`relative inline-block font-ui font-medium transition-colors duration-200 ${
          isActive
            ? 'text-text-base'
            : 'text-text-muted hover:text-text-base'
        }`}
        style={{
          fontSize: '14px',
          letterSpacing: '0.5px',
        }}
        aria-label={`Navigate to ${link.label}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {link.label}
        <motion.span
          className="absolute bottom-[-4px] left-0 w-full h-[2px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, #ff007f, #be6bff)',
            transformOrigin: 'left',
          }}
          initial={false}
          animate={{ scaleX: isActive || hovered ? 1 : 0 }}
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
        className="font-ui font-semibold cursor-pointer transition-all duration-200 rounded-full"
        style={{
          fontSize: '13px',
          letterSpacing: '0.5px',
          background: 'linear-gradient(135deg, #be6bff, #ff007f)',
          color: '#ffffff',
          padding: '8px 20px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(190,107,255,0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(190,107,255,0.4)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(190,107,255,0.3)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Register
      </button>
    )
  }

  const initials = (user.displayName || user.email || 'U')
    .split(/[\s@]/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('')

  const menuItems = [
    { label: 'Stamps', path: '/stamps' },
    { label: 'Settings', path: '/settings' },
  ]

  return (
    <div ref={dropdownRef} className="relative">
      {/* Profile button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center cursor-pointer"
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: `1px solid ${open ? '#00b4d8' : 'rgba(26,26,46,0.15)'}`,
          backgroundColor: open ? 'rgba(0,180,216,0.08)' : 'transparent',
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
            className="font-display font-bold"
            style={{
              fontSize: '12px',
              color: '#1a1a2e',
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
              backgroundColor: '#ffffff',
              border: '1px solid rgba(26,26,46,0.08)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {/* User info */}
            <div
              className="px-4 py-3"
              style={{ borderBottom: '1px solid rgba(26,26,46,0.06)' }}
            >
              <p
                className="font-body truncate"
                style={{ fontSize: '13px', color: '#1a1a2e' }}
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
                className="w-full text-left px-4 py-3 font-ui font-medium cursor-pointer transition-colors duration-150 block"
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'rgba(26,26,46,0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1a1a2e'
                  e.currentTarget.style.backgroundColor = 'rgba(0,180,216,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(26,26,46,0.6)'
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
              className="w-full text-left px-4 py-3 font-ui font-medium cursor-pointer transition-colors duration-150 block"
              style={{
                fontSize: '13px',
                letterSpacing: '0.5px',
                backgroundColor: 'transparent',
                border: 'none',
                borderTop: '1px solid rgba(26,26,46,0.06)',
                color: 'rgba(255,0,127,0.6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ff007f'
                e.currentTarget.style.backgroundColor = 'rgba(255,0,127,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,0,127,0.6)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Logout
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
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(26,26,46,0.06)',
        height: '72px',
        boxShadow: '0 1px 12px rgba(0,0,0,0.04)',
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/#home"
          className="font-display font-bold select-none"
          style={{ fontSize: '17px', letterSpacing: '0.02em' }}
          aria-label="ApexFest home"
          onClick={closeMenu}
        >
          <span style={{ color: '#00b4d8' }}>GDGoC</span>{' '}
          <span style={{ color: '#ff007f' }}>USM</span>{' '}
          <span style={{ color: '#1a1a2e' }}>// APEX</span>
          <span style={{ color: '#ff007f' }}>FEST</span>
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
              className="block w-5 h-[2px] rounded-full transition-all duration-200"
              style={{
                backgroundColor: '#1a1a2e',
                transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-[2px] rounded-full transition-all duration-200"
              style={{
                backgroundColor: '#1a1a2e',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[2px] rounded-full transition-all duration-200"
              style={{
                backgroundColor: '#1a1a2e',
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
              borderTop: '1px solid rgba(26,26,46,0.06)',
              backgroundColor: 'rgba(255,255,255,0.98)',
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
                    isActive = currentHash === targetHash
                  }
                } else {
                  isActive = location.pathname.startsWith(link.to)
                }

                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={closeMenu}
                      className="block py-3 font-ui font-medium transition-colors duration-150"
                      style={{
                        fontSize: '15px',
                        letterSpacing: '0.5px',
                        color: isActive ? '#1a1a2e' : 'rgba(26,26,46,0.5)',
                        borderBottom: '1px solid rgba(26,26,46,0.04)',
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
