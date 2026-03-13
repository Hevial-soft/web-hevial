import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from './Logo'

const NAV_LINKS = [
  { href: '/account', label: 'Личный кабинет', anchor: null },
]

const ANCHOR_LINKS = [
  { label: 'О нас', anchor: 'about' },
  { label: 'Контакты', anchor: 'contacts' },
]

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToAnchor = (anchor: string) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      // Ждём пока страница загрузится, потом скроллим
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const linkClass = (active: boolean) => `
    font-garet text-xs font-semibold no-underline px-[22px] py-[9px]
    border-[1.5px] border-[#1400FF] tracking-[0.3px] inline-block cursor-pointer
    ${active
      ? 'bg-[#1400FF] text-white z-10 relative'
      : 'bg-white text-[#080808] hover:bg-[#1400FF] hover:text-white hover:z-10 hover:relative'
    }
  `

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/[0.07]">
      <div className="w-full flex items-center justify-between px-5 sm:px-8 md:px-14 py-4 md:py-[18px]">
        <Logo />

        {/* Desktop */}
        <ul className="hidden md:flex list-none gap-0">
          {ANCHOR_LINKS.map((link) => (
            <li key={link.anchor} className="-ml-px first:ml-0">
              <button
                onClick={() => scrollToAnchor(link.anchor)}
                style={{ transition: 'background-color 180ms ease, color 180ms ease' }}
                className={linkClass(false)}
              >
                {link.label}
              </button>
            </li>
          ))}
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="-ml-px">
              <Link
                to={link.href}
                style={{ transition: 'background-color 180ms ease, color 180ms ease' }}
                className={linkClass(location.pathname === link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer bg-transparent border-none p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Меню"
        >
          <span className="block h-[2px] bg-[#1400FF] transition-all duration-200"
            style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span className="block h-[2px] bg-[#1400FF] transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block h-[2px] bg-[#1400FF] transition-all duration-200"
            style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-black/[0.07]"
        style={{ maxHeight: menuOpen ? '300px' : '0' }}
      >
        {ANCHOR_LINKS.map((link) => (
          <button
            key={link.anchor}
            onClick={() => scrollToAnchor(link.anchor)}
            className="w-full text-left font-garet text-sm font-semibold px-5 py-4 border-b border-black/[0.05] tracking-[0.3px] transition-colors duration-150 text-[#080808] hover:bg-[#F4F5F9] bg-transparent border-x-0 border-t-0 cursor-pointer"
          >
            {link.label}
          </button>
        ))}
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={() => setMenuOpen(false)}
            className={`block font-garet text-sm font-semibold no-underline px-5 py-4 border-b border-black/[0.05] last:border-b-0 tracking-[0.3px] transition-colors duration-150
              ${location.pathname === link.href ? 'bg-[#1400FF] text-white' : 'text-[#080808] hover:bg-[#F4F5F9]'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}