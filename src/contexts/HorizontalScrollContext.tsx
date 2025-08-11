
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface HorizontalScrollContextType {
  scrollToSection: (id: string) => void;
  setScrollToSection: (fn: (id: string) => void) => void;
  registerHorizontalSection: (id: string) => void;
  horizontalSectionIds: string[];
}

const HorizontalScrollContext = createContext<HorizontalScrollContextType | undefined>(undefined);

export const HorizontalScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scrollToSection, setScrollToSectionState] = useState<(id: string) => void>(() => () => console.warn("scrollToSection not implemented"));
  const [horizontalSectionIds, setHorizontalSectionIds] = useState<string[]>([]);
  
  const setScrollToSection = (fn: (id: string) => void) => {
    setScrollToSectionState(() => fn);
  };

  const registerHorizontalSection = (id: string) => {
    setHorizontalSectionIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const value = {
    scrollToSection,
    setScrollToSection,
    registerHorizontalSection,
    horizontalSectionIds,
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
