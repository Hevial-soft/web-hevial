import { useState, useRef, useEffect } from 'react'
import { Container } from './Container'
import portfolio01 from '../assets/portfolio_01.jpg'
import portfolio02 from '../assets/portfolio_02.jpg'

interface Slide {
  img: string
  tag: string
  name: string
  sub: string
}

const SLIDES: Slide[] = [
  {
    img: portfolio01,
    tag: 'Промышленный · PA-CF',
    name: 'Реактор высокого давления АН-02',
    sub: 'Детали корпуса и фланцы · цветная многоматериальная печать',
  },
  {
    img: portfolio02,
    tag: 'Декор · PLA',
    name: 'Скульптура «Пламя»',
    sub: 'Художественная печать · постобработка и покраска',
  },
    {
    img: portfolio01,
    tag: 'Промышленный · PA-CF',
    name: 'Реактор высокого давления АН-02',
    sub: 'Детали корпуса и фланцы · цветная многоматериальная печать',
  },
  {
    img: portfolio02,
    tag: 'Декор · PLA',
    name: 'Скульптура «Пламя»',
    sub: 'Художественная печать · постобработка и покраска',
  },
    {
    img: portfolio01,
    tag: 'Промышленный · PA-CF',
    name: 'Реактор высокого давления АН-02',
    sub: 'Детали корпуса и фланцы · цветная многоматериальная печать',
  },
  {
    img: portfolio02,
    tag: 'Декор · PLA',
    name: 'Скульптура «Пламя»',
    sub: 'Художественная печать · постобработка и покраска',
  },
]

const MOBILE_W = 80
const DESKTOP_W = 35
const GAP = 16

export function PortfolioSlider() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const cardW = isMobile ? MOBILE_W : DESKTOP_W
  const visibleCount = isMobile ? 1 : 2
  const maxIndex = Math.max(0, SLIDES.length - visibleCount)

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1))

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <section className="py-14 md:py-20 bg-white border-t border-black/[0.06]">
      <Container className="mb-8 flex items-end justify-between">
        <h2 className="font-garet text-lg md:text-[26px] font-extrabold text-[#080808] tracking-tight">
          Наши работы
        </h2>
        <div className="flex gap-2">
          <button onClick={prev} aria-label="Назад" disabled={current === 0}
            className="w-10 h-10 border-[1.5px] border-[#1400FF] flex items-center justify-center text-[#1400FF] transition-all duration-150 hover:bg-[#1400FF] hover:text-white disabled:opacity-30 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-[#1400FF]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polyline points="10,3 5,8 10,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={next} aria-label="Вперёд" disabled={current >= maxIndex}
            className="w-10 h-10 border-[1.5px] border-[#1400FF] flex items-center justify-center text-[#1400FF] transition-all duration-150 hover:bg-[#1400FF] hover:text-white disabled:opacity-30 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-[#1400FF]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polyline points="6,3 11,8 6,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Container>

      <Container
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(calc(-${current} * (${cardW}% + ${GAP}px)))`,
          }}
        >
          {SLIDES.map((slide, i) => (
            <div key={i} className="flex-shrink-0" style={{ width: `${cardW}%` }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <img src={slide.img} alt={slide.name} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 50%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <div className="inline-block font-garet text-[8px] font-bold tracking-[2px] uppercase bg-[#1400FF] text-white px-2.5 py-[4px] mb-3">
                    {slide.tag}
                  </div>
                  <div className="font-garet text-base md:text-xl font-extrabold text-white leading-tight tracking-tight mb-2">
                    {slide.name}
                  </div>
                  <div className="text-xs md:text-sm text-white/65 leading-relaxed">
                    {slide.sub}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-5 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(Math.min(idx, maxIndex))}
              style={{
                width: idx === current ? '24px' : '8px',
                height: '3px',
                background: idx === current ? '#1400FF' : 'rgba(20,0,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>
        <div className="font-garet text-xs font-bold text-[#666] tracking-[2px]">
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </div>
      </Container>
    </section>
  )
}