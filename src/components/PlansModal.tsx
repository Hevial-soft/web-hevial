import { useEffect } from 'react'

interface PlansModalProps {
  open: boolean
  onClose: () => void
  onSelect: (level: 'base' | 'pro') => void
}

export function PlansModal({ open, onClose, onSelect }: PlansModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#F4F5F9] max-w-[700px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-7 border-b border-black/[0.07]">
          <div>
            <div className="font-garet text-lg font-extrabold text-[#080808] tracking-tight">
              Выберите тариф
            </div>
            <div className="text-xs text-[#666] mt-1">
              Оплата через ЮКасса · отменить в любой момент
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-[#080808] transition-colors text-xl font-light"
          >
            ×
          </button>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 sm:p-7">
          {/* Base */}
          <div className="bg-white border-[1.5px] border-black/[0.08] p-7 relative transition-colors hover:border-[#1400FF] cursor-pointer group">
            <div className="text-[9px] font-bold tracking-[4px] uppercase text-[#666] mb-2">
              Уровень 1
            </div>
            <div className="font-garet text-[18px] font-extrabold text-[#080808] mb-1 tracking-tight">
              Базовый
            </div>
            <div className="font-garet text-[28px] font-extrabold text-[#1400FF] mb-1 tracking-[-1px]">
              3 500 ₽
            </div>
            <div className="text-[11px] text-[#666] mb-5">
              в месяц · отменить в любой момент
            </div>
            <ul className="flex flex-col gap-2 mb-6">
              {[
                'Скидка 10% на все заказы',
                'История заказов без ограничений',
                'Ответ на заявку за 4 часа',
                'Повторный заказ в 1 клик',
              ].map((f) => (
                <li key={f} className="text-xs text-[#080808] flex items-start gap-2 leading-relaxed">
                  <span className="text-[#1400FF] font-extrabold flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
              {['Подбор оборудования', 'Настройки печати'].map((f) => (
                <li key={f} className="text-xs text-[#666] flex items-start gap-2 leading-relaxed">
                  <span className="text-black/20 font-extrabold flex-shrink-0">—</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelect('base')}
              className="w-full font-garet text-[10px] font-bold tracking-[2px] uppercase py-3.5 bg-[#1400FF] text-white border-none cursor-pointer transition-colors duration-200 hover:bg-[#0E00CC]"
            >
              Выбрать
            </button>
          </div>

          {/* Pro */}
          <div className="bg-white border-[1.5px] border-black/[0.08] p-7 relative transition-colors hover:border-[#1400FF] cursor-pointer group">
            <div className="absolute top-[-1px] right-5 bg-[#1400FF] text-white text-[8px] font-bold tracking-[2px] uppercase px-2.5 py-1">
              Популярный
            </div>
            <div className="text-[9px] font-bold tracking-[4px] uppercase text-[#666] mb-2">
              Уровень 2
            </div>
            <div className="font-garet text-[18px] font-extrabold text-[#080808] mb-1 tracking-tight">
              Приоритетный
            </div>
            <div className="font-garet text-[28px] font-extrabold text-[#1400FF] mb-1 tracking-[-1px]">
              7 000 ₽
            </div>
            <div className="text-[11px] text-[#666] mb-5">
              в месяц · фиксированные цены
            </div>
            <ul className="flex flex-col gap-2 mb-6">
              {[
                'Скидка 15% на все заказы',
                'Ответ на заявку за 2 часа',
                'Приоритет в очереди печати',
                'Повторный заказ в 1 клик',
                'ИИ-подбор оборудования',
                'Рекомендации по настройкам',
              ].map((f) => (
                <li key={f} className="text-xs text-[#080808] flex items-start gap-2 leading-relaxed">
                  <span className="text-[#1400FF] font-extrabold flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelect('pro')}
              className="w-full font-garet text-[10px] font-bold tracking-[2px] uppercase py-3.5 bg-[#1400FF] text-white border-none cursor-pointer transition-colors duration-200 hover:bg-[#0E00CC]"
            >
              Выбрать
            </button>
          </div>
        </div>

        <div className="px-5 sm:px-7 pb-5 sm:pb-7 text-[11px] text-[#666] leading-relaxed">
          Оплата через ЮКасса. Отменить подписку можно в любой момент. При отмене доступ сохраняется до конца оплаченного периода.
        </div>
      </div>
    </div>
  )
}
