import React, { useState, useRef, useEffect } from 'react';

interface FadeInSectionProps {
    children: React.ReactNode;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Toggle visibility based on whether the element is intersecting with the viewport
                if (entry.isIntersecting) {
                  setVisible(true);
                  observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 }); // Trigger when 15% of the element is visible

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`fade-in-on-scroll ${isVisible ? 'is-visible' : ''}`}
        >
            {children}
        </div>
    );
};
