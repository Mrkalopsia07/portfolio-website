import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFound from './components/NotFound.jsx'
import Resume from './pages/Resume.jsx'
import About from './pages/About.jsx'

import { useState } from 'react'
import PasswordGate from './components/PasswordGate.jsx'

import WilderWorld from './pages/WilderWorld.jsx'

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        {/* Hidden URL for Wilder World - use /hidden/wilder-world to access */}
        <Route path="/hidden/wilder-world" element={<WilderWorld />} />
        {/* Public URL shows 404 */}
        <Route path="/wilder-world" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
