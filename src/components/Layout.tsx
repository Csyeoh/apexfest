import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const id = location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: -64, duration: 1.2 })
          } else {
            const yOffset = -64
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
            window.scrollTo({ top: y, behavior: 'smooth' })
          }
        }
      } else if (location.pathname === '/') {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2 })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true })
        } else {
          window.scrollTo(0, 0) // Normal page change
        }
      }
    }

    // Give AnimatePresence 300ms to render the incoming page and finish exit anim
    const timer = setTimeout(scrollToHash, 300)
    return () => clearTimeout(timer)
  }, [location.hash, location.pathname, lenis])

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
