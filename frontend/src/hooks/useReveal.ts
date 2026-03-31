import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('vis')
            }, i * 90)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const reveals = el.querySelectorAll('.reveal')
    reveals.forEach((r) => observer.observe(r))

    return () => observer.disconnect()
  }, [])

  return ref
}
