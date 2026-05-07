import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import GameFest from './pages/GameFest'
import TechFest from './pages/TechFest'
import Sponsors from './pages/Sponsors'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gamefest" element={<GameFest />} />
        <Route path="/techfest" element={<TechFest />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Route>
    </Routes>
  )
}

export default App
