import { AccountNav } from '../components/AccountNav'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
  </svg>
)

const steps = [
  { n: '1', title: 'Вы оплачиваете заказ', desc: <>Деньги <strong className="text-[#080808]">замораживаются</strong> на вашей карте — не списываются. Это называется холдирование.</> },
  { n: '2', title: 'Мы печатаем деталь', desc: 'Работаем пока ваши деньги лежат замороженными — мы ещё ничего не получили.' },
  { n: '3', title: 'Присылаем фотографию', desc: <>Фото готовой детали приходит в Telegram-бот <strong className="text-[#080808]">до того</strong> как мы отправляем её в СДЭК.</> },
  { n: '4', title: 'Вы решаете', desc: <>Нажали «Отправляйте» → деньги списались, едем в СДЭК.<br />Нажали «Есть вопрос» → разбираемся вместе, деньги ещё не ушли.</> },
]

const greenItems = [
  'На фото видно что деталь не соответствует согласованным размерам.',
  'Явные дефекты печати: расслоение, дыры, сильная деформация.',
  'Мы не смогли выполнить заказ по техническим причинам.',
  'Мы нарушили срок более чем на 7 рабочих дней.',
  'Вы отказались до начала производства — до оплаты отказаться можно в любой момент.',
  'Комплексный заказ: вы отказались после получения рендера модели, но до оплаты.',
]

const redItems = [
  'Вы нажали «Отправляйте» — деньги уже списаны.',
  'Прошло 48 часов после фото без ответа — деньги списаны автоматически.',
  'Вы сами указали неверные размеры, деталь напечатана по ним.',
  'Вы прислали файл с ошибками и подтвердили его перед печатью.',
  'Деталь не подошла по причинам не связанным с качеством печати.',
  'Вы изменили требования после начала производства.',
]

const blueComplex = [
  <><strong>До оплаты:</strong> вы видите рендер модели и можете отказаться — ничего не платите.</>,
  <><strong>После оплаты, дефект печати:</strong> переделываем печать бесплатно.</>,
  <><strong>Ошибка в модели по нашей вине:</strong> переделываем модель и печать бесплатно.</>,
  <><strong>Ошибка из-за ваших данных:</strong> повторная работа оплачивается отдельно.</>,
  <><strong>Файл модели:</strong> если нужен STL/STEP — скажите, передадим бесплатно.</>,
]

const blueOriginal = [
  'Оригинал возвращается вместе с готовым изделием или отдельно — по договорённости.',
  'Если вы отказались до начала моделирования — возвращаем оригинал, стоимость обратной пересылки оплачиваете вы.',
  'Бережно обращаемся с оригиналом — фотографируем при получении и при отправке.',
]

