import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import MagneticWrapper from './MagneticWrapper'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [opacity, setOpacity] = useState(1)

  useLayoutEffect(() => {
    const setHeroHeight = () => {
      if (heroRef.current) {
        heroRef.current.style.height = `${window.innerHeight - 80}px`
        window.dispatchEvent(new CustomEvent('layoutUpdated'))
      }
    }
    const timeoutId = setTimeout(setHeroHeight, 150)
    window.addEventListener('resize', setHeroHeight)
    return () => { window.removeEventListener('resize', setHeroHeight); clearTimeout(timeoutId) }
  }, [])

  useEffect(() => {
    const handleScroll = () => { setOpacity(Math.max(0, 1 - window.scrollY / 400)) }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Floating gold particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type Particle = { x: number; y: number; size: number; speed: number; opacity: number; color: string; drift: number }
    const palette = ['217,172,100', '228,193,134', '251,243,230', '198,147,74', '238,214,171']

    const make = (spread = false): Particle => ({
      x: Math.random() * canvas.width,
      y: spread ? Math.random() * canvas.height : canvas.height + Math.random() * 60,
      size: Math.random() * 2.2 + 0.4,
      speed: Math.random() * 0.55 + 0.15,
      opacity: Math.random() * 0.55 + 0.15,
      color: palette[Math.floor(Math.random() * palette.length)],
      drift: (Math.random() - 0.5) * 0.25,
    })

    const particles: Particle[] = Array.from({ length: 65 }, () => make(true))
    let animId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.y -= p.speed
        p.x += p.drift
        if (p.y < -8) Object.assign(p, make())
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${p.color})`
        ctx.fill()
        ctx.restore()
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section ref={heroRef} id="home" className="relative min-h-[500px] flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-background.jpg')" }} />
      <div className="absolute inset-0 bg-gold-900/40" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />
      <div
        className="relative z-10 p-8 max-w-3xl bg-black/20 rounded-2xl border border-white/20 shadow-xl liquid-glass-bg"
        style={{ opacity, transition: 'opacity 0.1s linear', willChange: 'opacity' }}
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-wider leading-tight text-shadow-strong shimmer-text">
          Elegance at Your Fingertips
        </h1>
        <p className="mt-4 text-lg md:text-xl font-sans font-light text-gold-100 max-w-xl mx-auto text-shadow-strong">
          Experience tranquility and bespoke nail artistry at Deluxe Nails & Spa Aliana.
        </p>
        <div className="mt-8">
          <MagneticWrapper>
            <a href="tel:2817620878" className="font-bold py-3 px-8 rounded-lg text-lg btn-golden-glow btn-fill-gold">
              Book Your Escape
            </a>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  )
}
