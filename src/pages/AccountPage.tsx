import { useState } from 'react'
import { AccountNav } from '../components/AccountNav'
import { PlansModal } from '../components/PlansModal'
import { Logo } from '../components/Logo'
import type { User, Subscription, Order, OrderStatus } from '../types'
import { Container } from '../components/Container'

const TelegramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
  </svg>
)

const BoxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" />
  </svg>
)

const DEMO_ORDERS: Order[] = [
  { id: '1', number: '#0042', description: 'Корпус для электроники · PLA · 3 шт.', date: '12 мая 2025', status: 'done', price: 2400 },
  { id: '2', number: '#0051', description: 'Кронштейн крепления · PETG · 1 шт.', date: '28 апреля 2025', status: 'done', price: 850 },
]

const STATUS_LABELS: Record<OrderStatus, string> = {
  active: 'В работе',
  done: 'Выполнен',
  pending: 'Ожидает',
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const cls: Record<OrderStatus, string> = {
    active: 'bg-[#1400FF]/[0.08] text-[#1400FF]',
    done: 'bg-[#00A651]/[0.08] text-[#00A651]',
    pending: 'bg-[#F4F5F9] text-[#666]',
  }
  return (
    <span className={`text-[10px] font-bold tracking-[2px] uppercase px-3 py-[5px] whitespace-nowrap ${cls[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

// ─── AUTH SCREEN ───────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }: { onLogin: (user: User) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-2">
      <div className="mb-2">
        <Logo size="lg" />
      </div>
      <div className="text-[12px] font-medium tracking-[4px] text-[#666] uppercase mb-10">
        Личный кабинет
      </div>

      <div className="bg-white border border-black/[0.08] p-7 sm:p-12 w-full max-w-[420px]">
        <div className="font-garet text-[20px] font-extrabold text-[#080808] mb-2 tracking-tight">
          Войдите в кабинет
        </div>
        <p className="text-[13px] text-[#666] leading-[1.65] mb-8">
          Управляйте заказами, подпиской и настройками в одном месте.
        </p>

        <button
          onClick={() => onLogin({ name: 'Иван Петров', telegramId: '@ivanpetrov' })}
          className="flex items-center justify-center gap-3 w-full bg-[#1400FF] text-white font-garet text-[12px] font-bold tracking-[2px] uppercase py-4 px-6 border-none cursor-pointer transition-all duration-200 hover:bg-[#0E00CC] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(20,0,255,0.28)]"
        >
          <TelegramIcon size={18} />
          Войти через Telegram
        </button>

        <div className="my-5 flex items-center gap-3.5 text-[11px] text-[#666] font-medium tracking-[1px]
          before:content-[''] before:flex-1 before:h-px before:bg-black/[0.08]
          after:content-[''] after:flex-1 after:h-px after:bg-black/[0.08]">
          или
        </div>

        <button
          onClick={() => onLogin({ name: 'Демо Пользователь' })}
          className="block w-full bg-transparent text-[#1400FF] font-garet text-[12px] font-bold tracking-[2px] uppercase py-[14px] px-6 border-[1.5px] border-[#1400FF] cursor-pointer transition-all duration-200 hover:bg-[#1400FF] hover:text-white"
        >
          Демо-вход (без авторизации)
        </button>

        <p className="mt-5 text-[11px] text-[#666] leading-[1.6]">
          Для входа используется Telegram Login Widget. Мы не получаем доступ к переписке.
        </p>
      </div>
    </div>
  )
}

// ─── SUBSCRIPTION CARD ─────────────────────────────────────────────────────────
function SubCard({ subscription, onOpenPlans }: { subscription: Subscription | null; onOpenPlans: () => void }) {
  const getSubInfo = () => {
    if (!subscription) {
      return { badge: 'Без подписки', badgeClass: 'bg-[#F4F5F9] text-[#666]', title: 'Базовый доступ', status: '—', statusClass: '', expiry: '—', expiryClass: '', level: '—' }
    }
    const exp = new Date(subscription.expiry)
    const daysLeft = Math.ceil((exp.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    const expired = daysLeft <= 0
    return {
      badge: subscription.level === 'pro' ? 'Приоритетный' : 'Базовый',
      badgeClass: subscription.level === 'pro' ? 'bg-[#080808] text-white' : 'bg-[#1400FF] text-white',
      title: subscription.level === 'pro' ? 'Приоритетный уровень' : 'Базовый уровень',
      status: expired ? 'Истекла' : 'Активна',
      statusClass: expired ? 'text-[#E53935]' : 'text-[#00A651]',
      expiry: exp.toLocaleDateString('ru-RU') + (daysLeft > 0 ? ` (${daysLeft} дн.)` : ''),
      expiryClass: daysLeft <= 7 ? 'text-[#E53935]' : '',
      level: subscription.level === 'pro' ? 'Уровень 2' : 'Уровень 1',
      daysLeft,
    }
  }

  const info = getSubInfo()

  return (
    <div className="bg-white border border-black/[0.07] p-5 sm:p-7 mb-6 flex flex-col sm:grid sm:grid-cols-[1fr_auto] gap-5 sm:gap-6 items-start">
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className={`font-garet text-[9px] font-bold tracking-[3px] uppercase px-3 py-[5px] ${info.badgeClass}`}>
            {info.badge}
          </span>
          <span className="font-garet text-base sm:text-[17px] font-extrabold text-[#080808] tracking-tight">
            {info.title}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-x-4 sm:gap-x-8">
          {[
            { label: 'Статус', value: info.status, cls: info.statusClass },
            { label: 'Действует до', value: info.expiry, cls: info.expiryClass },
            { label: 'Уровень', value: info.level, cls: '' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[8px] sm:text-[9px] font-semibold tracking-[2px] sm:tracking-[3px] uppercase text-[#666] mb-1">{item.label}</div>
              <div className={`text-xs sm:text-sm font-bold text-[#080808] ${item.cls}`}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto sm:min-w-[160px]">
        <button
          onClick={onOpenPlans}
          className="flex-1 sm:flex-none font-garet text-[10px] font-bold tracking-[2px] uppercase py-3 sm:py-3.5 px-4 sm:px-5 bg-[#1400FF] text-white border-none cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[#0E00CC]"
        >
          {subscription ? 'Изменить тариф' : 'Оформить подписку'}
        </button>
        {subscription && 'daysLeft' in info && (info.daysLeft as number) <= 30 && (
          <button
            onClick={onOpenPlans}
            className="flex-1 sm:flex-none font-garet text-[10px] font-bold tracking-[2px] uppercase py-3 sm:py-[11px] px-4 sm:px-5 bg-transparent text-[#1400FF] border-[1.5px] border-[#1400FF] cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[#1400FF] hover:text-white"
          >
            Продлить
          </button>
        )}
      </div>
    </div>
  )
}

// ─── ORDERS SECTION ────────────────────────────────────────────────────────────
type Tab = 'active' | 'done'

function OrdersSection({ orders }: { orders: Order[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('active')
  const activeOrders = orders.filter((o) => o.status === 'active')
  const doneOrders = orders.filter((o) => o.status === 'done')
  const shown = activeTab === 'active' ? activeOrders : doneOrders

  return (
    <div className="bg-white border border-black/[0.07]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-5 sm:py-6 gap-3 border-b border-black/[0.06]">
        <div className="font-garet text-base font-extrabold text-[#080808] tracking-tight">Мои заказы</div>
        <div className="flex">
          {(['active', 'done'] as Tab[]).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                font-garet text-[11px] font-semibold px-4 sm:px-5 py-2 border-[1.5px] border-[#1400FF] tracking-[0.5px] cursor-pointer transition-all duration-[180ms]
                ${i > 0 ? '-ml-px' : ''}
                ${activeTab === tab ? 'bg-[#1400FF] text-white z-10 relative' : 'bg-transparent text-[#1400FF] hover:bg-[#1400FF] hover:text-white'}
              `}
            >
              {tab === 'active' ? 'Активные' : 'История'}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="py-14 px-5 text-center">
          <div className="w-[52px] h-[52px] bg-[#1400FF] flex items-center justify-center mx-auto mb-4">
            <BoxIcon />
          </div>
          <div className="text-sm font-bold text-[#080808] mb-1.5">
            {activeTab === 'active' ? 'Нет активных заказов' : 'История пуста'}
          </div>
          <div className="text-xs text-[#666]">
            {activeTab === 'active' ? 'Оформите заказ через Telegram-бот' : 'Завершённые заказы появятся здесь'}
          </div>
        </div>
      ) : (
        shown.map((order) => (
          <div key={order.id} className="px-5 sm:px-7 py-4 sm:py-[18px] border-b border-black/[0.05] last:border-b-0 transition-colors duration-[180ms] hover:bg-[#F4F5F9]">
            {/* Mobile: stacked layout */}
            <div className="flex items-start justify-between gap-3 mb-2 sm:hidden">
              <div>
                <div className="font-garet text-[13px] font-bold text-[#1400FF]">{order.number}</div>
                <div className="text-xs text-[#666] mt-0.5">{order.date}</div>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="text-xs text-[#666] mb-3 sm:hidden">{order.description}</div>
            <div className="flex items-center justify-between sm:hidden">
              <div className="font-garet text-sm font-extrabold text-[#080808]">
                {order.price.toLocaleString('ru-RU')} ₽
              </div>
              <button className="font-garet text-[9px] font-bold tracking-[2px] uppercase py-[7px] px-3 bg-transparent text-[#1400FF] border-[1.5px] border-[#1400FF] cursor-pointer transition-all duration-[180ms] hover:bg-[#1400FF] hover:text-white">
                Повторить
              </button>
            </div>

            {/* Desktop: grid layout */}
            <div className="hidden sm:grid gap-5 items-center" style={{ gridTemplateColumns: 'auto 1fr auto auto' }}>
              <div>
                <div className="font-garet text-[13px] font-bold text-[#1400FF]">{order.number}</div>
                <div className="text-xs text-[#666] mt-0.5">{order.date}</div>
              </div>
              <div className="text-xs text-[#666]">{order.description}</div>
              <StatusBadge status={order.status} />
              <div className="flex items-center gap-3">
                <div className="font-garet text-sm font-extrabold text-[#080808]">
                  {order.price.toLocaleString('ru-RU')} ₽
                </div>
                <button className="font-garet text-[9px] font-bold tracking-[2px] uppercase py-[7px] px-3.5 bg-transparent text-[#1400FF] border-[1.5px] border-[#1400FF] cursor-pointer transition-all duration-[180ms] whitespace-nowrap hover:bg-[#1400FF] hover:text-white">
                  Повторить
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export function AccountPage() {
  const [user, setUser] = useState<User | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [plansOpen, setPlansOpen] = useState(false)

  const handleLogin = (u: User) => setUser(u)
  const handleLogout = () => { setUser(null); setSubscription(null) }

  const handleSelectPlan = (level: 'base' | 'pro') => {
    setPlansOpen(false)
    alert(`Оплата через ЮКасса — скоро будет доступно!\nСейчас можно обратиться к специалисту в @HevialPrintBot`)
    setSubscription({ level, expiry: '2025-12-31' })
  }

  return (
    <div className="bg-[#F4F5F9] min-h-screen text-[#080808]">
      <AccountNav />

      <Container className="py-8 md:py-12 pb-16 md:pb-20">
        {!user ? (
          <AuthScreen onLogin={handleLogin} />
        ) : (
          <div>
            {/* Welcome bar */}
            <div className="bg-[#1400FF] text-white px-5 sm:px-9 py-5 sm:py-7 mb-6 flex items-center justify-between gap-4">
              <div>
                <div className="font-garet text-lg sm:text-[22px] font-extrabold tracking-tight">
                  Привет, {user.name.split(' ')[0]}!
                </div>
                <div className="text-xs text-white/65 mt-1 tracking-[0.5px]">
                  Добро пожаловать в личный кабинет
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="font-garet text-[10px] font-bold tracking-[2px] uppercase text-white/50 bg-transparent border border-white/20 px-3 sm:px-4 py-2 cursor-pointer transition-all duration-[180ms] hover:text-white hover:border-white whitespace-nowrap"
              >
                Выйти
              </button>
            </div>

            {/* Subscription */}
            <SubCard subscription={subscription} onOpenPlans={() => setPlansOpen(true)} />

            {/* Orders */}
            <OrdersSection orders={DEMO_ORDERS} />

            {/* Bottom CTA */}
            <div className="mt-5 sm:mt-7 bg-white border border-black/[0.07] px-5 sm:px-8 py-5 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[#080808]">Оформить новый заказ</div>
                <div className="text-xs text-[#666] mt-1">Через Telegram-бот — быстро и удобно</div>
              </div>
              <a
                href="https://t.me/HevialPrintBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#1400FF] text-white font-garet text-[10px] font-bold tracking-[2px] uppercase no-underline px-6 sm:px-7 py-3.5 transition-all duration-200 whitespace-nowrap hover:bg-[#0E00CC] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(20,0,255,0.28)] w-full sm:w-auto justify-center"
              >
                <TelegramIcon size={16} />
                Перейти в бот
              </a>
            </div>
          </div>
        )}
      </Container>

      <PlansModal open={plansOpen} onClose={() => setPlansOpen(false)} onSelect={handleSelectPlan} />
    </div>
  )
}