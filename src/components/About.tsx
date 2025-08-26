import React from 'react';
import { MediaCarousel, MediaItem } from './MediaCarousel';

// INSTRUCTIONS: To add your own media, replace the placeholder URLs below with your file paths.
// For videos, make sure to change the 'type' from 'image' back to 'video' and place the video files in the `public/media` folder.
const mediaItems: MediaItem[] = [
    { type: 'image', src: 'https://placehold.co/800x450/9F763B/FBF3E6?text=Our+Ambiance', alt: 'Placeholder showing the relaxing ambiance of the spa.' },
    { type: 'image', src: 'https://placehold.co/800x450/c6934a/FBF3E6?text=Our+Salon', alt: 'A photo showcasing the elegant interior of Deluxe Nails & Spa Aliana.' },
    { type: 'image', src: 'https://placehold.co/800x450/78592C/FBF3E6?text=Craftsmanship', alt: 'Placeholder highlighting the details and decor of the spa.' },
];


/**
 * The introductory "About Us" page.
 */
export const About: React.FC = () => {
    
    const scrollToNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const horizontalContainer = document.querySelector<HTMLElement>('[data-testid="horizontal-scroll-container"]');
        if (!horizontalContainer) return;
        
        // The "our-values" section is the second one in the sequence, so its index is 1.
        const sectionIndex = 1;

        const containerTop = horizontalContainer.getBoundingClientRect().top + window.scrollY;
        const sectionWidth = horizontalContainer.clientWidth;
        const targetScrollY = containerTop + (sectionIndex * sectionWidth);
        
        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth',
        });
    };

    return (
        <div className="text-center flex flex-col items-center">
            <h2 className="text-base text-gold-700 font-semibold tracking-wide uppercase">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl text-shadow-subtle">
                Your Sanctuary of Beauty & Relaxation
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-700 mx-auto font-sans">
                At Deluxe Nails & Spa Aliana, we believe that self-care is a priority, not a luxury. Our mission is to provide an unparalleled spa experience, where you can unwind, rejuvenate, and leave feeling more beautiful and confident than ever.
            </p>
            <div className="mt-10">
                <button 
                    onClick={scrollToNext} 
                    className="font-sans font-semibold text-gold-800 hover:text-gold-900 transition-colors flex items-center group text-lg"
                    aria-label="Scroll to Our Values and Vision section"
                >
                    Our Values & Vision
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};


/**
 * The "Our Values & Vision" page, now featuring a media carousel.
 */
export const OurStory: React.FC = () => {
    return (
        <div className="grid grid-cols-1 gap-12 lg:w-2/5 lg:mx-auto">
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-xl border border-white/20">
                <MediaCarousel items={mediaItems} />
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
                 <h3 className="text-2xl font-serif font-bold text-gold-200 text-center">Our Values & Vision</h3>
                <ul className="mt-6 space-y-5 font-sans text-gray-200 text-base md:text-lg">
                    <li className="flex items-start">
                        <span className="text-gold-500 font-bold mr-3 mt-1">◆</span>
                        <span>An Aliana-based, women-owned and operated establishment catering to a diverse, international clientele.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gold-500 font-bold mr-3 mt-1">◆</span>
                        <span>Each reservation is customized to fit each individual’s personal experience.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gold-500 font-bold mr-3 mt-1">◆</span>
                        <span>Our skilled staff are always up-to-date with the latest trends and hygienic practices, while applying innovative design techniques.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gold-500 font-bold mr-3 mt-1">◆</span>
                        <span>To be an inspiration to our guests, operating with pride, integrity, and respect as an honest leader in the nail and spa industry.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-gold-500 font-bold mr-3 mt-1">◆</span>
                        <span>We strive to set the highest standards of beauty with our extraordinary products, exceptional service, and dedication to your well-being.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
