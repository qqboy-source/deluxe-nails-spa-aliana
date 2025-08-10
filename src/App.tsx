import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { HorizontalScrollContainer, HorizontalScrollSection } from './components/HorizontalScrollContainer';

function App(): React.ReactNode {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <main>
        <Hero />
        
        <HorizontalScrollContainer>
            <HorizontalScrollSection id="about">
                <About />
            </HorizontalScrollSection>
            <HorizontalScrollSection id="services">
                <Services />
            </HorizontalScrollSection>
            <HorizontalScrollSection id="gallery">
                <Gallery />
            </HorizontalScrollSection>
        </HorizontalScrollContainer>

        {/* Vertical scrolling resumes here */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
