import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
}

const navLinks: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gamefest', label: 'GameFest' },
  { to: '/techfest', label: 'TechFest' },
  { to: '/sponsors', label: 'Sponsors' },
]

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
        <NavLink
          to="/"
          className="font-display font-bold text-lg tracking-wider select-none"
          aria-label="ApexFest home"
          onClick={closeMenu}
        >
          <span style={{ color: '#00dcc0' }}>GDGoC</span>{' '}
          <span style={{ color: '#ffb830' }}>USM</span>{' '}
          <span style={{ color: '#00dcc0' }}>// APEX</span>
          <span style={{ color: '#ffb830' }}>FEST</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `nav-link-hover font-mono uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-techfest'
                      : 'text-text-muted hover:text-text-base'
                  }`
                }
                style={{
                  fontSize: '10px',
                  letterSpacing: '3px',
                }}
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </NavLink>
            </li>
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

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: '1px solid rgba(0,220,192,0.1)',
            backgroundColor: 'rgba(10,10,15,0.97)',
          }}
        >
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => {
              const isActive = link.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.to)
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
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
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}
