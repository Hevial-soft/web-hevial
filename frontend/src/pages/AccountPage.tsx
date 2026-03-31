import { useState, useEffect } from 'react'
import { AccountNav } from '../components/AccountNav'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { PlansModal } from '../components/PlansModal'
import { StlViewer } from '../components/StlViewer'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// ── Типы ─────────────────────────────────────────────────────
interface User { id: number; name: string; username?: string; telegramId: number }
interface Order {
  id: number; number: string; status: string; type: string
  material?: string; size?: string; quantity: number
  price?: number; readyDate?: string; description?: string
  hasFile: boolean; fileName?: string; createdAt: string
}
interface Subscription { level: string; expires_at: string }

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW:             { label: 'Новый',         color: 'text-gray-500 bg-gray-100' },
  ACCEPTED:        { label: 'Принят',        color: 'text-blue-600 bg-blue-50' },
  PENDING_PAYMENT: { label: 'Ожидает оплаты',color: 'text-yellow-600 bg-yellow-50' },
  PAID:            { label: 'Оплачен',       color: 'text-green-600 bg-green-50' },
  IN_PROGRESS:     { label: 'В работе',      color: 'text-[#1400FF] bg-[#1400FF]/5' },
  READY:           { label: 'Готов',         color: 'text-green-700 bg-green-100' },
  DELIVERED:       { label: 'Выдан',         color: 'text-gray-600 bg-gray-100' },
  CANCELLED:       { label: 'Отменён',       color: 'text-red-600 bg-red-50' },
  CLOSED:          { label: 'Закрыт',        color: 'text-gray-400 bg-gray-50' },
}

