const items = [
  '3D-печать',
  'Реверс-инжиниринг',
  '3D-моделирование',
  'Быстро',
  'Современно',
  'Под ключ',
  'Москва и вся Россия',
]

export function MarqueeStrip() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-[#080808] py-[18px] overflow-hidden whitespace-nowrap">
      <div className="inline-flex gap-11 items-center animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-11 flex-shrink-0">
            <span className="font-garet text-[11px] font-bold tracking-[4px] text-white/45 uppercase">
              {item}
            </span>
            <span className="w-1 h-1 bg-[#1400FF] rounded-full flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
