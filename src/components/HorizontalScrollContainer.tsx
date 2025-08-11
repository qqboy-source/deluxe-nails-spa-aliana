
import React, { useRef, useEffect, Children, useState, cloneElement, isValidElement, ReactNode } from 'react';

interface HorizontalScrollSectionProps {
    children: React.ReactNode;
    id: string;
    isActive?: boolean;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children, id, isActive }) => {
    return (
        <section id={id} className="w-screen h-screen flex-shrink-0 flex justify-center items-center p-4 sm:p-6 lg:p-8">
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
    sections: { id: string; component: JSX.Element }[];
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({ children, sections }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const stickyContentRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const numSections = sections.length;

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const stickyContent = stickyContentRef.current;
        if (!scrollContainer || !stickyContent || numSections === 0) return;

        let animationFrameId: number | null = null;

        const calculateDimensions = () => {
            const requiredHeight = (numSections * window.innerWidth) - window.innerWidth + window.innerHeight;
            scrollContainer.style.height = `${requiredHeight}px`;
        };

        const handleScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                if (!scrollContainer || !stickyContent) return;
                const scrollTop = window.scrollY;
                const scrollContainerTop = scrollContainer.offsetTop;
                const maxTranslateX = (numSections * window.innerWidth) - window.innerWidth;
                
                let distance = 0;
                if (scrollTop >= scrollContainerTop && scrollTop <= scrollContainerTop + maxTranslateX) {
                    distance = scrollTop - scrollContainerTop;
                } else if (scrollTop > scrollContainerTop + maxTranslateX) {
                    distance = maxTranslateX;
                }
                
                stickyContent.style.transform = `translateX(-${distance}px)`;
                
                const currentActiveIndex = Math.min(numSections - 1, Math.round(distance / window.innerWidth));
                if (currentActiveIndex !== activeIndex) {
                    setActiveIndex(currentActiveIndex);
                }
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
    }, [numSections, activeIndex]);

    return (
        <div ref={scrollContainerRef} data-testid="horizontal-scroll-container">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div ref={stickyContentRef} className="flex flex-nowrap h-full">
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
