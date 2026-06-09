import { useEffect } from 'react'

export default function CursorSparkle() {
  useEffect(() => {
    let lastTime = 0

    const createSparkle = (x: number, y: number) => {
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

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < 45) return
      lastTime = now
      createSparkle(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return null
}
