import { useState, useRef, useEffect, useCallback } from 'react'
import { LeftArrowIcon, RightArrowIcon } from '../icons'
import type { MediaItem } from '../data/content'

interface MediaCarouselProps {
  items: MediaItem[]
}

export default function MediaCarousel({ items }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => { setIsInitiallyVisible(false) }, 7000)
    return () => clearTimeout(timer)
  }, [])

  const goToNext = useCallback(() => {
    if (isTransitioning || items.length <= 1) return
    setIsTransitioning(true)
    setCurrentIndex(prev => (prev + 1) % items.length)
  }, [isTransitioning, items.length])

  useEffect(() => {
    if (isHovered) return
    const currentItem = items[currentIndex]
    let timerId: ReturnType<typeof setTimeout>
    if (currentItem.type === 'image') {
      timerId = setTimeout(goToNext, 5000)
    }
    return () => { if (timerId) clearTimeout(timerId) }
  }, [currentIndex, isHovered, items, goToNext])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    })
  }, [currentIndex])

  const goToPrevious = () => {
    if (isTransitioning || items.length <= 1) return
    setIsTransitioning(true)
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX }
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX }
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) goToNext()
    else if (touchStartX.current - touchEndX.current < -75) goToPrevious()
    touchStartX.current = 0
    touchEndX.current = 0
  }

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-full overflow-hidden rounded-lg group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={() => setIsTransitioning(false)}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative bg-black">
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = 'https://placehold.co/600x400/9F763B/FBF3E6?text=Image+Not+Found'
                }}
              />
            ) : (
              <video
                ref={el => { videoRefs.current[index] = el }}
                src={item.src}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                onEnded={goToNext}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevious}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full group-hover:opacity-100 transition-opacity duration-500 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-gold-400 ${isInitiallyVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Previous slide"
      >
        <LeftArrowIcon className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full group-hover:opacity-100 transition-opacity duration-500 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-gold-400 ${isInitiallyVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Next slide"
      >
        <RightArrowIcon className="w-6 h-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
