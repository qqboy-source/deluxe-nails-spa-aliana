import React, { useRef, useEffect, Children } from 'react';

// A component to wrap each section that will be displayed horizontally
export const HorizontalScrollSection: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => {
    return (
        // This section defines one full-screen "slide" in the horizontal sequence.
        <section id={id} className="w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8">
            {/* This container has a max-width and fills the available height of the section. */}
            <div className="w-full h-full max-w-7xl mx-auto flex flex-col rounded-xl">
                {/*
                  This inner wrapper pushes content below the sticky header and enables vertical scrolling.
                  The 'can-scroll-on-stop' class prevents the user's scroll from being hijacked
                  by this element during the horizontal slide animation.
                */}
                <div className="w-full flex-grow overflow-y-auto hide-scrollbar pt-24 pb-12 px-2 md:px-4 can-scroll-on-stop">
                     {children}
                </div>
            </div>
        </section>
    );
};

export const HorizontalScrollContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const stickyContentRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number | null>(null);

    // Get the number of sections to accurately calculate dimensions
    const numSections = Children.count(children);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const stickyContent = stickyContentRef.current;
        if (!scrollContainer || !stickyContent || numSections === 0) return;

        let resizeTimeout: ReturnType<typeof setTimeout>;

        const calculateDimensionsAndPosition = () => {
            const viewWidth = window.innerWidth;
            
            // Calculate the total width of all horizontal sections.
            // This is more reliable than using scrollWidth which can be affected by layout timing.
            const totalWidth = numSections * viewWidth;
            
            // The required vertical height to scroll through the horizontal content.
            const requiredHeight = totalWidth - viewWidth + window.innerHeight;
            scrollContainer.style.height = `${requiredHeight}px`;

            // After setting height, trigger scroll handler to ensure correct initial position
            handleScroll();
        };

        const handleScroll = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }

            animationFrameId.current = requestAnimationFrame(() => {
                if (!scrollContainer || !stickyContent) return;
                const scrollTop = window.scrollY;
                const scrollContainerTop = scrollContainer.offsetTop;
                
                // The maximum distance the content can be translated horizontally.
                const maxTranslateX = (numSections * window.innerWidth) - window.innerWidth;
                
                // The vertical scroll position where the horizontal scrolling should end.
                const scrollEnd = scrollContainerTop + maxTranslateX;

                if (scrollTop >= scrollContainerTop && scrollTop <= scrollEnd) {
                    // While scrolling within the container, translate horizontally.
                    const distance = scrollTop - scrollContainerTop;
                    stickyContent.style.transform = `translateX(-${distance}px)`;
                } else if (scrollTop < scrollContainerTop) {
                    // Before the container, snap to the start.
                    stickyContent.style.transform = `translateX(0px)`;
                } else { // After the container (scrollTop > scrollEnd)
                    // Snap to the end to prevent it from moving while scrolling further down.
                    stickyContent.style.transform = `translateX(-${maxTranslateX}px)`;
                }
            });
        };

        const setup = () => {
            clearTimeout(resizeTimeout);
            // Debounce resize events
            resizeTimeout = setTimeout(calculateDimensionsAndPosition, 100);
        };
        
        window.addEventListener('resize', setup);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial setup. A timeout helps ensure the rest of the layout is stable.
        const initTimeout = setTimeout(setup, 100);

        return () => {
            clearTimeout(initTimeout);
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', setup);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [numSections]); // Re-run effect if the number of children changes.

    return (
        <div ref={scrollContainerRef} data-testid="horizontal-scroll-container">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div ref={stickyContentRef} className="flex flex-nowrap h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
