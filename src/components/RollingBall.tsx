import { useEffect, useRef } from 'react'

export default function RollingBall() {
  const ballRef = useRef<HTMLDivElement>(null)
  const rolling = useRef(false)
  const lastRoll = useRef(0)
  const lastZone = useRef(0)

  useEffect(() => {
    const spawnSparkle = (x: number, y: number) => {
      const el = document.createElement('div')
      el.className = 'cursor-sparkle'
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      const size = Math.random() * 5 + 3
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * 28 + 10
      el.style.setProperty('--tx', `${Math.cos(angle) * dist}px`)
      el.style.setProperty('--ty', `${Math.sin(angle) * dist - 15}px`)
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 750)
    }

    const roll = () => {
      const ball = ballRef.current
      if (!ball || rolling.current) return
      rolling.current = true
      ball.style.display = 'block'
      const duration = 2200
      const start = performance.now()
      const travel = window.innerWidth + 120
      let lastSparkle = 0

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        ball.style.transform = `translateX(${-60 + t * travel}px) rotate(${t * 1080}deg)`
        if (now - lastSparkle > 50) {
          lastSparkle = now
          const rect = ball.getBoundingClientRect()
          spawnSparkle(rect.left + rect.width / 2 - 16, rect.top + rect.height / 2)
        }
        if (t < 1) {
          requestAnimationFrame(step)
        } else {
          ball.style.display = 'none'
          rolling.current = false
        }
      }
      requestAnimationFrame(step)
    }

    // Roll when the user scrolls into a new quarter of the page, max once per 6s
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const zone = total > 0 ? Math.floor((window.scrollY / total) * 4) : 0
      if (zone !== lastZone.current) {
        lastZone.current = zone
        const now = Date.now()
        if (now - lastRoll.current > 6000) {
          lastRoll.current = now
          roll()
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ballRef}
      aria-hidden="true"
      style={{ display: 'none' }}
      className="fixed bottom-10 left-0 z-[9998] pointer-events-none select-none text-4xl"
    >
      ⚽
    </div>
  )
}
