import { useEffect, useRef } from 'react'

// Gold brand palette mixed with USA host-nation red/white/blue
const COLORS = ['#E4C186', '#C6934A', '#FBF3E6', '#B22234', '#3C3B6E', '#FFFFFF']

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type Piece = {
      x: number; y: number; vx: number; vy: number
      w: number; h: number; color: string
      rot: number; vr: number; life: number
    }
    let pieces: Piece[] = []
    let animId = 0
    let running = false

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces = pieces.filter(p => p.life > 0 && p.y < canvas.height + 20)
      for (const p of pieces) {
        p.vy += 0.12
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        p.life -= 1
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.min(1, p.life / 40)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      if (pieces.length > 0) {
        animId = requestAnimationFrame(animate)
      } else {
        running = false
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    const burst = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 7 + 2
        pieces.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          w: Math.random() * 6 + 4,
          h: Math.random() * 10 + 4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          life: 160,
        })
      }
      if (!running) {
        running = true
        animId = requestAnimationFrame(animate)
      }
    }

    // Welcome burst once the page loader has faded
    const loadTimer = setTimeout(() => {
      burst(window.innerWidth / 2, window.innerHeight * 0.3, 130)
    }, 800)

    // Repeat every 10s while the visitor is on the home (hero) section
    const repeatTimer = setInterval(() => {
      if (document.hidden) return
      if (window.scrollY < window.innerHeight * 0.8) {
        const x = window.innerWidth * (0.2 + Math.random() * 0.6)
        const y = window.innerHeight * (0.15 + Math.random() * 0.25)
        burst(x, y, 100)
      }
    }, 10000)

    // Goal-celebration burst on any "Book Your Escape" (tel:) link
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="tel:"]')
      if (target) burst(e.clientX, e.clientY, 80)
    }
    document.addEventListener('click', onClick)

    return () => {
      clearTimeout(loadTimer)
      clearInterval(repeatTimer)
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9997]" />
}
