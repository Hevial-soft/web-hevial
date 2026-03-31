import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const DEADLINE_OPTIONS = [
  { value: 'standard', label: 'Стандарт — 3–5 дней' },
  { value: 'fast', label: 'Быстро — 24–48 часов (+80%)' },
  { value: 'discuss', label: 'Обсудить со специалистом' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export function OrderForm() {
  const [name, setName]         = useState('')
  const [contact, setContact]   = useState('')
  const [task, setTask]         = useState('')
  const [deadline, setDeadline] = useState('standard')
  const [status, setStatus]     = useState<Status>('idle')
  const [error, setError]       = useState('')

  async function submit() {
    if (!name.trim() || !contact.trim() || !task.trim()) {
      setError('Заполните все поля')
      return
    }
    setError('')
    setStatus('loading')

    try {
      const res = await fetch(`${API}/api/orders/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, task, deadline }),
      })

      if (res.ok) {
        setStatus('success')
        setName(''); setContact(''); setTask(''); setDeadline('standard')
      } else {
        const data = await res.json()
        setError(data.error || 'Ошибка отправки')
        setStatus('error')
      }
    } catch {
      setError('Не удалось подключиться к серверу')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white border border-black/[0.07] border-l-4 border-l-[#1400FF] px-8 py-10 text-center">
        <div className="text-3xl mb-3">✅</div>
        <div className="font-garet font-extrabold text-[#080808] text-lg mb-2">Заявка принята!</div>
        <p className="text-sm text-[#666] mb-5">Специалист свяжется с вами в рабочее время (пн–вс 9:00–21:00).</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-[10px] font-bold tracking-[2px] uppercase text-[#1400FF] border border-[#1400FF] px-5 py-2.5 hover:bg-[#1400FF] hover:text-white transition-colors"
        >
          Отправить ещё
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-black/[0.07]">
      {/* Шапка */}
      <div className="bg-[#1400FF] px-6 py-5">
        <div className="text-[9px] font-bold tracking-[4px] text-white/50 uppercase mb-1">Быстрый старт</div>
        <h3 className="font-garet font-extrabold text-white text-lg">Оставить заявку</h3>
        <p className="text-xs text-white/65 mt-1">Ответим в течение 2 часов в рабочее время</p>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4">
        {/* ФИО */}
        <div>
          <label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#080808] mb-1.5">
            ФИО <span className="text-[#1400FF]">*</span>
          </label>
          <input
            type="text"
            placeholder="Иван Иванов"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-black/[0.1] px-4 py-3 text-sm font-garet placeholder:text-[#BBB] focus:outline-none focus:border-[#1400FF] transition-colors"
          />
        </div>

        {/* Контакт */}
        <div>
          <label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#080808] mb-1.5">
            Контакт <span className="text-[#1400FF]">*</span>
          </label>
          <input
            type="text"
            placeholder="Telegram @username или телефон +7..."
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="w-full border border-black/[0.1] px-4 py-3 text-sm font-garet placeholder:text-[#BBB] focus:outline-none focus:border-[#1400FF] transition-colors"
          />
          <p className="text-[10px] text-[#999] mt-1">Telegram, телефон или email — как удобнее</p>
        </div>

        {/* Описание задачи */}
        <div>
          <label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#080808] mb-1.5">
            Описание задачи <span className="text-[#1400FF]">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Опишите что нужно напечатать или смоделировать. Укажите материал, размеры, количество — если знаете."
            value={task}
            onChange={e => setTask(e.target.value)}
            className="w-full border border-black/[0.1] px-4 py-3 text-sm font-garet placeholder:text-[#BBB] focus:outline-none focus:border-[#1400FF] transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Срок */}
        <div>
          <label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#080808] mb-1.5">
            Срок
          </label>
          <div className="flex flex-col gap-2">
            {DEADLINE_OPTIONS.map(opt => (
              <label key={opt.value}
                className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
                  deadline === opt.value
                    ? 'border-[#1400FF] bg-[#1400FF]/[0.03]'
                    : 'border-black/[0.08] hover:border-[#1400FF]/40'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  deadline === opt.value ? 'border-[#1400FF]' : 'border-[#CCC]'
                }`}>
                  {deadline === opt.value && (
                    <div className="w-2 h-2 rounded-full bg-[#1400FF]" />
                  )}
                </div>
                <input
                  type="radio"
                  className="sr-only"
                  value={opt.value}
                  checked={deadline === opt.value}
                  onChange={() => setDeadline(opt.value)}
                />
                <span className="text-sm text-[#080808]">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ошибка */}
        {error && (
          <p className="text-xs text-red-500 bg-red-50 px-4 py-2.5 border border-red-100">
            {error}
          </p>
        )}

        {/* Кнопка */}
        <button
          onClick={submit}
          disabled={status === 'loading'}
          className="w-full bg-[#1400FF] text-white font-garet font-bold text-[11px] tracking-[2.5px] uppercase px-6 py-4 hover:bg-[#0E00CC] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(20,0,255,0.25)] transition-all disabled:opacity-60 disabled:translate-y-0 disabled:shadow-none"
        >
          {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
        </button>

        <p className="text-[10px] text-[#999] text-center leading-relaxed">
          Нажимая «Отправить», вы соглашаетесь с{' '}
          <a href="/returns" className="text-[#1400FF] hover:underline">политикой обработки данных</a>
        </p>
      </div>
    </div>
  )
}
