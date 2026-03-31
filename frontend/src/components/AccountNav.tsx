import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { Container } from './Container'

export function AccountNav() {
  return (
    <nav className="bg-white border-b border-black/[0.07] sticky top-0 z-50">
      <Container className="flex items-center justify-between py-4">
        <Logo size="sm" />
        <Link
          to="/"
          className="font-garet text-xs font-semibold text-[#666] no-underline flex items-center gap-2 transition-colors duration-[180ms] tracking-[0.3px] hover:text-[#1400FF]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polyline points="10,3 5,8 10,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">На главную</span>
        </Link>
      </Container>
    </nav>
  )
}