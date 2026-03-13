import { useEffect, useRef } from 'react'
import { Navbar } from '../components/Navbar'
import { MarqueeStrip } from '../components/MarqueeStrip'
import { PortfolioSlider } from '../components/PortfolioSlider'
import { Footer } from '../components/Footer'

const TelegramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
  </svg>
)

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: '3D-печать',
    desc: 'FDM, SLA и SLS печать любых деталей. PLA, PETG, ABS, нейлон и смолы.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Реверс-инжиниринг',
    desc: 'Снимаем размеры с готовых деталей и создаём точные 3D-модели.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: '3D-моделирование',
    desc: 'Разрабатываем модели с нуля по эскизам, чертежам или описанию.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Доставка',
    desc: 'Курьер по Москве, СДЭК по всей России или самовывоз — на ваш выбор.',
  },
]

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('vis'), i * 90)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    pageRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={pageRef} className="bg-white text-[#080808] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="services"
        className="min-h-screen flex items-center pt-[90px] md:pt-[120px] pb-16 md:pb-20 bg-white relative overflow-hidden"
      >
        <div className="absolute top-[-300px] right-[-300px] w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(20,0,255,0.05) 0%, transparent 65%)' }} />

        <div className="w-full px-5 sm:px-8 md:px-14 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-[60px] items-center">
          {/* Left */}
          <div>
            <div className="text-[10px] font-bold tracking-[5px] text-[#1400FF] uppercase mb-5 md:mb-6 animate-fadeUp-1">
              Студия 3D-печати
            </div>
            <h1
              className="font-garet font-extrabold leading-[1.06] tracking-[-1.5px] text-[#080808] mb-6 md:mb-7 animate-fadeUp-2"
              style={{ fontSize: 'clamp(32px, 6vw, 60px)' }}
            >
              Печатаем <em className="not-italic text-[#1400FF]">детали</em>{' '}
              любой сложности
            </h1>
            <p className="text-sm md:text-[15px] leading-[1.75] text-[#555] mb-8 md:mb-11 animate-fadeUp-3">
              Заказ через Telegram-бот за 2 минуты. Доставка по всей России.
              Никаких лишних звонков — от заявки до готовой детали.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 animate-fadeUp-4">
              <a
                href="https://t.me/HevialPrintBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#1400FF] text-white font-garet text-[11px] font-bold tracking-[2.5px] uppercase no-underline px-8 py-4 transition-all duration-200 hover:bg-[#0E00CC] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(20,0,255,0.3)]"
              >
                <TelegramIcon size={16} />
                Оформить заказ
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2.5 bg-transparent text-[#1400FF] font-garet text-[11px] font-bold tracking-[2.5px] uppercase no-underline px-8 py-4 border-[1.5px] border-[#1400FF] transition-all duration-200 hover:bg-[#1400FF] hover:text-white"
              >
                О нас
              </a>
            </div>
          </div>

          {/* Right — service grid */}
          <div className="animate-fadeUp-5">
            <div className="grid grid-cols-2 gap-px bg-[#1400FF]/10 border border-[#1400FF]/10">
              {services.map((srv) => (
                <div key={srv.title} className="bg-white p-5 md:p-7 transition-colors duration-200 hover:bg-[#F4F5F9]">
                  <div className="w-[34px] h-[34px] md:w-[38px] md:h-[38px] bg-[#1400FF] flex items-center justify-center mb-3">
                    {srv.icon}
                  </div>
                  <div className="text-xs font-bold text-[#080808] mb-1">{srv.title}</div>
                  <div className="text-[11px] text-[#777] leading-relaxed">{srv.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="py-16 md:py-24 px-5 sm:px-8 md:px-14 relative overflow-hidden"
        style={{ background: '#1400FF' }}
      >
        <div className="absolute right-[-40px] bottom-[-20px] font-garet font-extrabold pointer-events-none select-none leading-none tracking-[-6px]"
          style={{ fontSize: 'clamp(80px, 18vw, 200px)', color: 'rgba(255,255,255,0.04)' }}>
          HEVIAL
        </div>

        <div className="w-full">
          {/* Head */}
          <div className="reveal grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-[60px] items-start mb-10 md:mb-14 pb-8 md:pb-11 border-b border-white/15">
            <div>
              <div className="text-[9px] font-bold tracking-[5px] text-white/40 uppercase mb-3">О нашем проекте</div>
              <h2
                className="font-garet font-extrabold text-white leading-[1.1] tracking-[-1px]"
                style={{ fontSize: 'clamp(22px, 4vw, 38px)' }}
              >
                Мы инновационная<br />студия 3D-печати
              </h2>
            </div>
            <p className="text-sm md:text-[15px] leading-[1.75] text-white/75 md:pt-1.5">
              Занимаемся 3D-печатью, реверс-инжинирингом и моделированием. Всё быстро, современно и просто — от заявки до готовой детали без лишних звонков и переписок.
            </p>
          </div>

          {/* Points */}
          <div className="flex flex-col">
            {[
              { num: '01', text: <>Наш проект основан на том, чтобы исправить ситуацию на рынке 3D-печати и предоставить клиентам <strong className="text-white font-bold">совершенно новый опыт</strong> — без сложных переговоров, непонятных терминов и долгого ожидания.</> },
              { num: '02', text: <>Мы уделили отдельное внимание <strong className="text-white font-bold">удобству и сервису</strong>: заказ оформляется через бота за 2 минуты в любое время, доставка — на выбор: курьер по Москве, СДЭК по всей России или самовывоз.</> },
              { num: '03', text: <>Нам важно, чтобы клиент всегда оставался доволен — для этого мы предоставляем <strong className="text-white font-bold">полную сферу услуг под ключ</strong>: 3D-моделирование, реверс-инжиниринг и печать в одном месте.</> },
            ].map((pt) => (
              <div key={pt.num} className="reveal py-6 md:py-7 border-t border-white/[0.12] grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr] gap-6 md:gap-12 items-start">
                <div className="font-garet text-[11px] font-bold text-white/30 tracking-[3px] pt-0.5">{pt.num}</div>
                <div className="text-sm md:text-[15px] leading-[1.75] text-white/[0.88]">{pt.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioSlider />

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-14 md:py-20 px-5 sm:px-8 md:px-14 bg-[#F4F5F9] border-t border-black/[0.06]">
        <div className="w-full">
          <h2 className="font-garet text-lg md:text-[20px] font-bold text-[#080808] mb-7 md:mb-9">
            Где можно с нами связаться?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 sm:max-w-[540px]">
            <a
              href="mailto:info@hevial.ru"
              className="flex items-center gap-3.5 no-underline text-[#080808] text-sm font-medium px-5 py-4 md:py-[18px] bg-white border border-black/[0.07] transition-all duration-[180ms] hover:border-[#1400FF] hover:text-[#1400FF] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,0,255,0.1)]"
            >
              <div className="w-[34px] h-[34px] bg-[#1400FF] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              info@hevial.ru
            </a>
            <a
              href="https://t.me/HevialPrintBot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 no-underline text-[#080808] text-sm font-medium px-5 py-4 md:py-[18px] bg-white border border-black/[0.07] transition-all duration-[180ms] hover:border-[#1400FF] hover:text-[#1400FF] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,0,255,0.1)]"
            >
              <div className="w-[34px] h-[34px] bg-[#1400FF] flex items-center justify-center flex-shrink-0">
                <TelegramIcon size={16} />
              </div>
              @HevialPrintBot
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}