import { Logo } from './Logo'
import { Container } from './Container'

const QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Ft.me%2FHevialPrintBot&bgcolor=000000&color=ffffff&qzone=1&format=png'

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/[0.07] pt-10 pb-8">
      <Container>
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <div className="text-[13px] font-bold text-[#080808] mb-3.5">Наши соцсети</div>
            <a
              href="https://t.me/HevialPrintBot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 no-underline text-[#080808] text-[13px] font-medium transition-colors duration-[180ms] hover:text-[#1400FF]"
            >
              <div className="w-[34px] h-[34px] bg-[#1400FF] rounded-full flex items-center justify-center flex-shrink-0">
                <TelegramIcon />
              </div>
              @HevialPrintBot
            </a>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <a href="https://t.me/HevialPrintBot" target="_blank" rel="noopener noreferrer"
              className="block w-[76px] h-[76px] flex-shrink-0">
              <img src={QR_URL} alt="QR-код @HevialPrintBot" width={76} height={76} className="w-full h-full" loading="lazy" />
            </a>
            <div className="text-[8px] font-semibold tracking-[2px] text-[#666] uppercase">@HevialPrintBot</div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-5 border-t border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Logo size="sm" />
          <div className="flex items-center gap-5">
            <a
              href="/returns"
              className="text-[11px] text-[#666] no-underline transition-colors duration-150 hover:text-[#1400FF]"
            >
              Политика возврата
            </a>
            <a
              href="/Hevial_Oferta.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#666] no-underline transition-colors duration-150 hover:text-[#1400FF]"
            >
              Договор оферта
            </a>
            <a
              href="/privacy_policy_hevial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#666] no-underline transition-colors duration-150 hover:text-[#1400FF]"
            >
              Договор о политики обработки персональных данных
            </a>
            <div className="text-[11px] text-[#666]">© 2025 Hevial. Все права защищены.</div>
          </div>
        </div>
      </Container>
    </footer>
  )
}