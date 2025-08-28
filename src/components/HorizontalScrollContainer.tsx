
import React, { useRef, useLayoutEffect, Children, useState, cloneElement, isValidElement, ReactNode, useCallback } from 'react';
import { useHorizontalScroll } from '../contexts/HorizontalScrollContext';

interface HorizontalScrollSectionProps {
    children: React.ReactNode;
    id: string;
    isActive?: boolean;
}

/**
 * A single "page" or "section" within the horizontal scroll container.
 * It is a named export, which is what the build tool expects.
 */
export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children, id, isActive }) => {
    return (
        <section 
            id={id} 
            className="horizontal-scroll-section-item w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8"
            aria-hidden={!isActive} // Hide inactive sections from screen readers for better accessibility
        >
            <div className="w-full h-full max-w-7xl mx-auto flex flex-col rounded-xl">
                <div 
                    className={`w-full flex-grow pt-24 pb-12 px-2 md:px-4 hide-scrollbar overflow-y-auto overscroll-y-contain ${!isActive ? 'pointer-events-none' : ''}`}
                >
                     {children}
                </div>
            </div>
        </section>
    );
};

interface HorizontalScrollContainerProps {
    children: ReactNode;
}

/**
 * The main container that orchestrates the horizontal scrolling effect.
 * It is also a named export, resolving the build error.
 */
export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const stickyContentRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const numSections = Children.count(children);
    const { setScrollToSection } = useHorizontalScroll();

    const dimensionsRef = useRef({
        containerTop: 0,
        sectionWidth: 0,
        maxTranslateX: 0,
    });
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const scrollToSectionById = useCallback((id: string) => {
        const stickyContent = stickyContentRef.current;
        if (!stickyContent) return;
        
        const horizontalSections = Array.from(stickyContent.querySelectorAll<HTMLElement>('.horizontal-scroll-section-item'));
        const sectionIndex = horizontalSections.findIndex(section => section.id === id);

        if (sectionIndex !== -1) {
            const { containerTop, sectionWidth } = dimensionsRef.current;
            if (sectionWidth > 0) {
                const targetScrollY = containerTop + (sectionIndex * sectionWidth);
                window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
            }
        }
    }, []);

    useLayoutEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const stickyContent = stickyContentRef.current;
        if (!scrollContainer || !stickyContent || numSections === 0) return;

        // Register the centralized scroll function to the context
        setScrollToSection(() => scrollToSectionById);

        let animationFrameId: number | null = null;
        
        const calculateAndSetDimensions = () => {
            if (!scrollContainer || !stickyContent) return;
            
            const rect = scrollContainer.getBoundingClientRect();
            const sectionWidth = window.innerWidth;

            dimensionsRef.current.containerTop = rect.top + window.scrollY;
            dimensionsRef.current.sectionWidth = sectionWidth;
            dimensionsRef.current.maxTranslateX = (numSections - 1) * sectionWidth;
            
            const containerHeight = dimensionsRef.current.maxTranslateX + window.innerHeight;
            scrollContainer.style.height = `${containerHeight}px`;
            
            updateTransform();
        };

        const updateTransform = () => {
            if (!stickyContent) return;
            
            const { containerTop, maxTranslateX, sectionWidth } = dimensionsRef.current;
            const scrollTop = window.scrollY;
            
            let distance = Math.max(0, scrollTop - containerTop);
            distance = Math.min(distance, maxTranslateX);
            
            stickyContent.style.transform = `translateX(-${Math.round(distance)}px)`;
            
            const newActiveIndex = sectionWidth > 0 ? Math.min(numSections - 1, Math.round(distance / sectionWidth)) : 0;
            setActiveIndex(prevIndex => prevIndex !== newActiveIndex ? newActiveIndex : prevIndex);
        };
        
        const handleScroll = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(updateTransform);
        };
        
        calculateAndSetDimensions();
        
        const resizeObserver = new ResizeObserver(calculateAndSetDimensions);
        resizeObserver.observe(scrollContainer);

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [numSections, setScrollToSection, scrollToSectionById]);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchStartY.current = e.targetTouches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX.current;
        const deltaY = touchEndY - touchStartY.current;

        touchStartX.current = 0;
        touchStartY.current = 0;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            let targetIndex = activeIndex;
            if (deltaX < 0) { // Swipe Left
                targetIndex = Math.min(activeIndex + 1, numSections - 1);
            } else { // Swipe Right
                targetIndex = Math.max(activeIndex - 1, 0);
            }

            if (targetIndex !== activeIndex) {
                const { containerTop, sectionWidth } = dimensionsRef.current;
                if (sectionWidth > 0) {
                    const targetScrollY = containerTop + (targetIndex * sectionWidth);
                    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
                }
            }
        }
    };

    return (
        <div 
            ref={scrollContainerRef} 
            data-testid="horizontal-scroll-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <div ref={stickyContentRef} className="flex flex-nowrap h-full will-change-transform">
                    {Children.map(children, (child, index) => {
                        if (isValidElement(child)) {
                            return cloneElement(child as React.ReactElement<HorizontalScrollSectionProps>, { isActive: index === activeIndex });
                        }
                        return child;
                    })}
                </div>
            </div>
        </div>
    );
};
