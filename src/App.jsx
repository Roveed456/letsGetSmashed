import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ItemDetailPage from './pages/ItemDetailPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'

const MIN_LOADER_TIME = 2200 // ms
const MAX_LOADER_TIME = 5000 // ms

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// resolves when the page and its images are loaded
function pageIsLoaded() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', resolve, { once: true })
  })
}

// on page change, scroll to the #section or to the top
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  const { pathname } = useLocation()
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // ready once loaded (with a min and max time)
  useEffect(() => {
    Promise.race([Promise.all([wait(MIN_LOADER_TIME), pageIsLoaded()]), wait(MAX_LOADER_TIME)]).then(() =>
      setIsReady(true),
    )
  }, [])

  // called when the loader starts leaving
  const handleExitStart = useCallback(() => setIsLoading(false), [])

  // no scrolling while the loader shows
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    // is-loading pauses the hero animations until the loader is gone
    <div className={`overflow-x-clip ${isLoading ? 'is-loading' : ''}`}>
      <Loader isReady={isReady} onExitStart={handleExitStart} />
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu/:itemId" element={<ItemDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ItemDetailPage />} />
      </Routes>
      {/* cart and about end with a cream section, the rest with white */}
      <Footer edgeColor={pathname === '/cart' || pathname === '/about' ? '#ebd5a0' : '#ffffff'} />
    </div>
  )
}
