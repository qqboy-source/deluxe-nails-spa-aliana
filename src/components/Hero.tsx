import React from 'react';

export const Hero: React.FC = () => {
    return (
        <section id="home" className="relative h-[calc(100vh-80px)] min-h-[500px] flex items-center justify-center text-center text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1600/1200?random=1')" }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gold-900/40"></div>
            <div className="relative z-10 p-8 max-w-3xl animate-fade-in-up bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wider leading-tight" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}}>
                    Elegance at Your Fingertips
                </h1>
                <p className="mt-4 text-lg md:text-xl font-sans font-light text-gold-100 max-w-xl mx-auto" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>
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