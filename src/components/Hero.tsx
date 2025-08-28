
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

export const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const [opacity, setOpacity] = useState(1);

    useLayoutEffect(() => {
        const setHeroHeight = () => {
            if (heroRef.current) {
                const headerHeight = 80; // Height of the sticky header
                heroRef.current.style.height = `${window.innerHeight - headerHeight}px`;
                // Announce that the layout has been updated. This is the key to fixing the race condition.
                window.dispatchEvent(new CustomEvent('layoutUpdated'));
            }
        };

        // We still use a timeout here to wait for the mobile browser UI to stabilize.
        // The crucial difference is that we now signal other components when we are done.
        const timeoutId = setTimeout(setHeroHeight, 150);

        window.addEventListener('resize', setHeroHeight);
        
        return () => {
            window.removeEventListener('resize', setHeroHeight);
            clearTimeout(timeoutId);
        };
    }, []);

    // This effect handles the fade-out on scroll for the hero text box
    useEffect(() => {
        const handleScroll = () => {
            const fadeOutDistance = 400;
            const newOpacity = Math.max(0, 1 - window.scrollY / fadeOutDistance);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <section ref={heroRef} id="home" className="relative min-h-[500px] flex items-center justify-center text-center text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('images/hero-background.jpg')" }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gold-900/40"></div>
            <div 
                className="relative z-10 p-8 max-w-3xl bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"
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
