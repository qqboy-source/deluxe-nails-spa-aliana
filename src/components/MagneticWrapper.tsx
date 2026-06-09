import { useRef, ReactNode, useEffect } from 'react'

export default function MagneticWrapper({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const current = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const animId = useRef<number | null>(null)
  const hovered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.07)
      current.current.y = lerp(current.current.y, target.current.y, 0.07)
      el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`

      const settled =
        Math.abs(current.current.x - target.current.x) < 0.01 &&
        Math.abs(current.current.y - target.current.y) < 0.01

      if (!settled || hovered.current) {
        animId.current = requestAnimationFrame(tick)
      } else {
        el.style.transform = 'translate(0, 0)'
        animId.current = null
      }
    }

    const start = () => { if (!animId.current) animId.current = requestAnimationFrame(tick) }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      target.current.x = (e.clientX - rect.left - rect.width / 2) * strength
      target.current.y = (e.clientY - rect.top - rect.height / 2) * strength
      start()
    }

    const onMouseEnter = () => { hovered.current = true; start() }

    const onMouseLeave = () => {
      hovered.current = false
      target.current = { x: 0, y: 0 }
      start()
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
      if (animId.current) cancelAnimationFrame(animId.current)
    }
  }, [strength])

  return (
    <div ref={ref} style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}
