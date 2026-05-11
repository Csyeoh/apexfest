import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import BackgroundEffects from './components/BackgroundEffects'
import Home from './pages/Home'

// Lazy-loaded pages for code splitting
const GameFest = lazy(() => import('./pages/GameFest'))
const TechFest = lazy(() => import('./pages/TechFest'))
const Login = lazy(() => import('./pages/Login'))
const Stamps = lazy(() => import('./pages/Stamps'))
const BoothDisplay = lazy(() => import('./pages/BoothDisplay'))
const Verify = lazy(() => import('./pages/Verify'))
const Settings = lazy(() => import('./pages/Settings'))

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
          color: '#00b4d8',
        }}
      >
        LOADING...
      </span>
    </div>
  )
}

function lazyLoad(Component: React.LazyExoticComponent<() => React.JSX.Element>) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  )
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.15, wheelMultiplier: 1.2, smoothWheel: true }}>
      <BackgroundEffects />
      <Routes>
        {/* Layout-wrapped routes (navbar + footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gamefest" element={lazyLoad(GameFest)} />
          <Route path="/techfest" element={lazyLoad(TechFest)} />
          <Route path="/login" element={lazyLoad(Login)} />
          <Route
            path="/stamps"
            element={
              <ProtectedRoute>
                {lazyLoad(Stamps)}
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                {lazyLoad(Settings)}
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Standalone routes (no layout — kiosk/fullscreen) */}
        <Route path="/verify" element={lazyLoad(Verify)} />
        <Route path="/booth/:boothId" element={lazyLoad(BoothDisplay)} />
      </Routes>
    </ReactLenis>
  )
}

export default App
