
import React, { useState, useRef, useEffect } from 'react';

interface FadeInSectionProps {
    children: React.ReactNode;
    variant?: 'vertical' | 'horizontal';
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children, variant = 'vertical' }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            threshold: 0.1,
            rootMargin: variant === 'horizontal'
                ? '0px -25% 0px -25%' // Trigger when closer to the center for horizontal items
                : '0px 0px -10% 0px'   // Trigger as it scrolls up from the bottom for vertical items
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // This line is the key change. It sets visibility based on whether
                // the element is currently intersecting with the viewport.
                setVisible(entry.isIntersecting);
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
        <div ref={domRef} className={`fade-in-on-scroll ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </div>
    );
};
