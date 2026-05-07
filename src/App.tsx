import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Layout from './components/Layout'
import BackgroundEffects from './components/BackgroundEffects'
import Home from './pages/Home'

// Lazy-loaded heavy pages for code splitting
const GameFest = lazy(() => import('./pages/GameFest'))
const TechFest = lazy(() => import('./pages/TechFest'))

function LoadingFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <span
        className="font-mono animate-pulse"
        style={{
          fontSize: '12px',
          letterSpacing: '4px',
          color: '#00dcc0',
        }}
      >
        LOADING...
      </span>
    </div>
  )
}

function App() {
  return (
    <ReactLenis root>
      <BackgroundEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/gamefest"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <GameFest />
              </Suspense>
            }
          />
          <Route
            path="/techfest"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <TechFest />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ReactLenis>
  )
}

export default App
