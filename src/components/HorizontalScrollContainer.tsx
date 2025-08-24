import React, { useRef, useEffect, Children, useState, cloneElement, isValidElement, ReactNode } from 'react';

interface HorizontalScrollSectionProps {
    children: React.ReactNode;
    id: string;
    isActive?: boolean;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children, id, isActive }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // This effect manually prevents scroll chaining. This is a robust solution to the problem
    // where scrolling vertically inside a section "leaks" out and triggers the horizontal
    // scroll of the main page, especially on mobile and trackpads where the CSS-only
    // `overscroll-behavior` can be unreliable in complex layouts involving transforms.
    useEffect(() => {
        const contentElement = contentRef.current;
        if (!contentElement) return;

        const handleWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = contentElement;

            // FIX: If content is not scrollable, do nothing and let the event bubble up.
            // A small tolerance is added for floating point inaccuracies.
            if (scrollHeight <= clientHeight + 2) {
                return;
            }

            // Let horizontal scrolls (like on a trackpad) pass through.
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                return;
            }
            
            const tolerance = 1; 
            const isAtTop = scrollTop <= tolerance;
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + tolerance;

            const isScrollingUp = e.deltaY < 0;
            const isScrollingDown = e.deltaY > 0;

            if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
                e.preventDefault();
            }
        };
        
        let lastTouchY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            lastTouchY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = contentElement;

            // FIX: If content is not scrollable, do nothing and let the event bubble up.
            if (scrollHeight <= clientHeight + 2) {
                return;
            }

            const tolerance = 1;
            const isAtTop = scrollTop <= tolerance;
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + tolerance;
            
            const currentY = e.touches[0].clientY;
            const isScrollingUp = currentY > lastTouchY;
            const isScrollingDown = currentY < lastTouchY;

            if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
                // At a boundary and trying to scroll past it, so prevent the page scroll.
                e.preventDefault();
            }
            lastTouchY = currentY;
        };

        // Add event listeners. `passive: false` is required for `preventDefault` to work.
        contentElement.addEventListener('wheel', handleWheel, { passive: false });
        contentElement.addEventListener('touchstart', handleTouchStart, { passive: true }); // Can be passive, just reading value.
        contentElement.addEventListener('touchmove', handleTouchMove, { passive: false }); // Must not be passive to prevent scroll.

        return () => {
            contentElement.removeEventListener('wheel', handleWheel);
            contentElement.removeEventListener('touchstart', handleTouchStart);
            contentElement.removeEventListener('touchmove', handleTouchMove);
        };
    }, []); // Run only once on mount.


    return (
        <section id={id} className="horizontal-scroll-section-item w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full h-full max-w-7xl mx-auto flex flex-col rounded-xl">
                <div 
                    ref={contentRef}
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

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const stickyContent = stickyContentRef.current;
        if (!scrollContainer || !stickyContent || numSections === 0) return;

        let animationFrameId: number | null = null;
        
        // Object to hold dimensions to avoid stale closures in event listeners
        const dimensions = {
            containerTop: 0,
            sectionWidth: 0,
            maxTranslateX: 0,
        };

        const calculateAndSetDimensions = () => {
            if (!scrollContainer || !stickyContent) return;
            
            dimensions.containerTop = scrollContainer.getBoundingClientRect().top + window.scrollY;
            dimensions.sectionWidth = scrollContainer.clientWidth; // Use clientWidth for the viewport width
            dimensions.maxTranslateX = (numSections - 1) * dimensions.sectionWidth;
            
            const containerHeight = dimensions.maxTranslateX + window.innerHeight;
            scrollContainer.style.height = `${containerHeight}px`;
            
            handleScroll(); // Recalculate scroll position immediately after resize
        };

        const handleScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                if (!stickyContent) return;
                
                const { containerTop, maxTranslateX, sectionWidth } = dimensions;
                const scrollTop = window.scrollY;
                
                let distance = Math.max(0, scrollTop - containerTop);
                distance = Math.min(distance, maxTranslateX);
                
                stickyContent.style.transform = `translateX(-${distance}px)`;
                
                const newActiveIndex = sectionWidth > 0 ? Math.min(numSections - 1, Math.round(distance / sectionWidth)) : 0;
                setActiveIndex(newActiveIndex);
            });
        };
        
        calculateAndSetDimensions();

        window.addEventListener('resize', calculateAndSetDimensions);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('resize', calculateAndSetDimensions);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
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
