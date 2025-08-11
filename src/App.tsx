
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
  const horizontalSections = [
    { id: 'about', component: <About /> },
    { id: 'services', component: <Services /> },
    { id: 'gallery', component: <Gallery /> },
  ];

  return (
    <div className="font-sans text-gray-800">
      <Header />
      <main>
        <Hero />
        
        <HorizontalScrollContainer sections={horizontalSections}>
          {horizontalSections.map(section => (
            <HorizontalScrollSection key={section.id} id={section.id}>
              <FadeInSection variant="horizontal">
                {section.component}
              </FadeInSection>
            </HorizontalScrollSection>
          ))}
        </HorizontalScrollContainer>

        <FadeInSection>
          <Contact />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  );
}

export default App;
