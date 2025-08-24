import React, { useRef, useEffect, Children, useState, cloneElement, isValidElement, ReactNode } from 'react';

interface HorizontalScrollSectionProps {
    children: React.ReactNode;
    id: string;
    isActive?: boolean;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children, id, isActive }) => {
    // This component is now much simpler.
    // The complex JS for scroll handling has been replaced with a single CSS utility class: `overscroll-y-contain`.
    // This provides a native scrolling experience on all devices while preventing "scroll chaining,"
    // which is what was causing the page to scroll horizontally when reaching the top/bottom of the content.
    return (
        <section id={id} className="horizontal-scroll-section-item w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8">
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

    const snapTimeoutRef = useRef<number | null>(null);
    const programmaticScrollRef = useRef(false);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const stickyContent = stickyContentRef.current;
        if (!scrollContainer || !stickyContent || numSections === 0) return;

        let animationFrameId: number | null = null;
        
        const dimensions = {
            containerTop: 0,
            sectionWidth: 0,
            maxTranslateX: 0,
        };

        const calculateAndSetDimensions = () => {
            if (!scrollContainer || !stickyContent) return;
            
            dimensions.containerTop = scrollContainer.getBoundingClientRect().top + window.scrollY;
            dimensions.sectionWidth = scrollContainer.clientWidth;
            dimensions.maxTranslateX = (numSections - 1) * dimensions.sectionWidth;
            
            const containerHeight = dimensions.maxTranslateX + window.innerHeight;
            scrollContainer.style.height = `${containerHeight}px`;
            
            updateTransform();
        };

        const updateTransform = () => {
            if (!stickyContent) return;
            
            const { containerTop, maxTranslateX, sectionWidth } = dimensions;
            const scrollTop = window.scrollY;
            
            let distance = Math.max(0, scrollTop - containerTop);
            distance = Math.min(distance, maxTranslateX);
            
            // Rounding the distance prevents sub-pixel rendering jitter/shaking on some browsers.
            stickyContent.style.transform = `translateX(-${Math.round(distance)}px)`;
            
            const newActiveIndex = sectionWidth > 0 ? Math.min(numSections - 1, Math.round(distance / sectionWidth)) : 0;
            setActiveIndex(newActiveIndex);
        };
        
        const handleScroll = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(updateTransform);

            if (programmaticScrollRef.current) return;

            if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);

            snapTimeoutRef.current = window.setTimeout(() => {
                const { containerTop, sectionWidth, maxTranslateX } = dimensions;
                if (sectionWidth === 0) return;

                const scrollTop = window.scrollY;
                if (scrollTop < containerTop || scrollTop > containerTop + maxTranslateX) {
                    return;
                }

                const distance = scrollTop - containerTop;
                const targetIndex = Math.round(distance / sectionWidth);
                const targetScrollY = containerTop + (targetIndex * sectionWidth);

                if (Math.abs(window.scrollY - targetScrollY) > 5) {
                    programmaticScrollRef.current = true;
                    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
                    
                    setTimeout(() => { programmaticScrollRef.current = false; }, 500);
                }
            }, 150);
        };
        
        calculateAndSetDimensions();
        
        window.addEventListener('resize', calculateAndSetDimensions);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('resize', calculateAndSetDimensions);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        };
    }, [numSections]);

    return (
        <div ref={scrollContainerRef} data-testid="horizontal-scroll-container">
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
