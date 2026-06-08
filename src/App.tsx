import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import OurVision from './components/OurVision'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FadeInSection from './components/FadeInSection'
import { HorizontalScrollContainer, HorizontalScrollSection } from './components/HorizontalScroll'

export default function App() {
  useEffect(() => {
    const loader = document.getElementById('page-loader')
    if (loader) {
      loader.classList.add('fade-out')
      setTimeout(() => loader.remove(), 400)
    }
  }, [])

  return (
    <div className="font-sans text-gray-800">
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
