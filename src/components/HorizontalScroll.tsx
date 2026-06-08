import { useRef, useState, useLayoutEffect, ReactNode, Children, cloneElement, isValidElement } from 'react'

interface HorizontalScrollSectionProps {
  children: ReactNode
  id: string
  isActive?: boolean
}

export function HorizontalScrollSection({ children, id, isActive }: HorizontalScrollSectionProps) {
  return (
    <section
      id={id}
      className="horizontal-scroll-section-item w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8"
      aria-hidden={!isActive}
    >
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col rounded-xl">
        <div className={`w-full flex-grow pt-20 pb-8 px-2 md:px-4 hide-scrollbar overflow-y-auto lg:overflow-y-hidden ${!isActive ? 'pointer-events-none' : ''}`}>
          {children}
        </div>
      </div>
    </section>
  )
}

interface HorizontalScrollContainerProps {
  children: ReactNode
}

export function HorizontalScrollContainer({ children }: HorizontalScrollContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const stickyContentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const numSections = Children.count(children)
  const dimensionsRef = useRef({ containerTop: 0, sectionWidth: 0, maxTranslateX: 0 })

  useLayoutEffect(() => {
    const scrollContainer = scrollContainerRef.current
    const stickyContent = stickyContentRef.current
    if (!scrollContainer || !stickyContent || numSections === 0) return

    let animationFrameId: number | null = null

    const calculateAndSetDimensions = () => {
      if (!scrollContainer) return
      const rect = scrollContainer.getBoundingClientRect()
      const firstSection = scrollContainer.querySelector('.horizontal-scroll-section-item')
      const sectionWidth = firstSection ? firstSection.getBoundingClientRect().width : window.innerWidth
      dimensionsRef.current.containerTop = rect.top + window.scrollY
      dimensionsRef.current.sectionWidth = sectionWidth
      dimensionsRef.current.maxTranslateX = (numSections - 1) * sectionWidth
      const containerHeight = dimensionsRef.current.maxTranslateX + window.innerHeight
      requestAnimationFrame(() => {
        const currentHeight = parseFloat(scrollContainer.style.height) || 0
        if (Math.abs(currentHeight - containerHeight) > 1) scrollContainer.style.height = `${containerHeight}px`
      })
      updateTransform()
    }

    const updateTransform = () => {
      if (!stickyContent) return
      const { containerTop, maxTranslateX, sectionWidth } = dimensionsRef.current
      const scrollTop = window.scrollY
      let distance = Math.max(0, scrollTop - containerTop)
      distance = Math.min(distance, maxTranslateX)
      stickyContent.style.transform = `translateX(-${Math.round(distance)}px)`
      const newActiveIndex = sectionWidth > 0 ? Math.min(numSections - 1, Math.round(distance / sectionWidth)) : 0
      setActiveIndex(prevIndex => prevIndex !== newActiveIndex ? newActiveIndex : prevIndex)
    }

    const handleScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateTransform)
    }

    window.addEventListener('layoutUpdated', calculateAndSetDimensions)
    const resizeObserver = new ResizeObserver(calculateAndSetDimensions)
    resizeObserver.observe(document.body)
    window.addEventListener('scroll', handleScroll, { passive: true })
    calculateAndSetDimensions()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('layoutUpdated', calculateAndSetDimensions)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [numSections])

  return (
    <div ref={scrollContainerRef} data-testid="horizontal-scroll-container">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={stickyContentRef} className="flex flex-nowrap h-full will-change-transform">
          {Children.map(children, (child, index) => {
            if (isValidElement(child)) return cloneElement(child as React.ReactElement<{ isActive: boolean }>, { isActive: index === activeIndex })
            return child
          })}
        </div>
      </div>
    </div>
  )
}
