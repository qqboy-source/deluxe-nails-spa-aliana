import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';

// A robust background image component with a fallback
const HeroBackgroundImage: React.FC = () => {
    const [hasError, setHasError] = useState(false);

    // INSTRUCTION: Please upload your main background image named 'hero-background.jpg' to the public/images folder on GitHub.
    // The "?v=2" is a "cache-busting" string. If you change the image again, update it to "?v=3"
    const imageUrl = 'images/hero-background.jpg?v=2';

    if (hasError) {
        // Fallback to a solid color if the image fails to load.
        return <div className="absolute top-0 left-0 w-full h-full bg-gold-900/80"></div>;
    }

    return (
        <img
            src={imageUrl}
            alt="Luxurious spa-themed background"
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={() => setHasError(true)}
        />
    );
};

export const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const [isTextVisible, setIsTextVisible] = useState(true);

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

    // This effect adds the scroll-based fade-in/out animation.
    useEffect(() => {
        const handleScroll = () => {
            // The text box will be visible only when the user is scrolled less than 100px from the top.
            const shouldBeVisible = window.scrollY < 100;
            setIsTextVisible(shouldBeVisible);
        };

        // Listen for scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Clean up the event listener when the component is removed
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // The empty array ensures this effect runs only once when the component mounts.


    return (
        <section ref={heroRef} id="home" className="relative min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
            <HeroBackgroundImage />
            <div className="absolute top-0 left-0 w-full h-full bg-gold-900/40"></div>
            <div 
                className={`relative z-10 p-8 max-w-3xl bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transition-all duration-500 ease-in-out ${
                    isTextVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
            >
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
