import { useEffect, useState } from 'react'
import Header from './components/Header'
import CursorSparkle from './components/CursorSparkle'
import Hero from './components/Hero'
import About from './components/About'
import OurVision from './components/OurVision'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FadeInSection from './components/FadeInSection'
import WorldCupBanner from './components/WorldCupBanner'
import Confetti from './components/Confetti'
import RollingBall from './components/RollingBall'
import { HorizontalScrollContainer, HorizontalScrollSection } from './components/HorizontalScroll'

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const loader = document.getElementById('page-loader')
    if (loader) {
      loader.classList.add('fade-out')
      setTimeout(() => loader.remove(), 400)
    }
  }, [])

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      document.documentElement.classList.add('is-scrolling')
      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling')
      }, 1000)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  return (
    <div className="font-sans text-gray-800">
      <CursorSparkle />
      <Confetti />
      <RollingBall />
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] pointer-events-none"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #C6934A, #E4C186, #C6934A)',
          transition: 'width 0.1s linear',
        }}
      />
      <WorldCupBanner />
      <Header />
      <main>
        <Hero />
        <HorizontalScrollContainer>
          <HorizontalScrollSection id="about">
            <FadeInSection variant="horizontal"><About /></FadeInSection>
          </HorizontalScrollSection>
          <HorizontalScrollSection id="vision">
            <FadeInSection variant="horizontal"><OurVision /></FadeInSection>
          </HorizontalScrollSection>
          <HorizontalScrollSection id="services">
            <FadeInSection variant="horizontal"><Services /></FadeInSection>
          </HorizontalScrollSection>
          <HorizontalScrollSection id="gallery">
            <FadeInSection variant="horizontal"><Gallery /></FadeInSection>
          </HorizontalScrollSection>
        </HorizontalScrollContainer>
        <FadeInSection><Contact /></FadeInSection>
      </main>
      <Footer />
    </div>
  )
}
