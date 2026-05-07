import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import StatusBar from './StatusBar'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div key={location.pathname} className="page-fade-enter">
          <Outlet />
        </div>
      </main>
      <StatusBar />
      <Footer />
    </div>
  )
}
