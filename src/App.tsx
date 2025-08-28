
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About, OurStory } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { HorizontalScrollContainer, HorizontalScrollSection } from './components/HorizontalScrollContainer';
import { FadeInSection } from './components/FadeInSection';

// --- Start of Merged HorizontalScrollContext Logic ---

interface HorizontalScrollContextType {
  scrollToSection: (id: string) => void;
  setScrollToSection: (fn: (id: string) => void) => void;
}

const HorizontalScrollContext = createContext<HorizontalScrollContextType | undefined>(undefined);

const HorizontalScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scrollToSection, setScrollToSectionState] = useState<(id: string) => void>(() => () => console.warn("scrollToSection not implemented"));
  
  const setScrollToSection = (fn: (id: string) => void) => {
    setScrollToSectionState(() => fn);
  };

  const value = {
    scrollToSection,
    setScrollToSection,
  };

  return (
    <HorizontalScrollContext.Provider value={value}>
      {children}
    </HorizontalScrollContext.Provider>
  );
};

export const useHorizontalScroll = (): HorizontalScrollContextType => {
  const context = useContext(HorizontalScrollContext);
  if (context === undefined) {
    throw new Error('useHorizontalScroll must be used within a HorizontalScrollProvider');
  }
  return context;
};

// --- End of Merged HorizontalScrollContext Logic ---


function App(): React.ReactNode {

  return (
    <HorizontalScrollProvider>
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
              
              {/* Page 2: Our Values & Vision */}
              <HorizontalScrollSection id="our-values">
                  <FadeInSection variant="horizontal">
                      <OurStory />
                  </FadeInSection>
              </HorizontalScrollSection>

              {/* Page 3: Services */}
              <HorizontalScrollSection id="services">
                  <FadeInSection variant="horizontal">
                      <Services />
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
      </div>
    </HorizontalScrollProvider>
  );
}

export default App;
