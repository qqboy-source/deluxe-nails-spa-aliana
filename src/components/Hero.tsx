
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

export const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const [opacity, setOpacity] = useState(1);

    // This effect addresses the 100vh issue on mobile browsers where the
    // address bar's appearance/disappearance changes the viewport height.
    // By setting the height dynamically, we ensure the layout is stable.
    useLayoutEffect(() => {
        const setHeroHeight = () => {
            if (heroRef.current) {
                // 80px is the height of the sticky header.
                const headerHeight = 80; 
                heroRef.current.style.height = `${window.innerHeight - headerHeight}px`;
            }
        };

        setHeroHeight();
        // Recalculate after a short delay to account for mobile browser UI changes.
        const timeoutId = setTimeout(setHeroHeight, 100);

        window.addEventListener('resize', setHeroHeight);
        
        return () => {
            window.removeEventListener('resize', setHeroHeight);
            clearTimeout(timeoutId);
        };
    }, []);

    // This effect handles the fade-out on scroll for the hero text box
    useEffect(() => {
        const handleScroll = () => {
            // Define the distance over which the element should fade out
            const fadeOutDistance = 400;
            // Calculate the new opacity based on scroll position
            const newOpacity = Math.max(0, 1 - window.scrollY / fadeOutDistance);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <section ref={heroRef} id="home" className="relative min-h-[500px] flex items-center justify-center text-center text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('images/hero-background.jpg')" }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gold-900/40"></div>
            <div 
                className="relative z-10 p-8 max-w-3xl bg-black/40 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
                style={{ opacity: opacity, transition: 'opacity 0.1s linear', willChange: 'opacity' }}
            >
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wider leading-tight text-shadow-strong">
                    Elegance at Your Fingertips
                </h1>
                <p className="mt-4 text-lg md:text-xl font-sans font-light text-gold-100 max-w-xl mx-auto text-shadow-strong">
                    Experience tranquility and bespoke nail artistry at Deluxe Nails & Spa Aliana.
                </p>
                <div className="mt-8">
                    <a href="tel:2817620878" className="font-bold py-3 px-8 rounded-lg text-lg btn-golden-glow btn-fill-gold">
                        Book Your Escape
                    </a>
                </div>
            </div>
        </section>
    );
};
