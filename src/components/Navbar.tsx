import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLinkItem key={link.to} link={link} />
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center gap-[5px] cursor-pointer w-8 h-8"
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

      {/* Mobile menu dropdown — animated with Framer Motion */}
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
