import React, { useRef, useEffect, Children, useState, cloneElement, isValidElement, ReactNode } from 'react';

interface HorizontalScrollSectionProps {
    children: React.ReactNode;
    id: string;
    isActive?: boolean;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children, id, isActive }) => {
    return (
        <section id={id} className="horizontal-scroll-section-item w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full h-full max-w-7xl mx-auto flex flex-col rounded-xl">
                <div className={`w-full flex-grow pt-24 pb-12 px-2 md:px-4 hide-scrollbar overflow-y-auto ${!isActive ? 'pointer-events-none' : ''}`}>
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
        let containerTop = 0;
        let sectionWidth = 0;
        let containerHeight = 0;
        let maxTranslateX = 0;

        const calculateDimensions = () => {
            if (!stickyContent || !scrollContainer) return;
            const firstSection = stickyContent.querySelector<HTMLElement>('.horizontal-scroll-section-item');
            if (!firstSection) return;
            
            // Use getBoundingClientRect for consistent and reliable measurements.
            containerTop = scrollContainer.getBoundingClientRect().top + window.scrollY;
            sectionWidth = firstSection.getBoundingClientRect().width;
            containerHeight = (numSections - 1) * sectionWidth + window.innerHeight;
            maxTranslateX = (numSections - 1) * sectionWidth;
            
            scrollContainer.style.height = `${containerHeight}px`;
        };

        const handleScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                if (!stickyContent) return;
                
                const scrollTop = window.scrollY;
                
                let distance = 0;
                if (scrollTop >= containerTop && scrollTop <= containerTop + maxTranslateX) {
                    distance = scrollTop - containerTop;
                } else if (scrollTop > containerTop + maxTranslateX) {
                    distance = maxTranslateX;
                }
                
                stickyContent.style.transform = `translateX(-${distance}px)`;
                
                const newActiveIndex = sectionWidth > 0 ? Math.min(numSections - 1, Math.round(distance / sectionWidth)) : 0;
                setActiveIndex(newActiveIndex);
            });
        };
        
        calculateDimensions();
        handleScroll(); // Initial position check

        window.addEventListener('resize', calculateDimensions);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('resize', calculateDimensions);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [numSections]); // Effect now only re-runs if the number of sections changes.

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
