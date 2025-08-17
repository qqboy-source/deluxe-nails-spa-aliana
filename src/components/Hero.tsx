
import React, { useRef, useLayoutEffect } from 'react';

export const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

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
        window.addEventListener('resize', setHeroHeight);
        return () => window.removeEventListener('resize', setHeroHeight);
    }, []);


    return (
        <section ref={heroRef} id="home" className="relative min-h-[500px] flex items-center justify-center text-center text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-background.jpg')" }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gold-900/40"></div>
            <div className="relative z-10 p-8 max-w-3xl animate-fade-in-up bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wider leading-tight text-shadow-strong">
                    Elegance at Your Fingertips
                </h1>
                <p className="mt-4 text-lg md:text-xl font-sans font-light text-gold-100 max-w-xl mx-auto text-shadow-strong">
                    Experience tranquility and bespoke nail artistry at Deluxe Nails & Spa Aliana.
                </p>
                <div className="mt-8">
                    <a href="tel:2817620878" className="text-gray-900 font-bold py-3 px-8 rounded-lg text-lg shadow-lg btn-charging">
                        Book Your Escape
                    </a>
                </div>
            </div>
        </section>
    );
};
