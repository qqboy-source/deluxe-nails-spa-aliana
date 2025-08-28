
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { HorizontalScrollContainer, HorizontalScrollSection } from './components/HorizontalScrollContainer';
import { FadeInSection } from './components/FadeInSection';


function App(): React.ReactNode {

  return (
    <div className="font-sans text-gray-800">
      <Header />
      <main>
        <Hero />
        
        <HorizontalScrollContainer>
            {/* Page 1: About */}
            <HorizontalScrollSection id="about">
                <FadeInSection variant="horizontal">
                    <About />
                </FadeInSection>
            </HorizontalScrollSection>
            
            {/* Page 2: Services */}
            <HorizontalScrollSection id="services">
                <FadeInSection variant="horizontal">
                    <Services />
                </FadeInSection>
            </HorizontalScrollSection>

            {/* Page 3: Gallery */}
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
    </div>
  );
}

export default App;
