

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About, OurVision } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { HorizontalScrollContainer, HorizontalScrollSection } from './components/HorizontalScrollContainer';
import { FadeInSection } from './components/FadeInSection';
import { PromotionModal } from './components/PromotionModal';


function App(): React.ReactNode {
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);

  return (
    <div className="font-sans text-gray-800">
      <Header onPromotionClick={() => setIsPromotionModalOpen(true)} />
      <main>
        <Hero />
        
        <HorizontalScrollContainer>
            {/* Page 1: About */}
            <HorizontalScrollSection id="about">
                <FadeInSection variant="horizontal">
                    <About />
                </FadeInSection>
            </HorizontalScrollSection>
            
            {/* Page 2: Our Vision */}
            <HorizontalScrollSection id="vision">
                <FadeInSection variant="horizontal">
                    <OurVision />
                </FadeInSection>
            </HorizontalScrollSection>

            {/* Page 3: Services */}
            <HorizontalScrollSection id="services">
                <FadeInSection variant="horizontal">
                    <Services onPromotionClick={() => setIsPromotionModalOpen(true)} />
                </FadeInSection>
            </HorizontalScrollSection>

            {/* Page 4: Gallery */}
            <HorizontalScrollSection id="gallery">
                <FadeInSection variant="horizontal">
                    <Gallery />
                </FadeInSection>
            </HorizontalScrollSection>
        </HorizontalScrollContainer>

        {/* This section appears vertically after the horizontal scroll area */}
        <FadeInSection>
          <Contact />
        </FadeInSection>
      </main>
      <Footer />
      <PromotionModal isOpen={isPromotionModalOpen} onClose={() => setIsPromotionModalOpen(false)} />
    </div>
  );
}

export default App;
