
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
import { HorizontalScrollProvider } from './contexts/HorizontalScrollContext';

function App(): React.ReactNode {

  return (
    <HorizontalScrollProvider>
      <div className="font-sans text-gray-800">
        <Header />
        <main>
          <Hero />
          
          <HorizontalScrollContainer>
              <HorizontalScrollSection id="about">
                  <FadeInSection variant="horizontal">
                      <About />
                  </FadeInSection>
              </HorizontalScrollSection>
              <HorizontalScrollSection id="services">
                  <FadeInSection variant="horizontal">
                      <Services />
                  </FadeInSection>
              </HorizontalScrollSection>
              <HorizontalScrollSection id="gallery">
                  <FadeInSection variant="horizontal">
                      <Gallery />
                  </FadeInSection>
              </HorizontalScrollSection>
          </HorizontalScrollContainer>

          <FadeInSection>
            <Contact />
          </FadeInSection>
        </main>
        <Footer />
      </div>
    </HorizontalScrollProvider>
  );
}

export default App;
