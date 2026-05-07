import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import StatusBar from './StatusBar'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <StatusBar />
      <Footer />
    </div>
  )
}