function SectionTitle({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-[#1400FF]/10">
      <span className="font-garet text-[10px] font-bold tracking-[3px] text-[#1400FF]/35 uppercase flex-shrink-0">{num}</span>
      <span className="font-garet text-lg font-extrabold text-[#1400FF] tracking-tight">{children}</span>
    </div>
  )
}

function Card({ variant, head, items }: { variant: 'green' | 'red' | 'blue'; head: string; items: React.ReactNode[] }) {
  const headCls = {
    green: 'bg-[#00A651]/10 text-[#00A651]',
    red: 'bg-[#CC0000]/[0.08] text-[#CC0000]',
    blue: 'bg-[#1400FF]/[0.07] text-[#1400FF]',
  }[variant]

  const bullet = { green: '✅', red: '❌', blue: '→' }[variant]
  const bulletCls = variant === 'blue' ? 'text-[#1400FF] font-bold' : ''

  return (
    <div className="mb-4 overflow-hidden border border-black/[0.07]">
      <div className={`px-5 py-3 text-xs font-bold tracking-[0.5px] ${headCls}`}>{head}</div>
      <div className="bg-white px-5 py-4">
        <ul className="flex flex-col gap-2.5">
          {items.map((item, i) => (
            <li key={i} className="text-sm leading-relaxed text-[#080808] flex items-start gap-2.5">
              <span className={`flex-shrink-0 mt-px ${bulletCls}`}>{bullet}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[13px] text-[#666] italic leading-relaxed mb-4 px-4 py-3 bg-white border-l-[3px] border-black/10">
      {children}
    </div>
  )
}

function StatBox({ val, label }: { val: string; label: string }) {
  return (
    <div className="bg-white border border-black/[0.07] border-t-[3px] border-t-[#1400FF] p-5">
      <div className="font-garet text-[22px] font-extrabold text-[#1400FF] tracking-tight mb-1">{val}</div>
      <div className="text-xs text-[#666] leading-relaxed">{label}</div>
    </div>
  )
}

export function ReturnsPage() {
  return (
    <div className="bg-[#F4F5F9] min-h-screen text-[#080808]">
      <AccountNav />

      {/* Blue header */}
      <div className="bg-[#1400FF]">
        <Container className="py-12 md:py-16">
          <div className="text-[9px] font-bold tracking-[5px] text-white/50 uppercase mb-3">Документы · hevial.ru/returns</div>
          <h1 className="font-garet font-extrabold text-white leading-tight tracking-tight mb-3"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
            Политика возврата
          </h1>
          <p className="text-sm text-white/65 leading-relaxed max-w-xl">
            Простыми словами — когда вернём деньги, когда нет и что делать если что-то пошло не так.
          </p>
          <div className="mt-5 text-[11px] text-white/40 tracking-[2px] uppercase">Редакция от 13 марта 2026 года</div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-10 md:py-14">

        {/* Intro */}
        <div className="bg-white border border-black/[0.07] border-l-4 border-l-[#1400FF] px-7 py-6 mb-10 text-[15px] leading-[1.75] text-[#080808]">
          Мы понимаем что заказывать у незнакомого сервиса — это доверие. Поэтому сделали оплату так, чтобы вы рисковали как можно меньше: деньги уходят к нам только после того, как <strong>вы сами подтвердите</strong> что деталь в порядке.
        </div>

        {/* 01 */}
        <div className="mb-10">
          <SectionTitle num="01">Как работает оплата</SectionTitle>
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <div key={i} className={`flex gap-5 items-start py-4 ${i < steps.length - 1 ? 'border-b border-black/[0.06]' : ''}`}>
                <div className="w-9 h-9 bg-[#1400FF] text-white font-garet text-[13px] font-extrabold flex items-center justify-center flex-shrink-0">
                  {s.n}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#080808] mb-1">{s.title}</div>
                  <div className="text-[13px] text-[#666] leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Note>⏱ Если вы не ответили в течение 48 часов после получения фото — деньги списываются автоматически. Это прописано в оферте и мы предупреждаем об этом заранее.</Note>
        </div>

        {/* 02 */}
        <div className="mb-10">
          <SectionTitle num="02">Когда вернём деньги полностью</SectionTitle>
          <Card variant="green" head="Возврат 100% — эти случаи" items={greenItems} />
          <p className="text-[15px] leading-[1.75] text-[#080808]"><strong>Что нужно сделать:</strong> нажать «Есть вопрос» при получении фото в боте. Мы вернём деньги в течение 3–5 рабочих дней на карту.</p>
        </div>

        {/* 03 */}
        <div className="mb-10">
          <SectionTitle num="03">Когда вернуть деньги не получится</SectionTitle>
          <Card variant="red" head="Возврат невозможен — эти случаи" items={redItems} />
          <Note>FDM-печать по технологии имеет видимую слоистость поверхности — это не дефект, это особенность метода. Мы предупреждаем об этом при оформлении заказа.</Note>
        </div>

        {/* 04 */}
        <div className="mb-10">
          <SectionTitle num="04">Сроки возврата денег</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <StatBox val="Мгновенно" label="Отмена холда — если деньги ещё не были списаны. На карте появятся в течение нескольких минут — 3 дней в зависимости от банка." />
            <StatBox val="3–10 дней" label="Возврат уже списанных средств. Срок зависит от вашего банка — мы со своей стороны оформляем возврат в течение 1 рабочего дня." />
          </div>
        </div>

        {/* 05 */}
        <div className="mb-10">
          <SectionTitle num="05">Комплексные заказы (моделирование + печать)</SectionTitle>
          <Card variant="blue" head="Как это работает" items={blueComplex} />
        </div>

        {/* 06 */}
        <div className="mb-10">
          <SectionTitle num="06">Заказы с отправкой оригинала</SectionTitle>
          <p className="text-[15px] leading-[1.75] text-[#080808] mb-4">Если вы отправляли нам оригинальную деталь для замера:</p>
          <Card variant="blue" head="Что происходит с оригиналом" items={blueOriginal} />
        </div>

        {/* 07 */}
        <div className="mb-10">
          <SectionTitle num="07">Гарантия на изделия</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <StatBox val="±0,5 мм" label="Допуск для FDM-печати (PLA, PETG, ABS и другие пластики)" />
            <StatBox val="±0,2 мм" label="Допуск для фотополимерной печати (смола)" />
          </div>
          <p className="text-[15px] leading-[1.75] text-[#080808]">Если изделие не попадает в допуск по нашей вине — перепечатаем бесплатно. Гарантия действует с момента получения изделия.</p>
        </div>

        {/* CTA */}
        <div className="bg-[#1400FF] px-8 md:px-10 py-10 text-center mt-12">
          <div className="font-garet text-xl font-extrabold text-white mb-2 tracking-tight">Остались вопросы?</div>
          <div className="text-sm text-white/65 mb-6">Напишите нам — разберёмся в течение рабочего дня.</div>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="https://t.me/HevialPrintBot" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1400FF] font-garet text-[11px] font-bold tracking-[2px] uppercase no-underline px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
              <TelegramIcon />
              @HevialPrintBot
            </a>
            <a href="mailto:3d.homis@gmail.com"
              className="inline-flex items-center gap-2 bg-transparent text-white font-garet text-[11px] font-bold tracking-[2px] uppercase no-underline px-6 py-3.5 border-[1.5px] border-white/40 transition-all duration-200 hover:border-white">
              3d.homis@gmail.com
            </a>
          </div>
        </div>

      </Container>

      <Footer />
    </div>
  )
}
