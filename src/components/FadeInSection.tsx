import React, { useState, useRef, useEffect } from 'react';

interface FadeInSectionProps {
    children: React.ReactNode;
    variant?: 'vertical' | 'horizontal';
}

export const FadeInSection = ({ children, variant = 'vertical' }: FadeInSectionProps): React.ReactElement => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            threshold: 0.1, // Start animation when 10% is visible
            rootMargin: variant === 'horizontal'
                // For horizontal items, shrink the viewport horizontally.
                // This means the item must be closer to the center to trigger.
                ? '0px -33% 0px -33%'
                // For vertical items, shrink from the bottom so it triggers as it scrolls up.
                : '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                  setVisible(true);
                  observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [variant]);

    return (
        <div
            ref={domRef}
            className={`fade-in-on-scroll ${isVisible ? 'is-visible' : ''}`}
        >
            {children}
        </div>
    );
};
