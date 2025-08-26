import React, { useRef, useEffect, Children, useState, cloneElement, isValidElement, ReactNode } from 'react';

interface HorizontalScrollSectionProps {
    children: React.ReactNode;
    id: string;
    isActive?: boolean;
}

// Replaced `hide-scrollbar` with `custom-scrollbar` to make it visually clear to users
// when a section has more content to scroll through.
export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children, id, isActive }) => {
    return (
        <section id={id} className="horizontal-scroll-section-item w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full h-full max-w-7xl mx-auto flex flex-col rounded-xl">
                <div 
                    className={`w-full flex-grow pt-24 pb-12 px-2 md:px-4 custom-scrollbar overflow-y-auto overscroll-y-contain ${!isActive ? 'pointer-events-none' : ''}`}
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

// Removed all "snap-to-page" logic. The horizontal scrolling is now directly and smoothly
// tied 1:1 with the browser's vertical scrollbar for a more predictable and fluid experience.
export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const stickyContentRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const numSections = Children.count(children);

    const dimensionsRef = useRef({
        containerTop: 0,
        sectionWidth: 0,
        maxTranslateX: 0,
    });
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const stickyContent = stickyContentRef.current;
        if (!scrollContainer || !stickyContent || numSections === 0) return;

        let animationFrameId: number | null = null;
        
        const calculateAndSetDimensions = () => {
            if (!scrollContainer || !stickyContent) return;
            
            dimensionsRef.current.containerTop = scrollContainer.getBoundingClientRect().top + window.scrollY;
            dimensionsRef.current.sectionWidth = scrollContainer.clientWidth;
            dimensionsRef.current.maxTranslateX = (numSections - 1) * dimensionsRef.current.sectionWidth;
            
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
            setActiveIndex(newActiveIndex);
        };
        
        const handleScroll = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(updateTransform);
        };
        
        calculateAndSetDimensions();
        
        window.addEventListener('resize', calculateAndSetDimensions);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('resize', calculateAndSetDimensions);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [numSections]);

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

    return (a
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