// ── Главный компонент ─────────────────────────────────────────
export function AccountPage() {
  const [token, setToken]       = useState(() => localStorage.getItem('hevial_token') || '')
  const [user, setUser]         = useState<User | null>(null)
  const [orders, setOrders]     = useState<Order[]>([])
  const [sub, setSub]           = useState<Subscription | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [orderInput, setOrderInput] = useState('')
  const [plansOpen, setPlansOpen]   = useState(false)
  const [stlOrder, setStlOrder]     = useState<Order | null>(null)
  const [stlUrl, setStlUrl]         = useState('')

  // Загрузить данные если есть токен
  useEffect(() => {
    if (token) loadProfile()
  }, [token])

  async function api(path: string, opts?: RequestInit) {
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(opts?.headers || {}),
      },
    })
    if (res.status === 401) { logout(); return null }
    return res.ok ? res.json() : null
  }

  async function loadProfile() {
    setLoading(true)
    try {
      const [me, ordersData, subData] = await Promise.all([
        api('/api/auth/me'),
        api('/api/orders'),
        api('/api/subscription'),
      ])
      if (me) setUser(me)
      if (ordersData) setOrders(ordersData)
      setSub(subData)
    } finally {
      setLoading(false)
    }
  }

  // Вход по номеру заказа
  async function loginByOrder() {
    if (!orderInput.trim()) return
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/api/auth/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber: orderInput.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Заказ не найден'); return }
      localStorage.setItem('hevial_token', data.token)
      setToken(data.token)
      setUser(data.user)
      if (data.order) setOrders([data.order])
    } catch { setError('Ошибка подключения к серверу') }
    finally { setLoading(false) }
  }

  // Авторизация через Telegram
  function loginTelegram() {
    const botName = import.meta.env.VITE_BOT_NAME || 'HevialPrintBot'
    ;(window as any).Telegram?.Login.auth(
      { bot_id: botName, request_access: true },
      async (tgUser: Record<string, string>) => {
        if (!tgUser) return
        const res = await fetch(`${API}/api/auth/telegram`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tgUser),
        })
        const data = await res.json()
        if (res.ok) {
          localStorage.setItem('hevial_token', data.token)
          setToken(data.token)
        } else { setError(data.error) }
      }
    )
  }

  function logout() {
    api('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('hevial_token')
    setToken(''); setUser(null); setOrders([]); setSub(null)
  }

  // Открыть STL-просмотр
  async function openStl(order: Order) {
    setStlOrder(order); setStlUrl('')
    const data = await api(`/api/files/${order.number}`)
    if (data?.url) setStlUrl(data.url)
  }

  // Оплатить заказ
  async function payOrder(order: Order) {
    if (!order.price) return
    const res = await fetch(`${API}/api/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        orderNumber: order.number,
        amount: order.price,
        description: `Заказ ${order.number}`,
      }),
    })
    const data = await res.json()
    if (data.confirmationUrl) window.location.href = data.confirmationUrl
  }

  // ── Экран входа ───────────────────────────────────────────
  if (!user) return (
    <div className="bg-[#F4F5F9] min-h-screen">
      <AccountNav />
      <Container className="py-20">
        <div className="max-w-md mx-auto">
          <h1 className="font-garet font-extrabold text-[#080808] text-2xl mb-2">Личный кабинет</h1>
          <p className="text-sm text-[#666] mb-8">Войдите через Telegram или введите номер заказа</p>

          {/* Telegram */}
          <button onClick={loginTelegram}
            className="w-full flex items-center justify-center gap-3 bg-[#1400FF] text-white font-garet font-bold text-[11px] tracking-[2px] uppercase px-6 py-4 mb-4 hover:bg-[#0E00CC] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
            </svg>
            Войти через Telegram
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E0E0E0]" />
            <span className="text-xs text-[#999]">или</span>
            <div className="flex-1 h-px bg-[#E0E0E0]" />
          </div>

          {/* По номеру заказа */}
          <div className="bg-white border border-black/[0.07] p-5">
            <div className="text-xs font-bold text-[#080808] mb-3">Войти по номеру заказа</div>
            <input
              className="w-full border border-black/[0.1] px-4 py-3 text-sm font-garet placeholder:text-[#AAA] focus:outline-none focus:border-[#1400FF] mb-3 uppercase"
              placeholder="HVL-00001"
              value={orderInput}
              onChange={e => setOrderInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && loginByOrder()}
            />
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <button onClick={loginByOrder} disabled={loading}
              className="w-full bg-[#080808] text-white font-garet font-bold text-[11px] tracking-[2px] uppercase px-6 py-3 hover:bg-[#333] transition-colors disabled:opacity-50">
              {loading ? 'Проверяем...' : 'Открыть заказ'}
            </button>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  )

  // ── Кабинет ───────────────────────────────────────────────
  return (
    <div className="bg-[#F4F5F9] min-h-screen">
      <AccountNav />

      {/* Шапка */}
      <div className="bg-[#1400FF]">
        <Container className="py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-[9px] font-bold tracking-[5px] text-white/50 uppercase mb-2">Личный кабинет</div>
              <h1 className="font-garet font-extrabold text-white text-2xl">
                {user.name}
                {user.username && <span className="text-white/50 text-lg font-normal ml-2">@{user.username}</span>}
              </h1>
            </div>
            <button onClick={logout}
              className="text-white/60 text-xs font-garet tracking-[2px] uppercase hover:text-white transition-colors">
              Выйти
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* ── Заказы ── */}
          <div>
            <h2 className="font-garet font-bold text-[#080808] text-lg mb-4">Мои заказы</h2>
            {loading && <p className="text-sm text-[#999]">Загружаем...</p>}
            {!loading && orders.length === 0 && (
              <div className="bg-white border border-black/[0.07] p-8 text-center">
                <p className="text-sm text-[#999]">Заказов пока нет</p>
                <a href="https://t.me/HevialPrintBot" target="_blank"
                  className="inline-block mt-4 text-[#1400FF] text-xs font-bold tracking-[2px] uppercase">
                  Оформить заказ →
                </a>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {orders.map(order => {
                const st = STATUS_LABELS[order.status] || { label: order.status, color: 'text-gray-500 bg-gray-100' }
                return (
                  <div key={order.id} className="bg-white border border-black/[0.07] p-5">
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                      <div>
                        <div className="font-garet font-bold text-[#080808] text-sm">{order.number}</div>
                        <div className="text-xs text-[#999] mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                          {order.readyDate && ` · Готовность: ${new Date(order.readyDate).toLocaleDateString('ru-RU')}`}
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 ${st.color}`}>{st.label}</span>
                    </div>

                    {order.description && (
                      <p className="text-xs text-[#555] mb-3 leading-relaxed">{order.description}</p>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {order.material && <div className="text-[10px] text-[#999]">Материал<br /><span className="text-[#080808] font-bold">{order.material}</span></div>}
                      {order.size && <div className="text-[10px] text-[#999]">Размер<br /><span className="text-[#080808] font-bold">{order.size}</span></div>}
                      {order.quantity > 1 && <div className="text-[10px] text-[#999]">Кол-во<br /><span className="text-[#080808] font-bold">{order.quantity} шт.</span></div>}
                      {order.price && <div className="text-[10px] text-[#999]">Стоимость<br /><span className="text-[#1400FF] font-bold">{order.price.toLocaleString()} ₽</span></div>}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.hasFile && (
                        <button onClick={() => openStl(order)}
                          className="text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-2 bg-[#1400FF]/5 text-[#1400FF] hover:bg-[#1400FF]/10 transition-colors">
                          🔷 Просмотр 3D
                        </button>
                      )}
                      {order.status === 'ACCEPTED' && order.price && (
                        <button onClick={() => payOrder(order)}
                          className="text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-2 bg-[#1400FF] text-white hover:bg-[#0E00CC] transition-colors">
                          💳 Оплатить {order.price.toLocaleString()} ₽
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Боковая панель ── */}
          <div className="flex flex-col gap-4">
            {/* Подписка */}
            <div className="bg-white border border-black/[0.07] p-5">
              <div className="text-[9px] font-bold tracking-[3px] text-[#999] uppercase mb-3">Подписка</div>
              {sub ? (
                <>
                  <div className="font-garet font-extrabold text-[#1400FF] text-lg capitalize">{sub.level}</div>
                  <div className="text-xs text-[#999] mt-1">
                    До {new Date(sub.expires_at).toLocaleDateString('ru-RU')}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-[#555] mb-3">Нет активной подписки</div>
                  <button onClick={() => setPlansOpen(true)}
                    className="w-full text-[10px] font-bold tracking-[2px] uppercase px-4 py-2.5 border border-[#1400FF] text-[#1400FF] hover:bg-[#1400FF] hover:text-white transition-colors">
                    Выбрать тариф
                  </button>
                </>
              )}
            </div>

            {/* Быстрые ссылки */}
            <div className="bg-white border border-black/[0.07] p-5">
              <div className="text-[9px] font-bold tracking-[3px] text-[#999] uppercase mb-3">Быстрые действия</div>
              <div className="flex flex-col gap-2">
                <a href="https://t.me/HevialPrintBot" target="_blank"
                  className="text-xs text-[#080808] hover:text-[#1400FF] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1400FF]" />
                  Новый заказ в боте
                </a>
                <a href="/returns"
                  className="text-xs text-[#080808] hover:text-[#1400FF] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1400FF]" />
                  Политика возврата
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* STL просмотрщик */}
      {stlOrder && (
        <StlViewer
          url={stlUrl}
          fileName={stlOrder.fileName}
          onClose={() => { setStlOrder(null); setStlUrl('') }}
        />
      )}

      {plansOpen && <PlansModal onClose={() => setPlansOpen(false)} />}
      <Footer />
    </div>
  )
}
