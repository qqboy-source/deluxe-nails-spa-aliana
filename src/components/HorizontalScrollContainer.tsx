
import React, { useRef, useLayoutEffect, Children, useState, cloneElement, isValidElement, ReactNode } from 'react';

interface HorizontalScrollSectionProps {
    children: React.ReactNode;
    id: string;
    isActive?: boolean;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children, id, isActive }) => {
    return (
        <section 
            id={id} 
            className="horizontal-scroll-section-item w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8"
            aria-hidden={!isActive}
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

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const stickyContentRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const numSections = Children.count(children);
    
    // Use a ref to store dimensions to avoid re-running the effect unnecessarily.
    const dimensionsRef = useRef({
        containerTop: 0,
        sectionWidth: 0,
        maxTranslateX: 0,
    });

    // This effect is now robust, relying on events and observers instead of timers.
    useLayoutEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const stickyContent = stickyContentRef.current;
        if (!scrollContainer || !stickyContent || numSections === 0) return;

        let animationFrameId: number | null = null;
        
        const calculateAndSetDimensions = () => {
            if (!scrollContainer) return;
            
            const rect = scrollContainer.getBoundingClientRect();
            // Using the section's actual width is more reliable than window.innerWidth
            const firstSection = scrollContainer.querySelector<HTMLElement>('.horizontal-scroll-section-item');
            const sectionWidth = firstSection ? firstSection.getBoundingClientRect().width : window.innerWidth;

            dimensionsRef.current.containerTop = rect.top + window.scrollY;
            dimensionsRef.current.sectionWidth = sectionWidth;
            dimensionsRef.current.maxTranslateX = (numSections - 1) * sectionWidth;
            
            const containerHeight = dimensionsRef.current.maxTranslateX + window.innerHeight;
            scrollContainer.style.height = `${containerHeight}px`;
            
            // After calculating, immediately update the transform to reflect the current scroll position.
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
        
        // Listen for the custom event dispatched by Hero/Header when layout settles.
        window.addEventListener('layoutUpdated', calculateAndSetDimensions);
        
        // Observe the entire body. This is more reliable for catching layout shifts
        // caused by elements outside this component (like the Hero section).
        const resizeObserver = new ResizeObserver(calculateAndSetDimensions);
        resizeObserver.observe(document.body);

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Run an initial calculation on mount.
        calculateAndSetDimensions();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('layoutUpdated', calculateAndSetDimensions);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [numSections]);

    return (
        <div 
            ref={scrollContainerRef} 
            data-testid="horizontal-scroll-container"
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
