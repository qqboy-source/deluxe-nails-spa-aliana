import React, { useState } from 'react';
import { MediaCarousel, MediaItem } from './MediaCarousel';

// INSTRUCTIONS FOR YOUR MEDIA:
// 1. Create a new folder named `media` inside your `public` folder on GitHub.
// 2. Upload your two videos to this new `public/media` folder.
// 3. Upload your photo to the `public/images` folder (as you've done before).
// 4. The `src` paths below are already set up to find these files. You don't need to change them.
const mediaItems: MediaItem[] = [
    {
        type: 'video',
        src: 'media/store-video-1.mp4',
        alt: 'A video showcasing the spa interior and ambiance.',
    },
    {
        type: 'image',
        src: 'images/spa-interior.jpg',
        alt: 'A beautiful photo of the Deluxe Nails & Spa Aliana interior.',
    },
    {
        type: 'video',
        src: 'media/store-video-2.mp4',
        alt: 'A close-up video of a nail artist at work.',
    },
];

// This is the new component for the second page (Core Values & Media)
export const OurStory: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                <div className="bg-black/25 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl order-2 lg:order-1 lg:col-span-3">
                    <h2 className="text-base text-gold-400 font-semibold tracking-wide uppercase">Our Commitment</h2>
                    <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-white sm:text-4xl">
                        Our Values & Vision
                    </p>
                    <p className="mt-4 max-w-2xl text-lg text-gray-300 font-sans">
                        We are dedicated to excellence, integrity, and the well-being of our clients. Discover the principles that guide our craft and our commitment to you.
                    </p>
                    
                    <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                        <ul className="space-y-5 font-sans text-gray-200">
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

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-6 text-gold-400 font-semibold hover:text-gold-300 transition-colors"
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                </div>
                <div className="w-full aspect-video md:aspect-[4/3] lg:aspect-[4/5] rounded-lg overflow-hidden shadow-xl bg-gold-100 order-1 lg:order-2 lg:col-span-2">
                    <MediaCarousel items={mediaItems} />
                </div>
            </div>
        </>
    );
};


// This is the simplified original component for the first page
export const About: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="lg:text-center max-w-3xl">
                <h2 className="text-base text-gold-700 font-semibold tracking-wide uppercase">About Us</h2>
                <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl text-shadow-subtle">
                    Your Sanctuary of Beauty & Relaxation
                </p>
                <p className="mt-4 max-w-2xl text-xl md:text-2xl text-gray-700 lg:mx-auto font-sans">
                    At Deluxe Nails & Spa Aliana, we believe that self-care is a priority, not a luxury. Our mission is to provide an unparalleled spa experience, where you can unwind, rejuvenate, and leave feeling more beautiful and confident than ever.
                </p>
            </div>
        </div>
    );
};
