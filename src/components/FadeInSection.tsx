import { useState, useRef, useEffect, ReactNode } from 'react'

interface FadeInSectionProps {
  children: ReactNode
  variant?: 'vertical' | 'horizontal'
}

export default function FadeInSection({ children, variant = 'vertical' }: FadeInSectionProps) {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: variant === 'horizontal' ? '0px -25% 0px -25%' : '0px 0px -10% 0px',
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { setVisible(entry.isIntersecting) })
    }, observerOptions)
    const currentRef = domRef.current
    if (currentRef) observer.observe(currentRef)
    return () => { if (currentRef) observer.unobserve(currentRef) }
  }, [variant])

  return (
    <div ref={domRef} className={`fade-in-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  )
}
