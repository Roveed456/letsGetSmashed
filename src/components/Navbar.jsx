import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useCart } from '../context/useCart'

// top bar, the links hide behind a hamburger on small screens
const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/#menu' },
  { label: 'About', to: '/about' },
  // { label: 'Blog', to: '/' },
  // { label: 'Shop', to: '/' },
  // { label: 'Gallery', to: '/' },
  { label: 'Special Deal', to: '/#special-deal' },
  //{ label: 'Contact Us', to: '/contact' },
]

function CartIcon() {
  return (
    <svg className="h-5 w-5 lg:h-[26px] lg:w-[26px]" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h18l-2 10H5L3 9Z" />
      <path d="M8 9l3-5M16 9l-3-5" />
      <path d="M10 13v3M14 13v3" />
    </svg>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const { count } = useCart()
  const activeLabel =
    pathname === '/' ? 'Home' : pathname.startsWith('/menu/') ? 'Menu' : pathname === '/contact' ? 'Contact Us' : pathname === '/about' ? 'About' : ''

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="animate-slide-down sticky top-0 z-50 bg-maroon shadow-md">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center gap-4 px-4 lg:h-[84px] lg:px-16">
        <Link to="/" aria-label="Home">
          <Logo className="-ml-2 h-[48px] w-[82px] lg:ml-0 lg:h-[60px] lg:w-[103px]" />
        </Link>
        <div className="hidden h-[27px] w-px bg-white/60 xl:block" />

        {/* desktop links */}
        <nav className="ml-2 hidden items-center gap-5 xl:ml-4 xl:flex xl:gap-9">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`whitespace-nowrap font-rowdies text-[14px] leading-6 tracking-[-0.3px] transition-colors hover:text-brand-orange ${
                link.label === activeLabel ? 'text-brand-orange underline underline-offset-4' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* right side buttons */}
        <div className="ml-auto flex items-center gap-3 lg:gap-[19px]">
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange transition hover:scale-105 active:scale-95 lg:h-12 lg:w-12"
            aria-label={`Cart, ${count} items`}
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-maroon px-1 font-rowdies text-[11px] leading-none text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/contact"
            className="hidden h-10 w-[140px] items-center justify-center gap-[10px] rounded-lg bg-white font-rowdies text-[14px] text-ink sm:flex lg:h-12 lg:w-[150px]"
          >
            Contact Us
            <img src="/images/arrow.svg" alt="" className="h-6 w-6" />
          </Link>

          {/* hamburger (only below xl) */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-lg border border-white/40 xl:hidden"
            aria-label="Open menu"
          >
            <span className="h-[2px] w-5 bg-white" />
            <span className="h-[2px] w-5 bg-white" />
            <span className="h-[2px] w-5 bg-white" />
          </button>
        </div>
      </div>

      {/* full screen mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-maroon xl:hidden">
          {/* top row: logo + close button */}
          <div className="flex h-[64px] shrink-0 items-center justify-between px-4">
            <Logo className="-ml-2 h-[48px] w-[82px] lg:ml-0 lg:h-[60px] lg:w-[103px]" />
            <button
              onClick={() => setIsOpen(false)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/40"
              aria-label="Close menu"
            >
              <span className="absolute h-[2px] w-6 rotate-45 bg-white" />
              <span className="absolute h-[2px] w-6 -rotate-45 bg-white" />
            </button>
          </div>

          {/* big links */}
          <nav className="flex flex-1 flex-col justify-center px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`border-b border-white/15 py-3 font-rowdies text-[20px] leading-none ${
                  link.label === activeLabel ? 'text-brand-orange' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* bottom button */}
          <div className="shrink-0 px-6 pb-6">
            <Link
              to="/#menu"
              onClick={() => setIsOpen(false)}
              className="flex h-12 items-center justify-center gap-[10px] rounded-lg bg-brand-orange font-rowdies text-[14px] text-ink"
            >
              Explore Menu
              <img src="/images/arrow.svg" alt="" className="h-6 w-6" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
