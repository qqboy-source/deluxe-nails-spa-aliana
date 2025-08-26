import React from 'react';
import { MediaCarousel, MediaItem } from './MediaCarousel';

// INSTRUCTIONS FOR YOUR MEDIA:
// 1. Create a new folder named `media` inside your `public` folder on GitHub.
// 2. Upload your two videos to this new `public/media` folder.
// 3. Upload your photo to the `public/images` folder (as you've done before).
// 4. The `src` paths below are already set up to find these files. You don't need to change them.
const mediaItems: MediaItem[] = [
    { type: 'video', src: 'media/ambience-video-1.mp4', alt: 'First video showing the relaxing ambiance of the spa.' },
    { type: 'image', src: 'images/our-story-photo.jpg', alt: 'A photo showcasing the elegant interior of Deluxe Nails & Spa Aliana.' },
    { type: 'video', src: 'media/ambience-video-2.mp4', alt: 'Second video highlighting the details and decor of the spa.' },
];

/**
 * The introductory "About Us" page.
 */
export const About: React.FC = () => {
    return (
        <div className="text-center">
            <h2 className="text-base text-gold-700 font-semibold tracking-wide uppercase">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl text-shadow-subtle">
                Your Sanctuary of Beauty & Relaxation
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-700 mx-auto font-sans">
                At Deluxe Nails & Spa Aliana, we believe that self-care is a priority, not a luxury. Our mission is to provide an unparalleled spa experience, where you can unwind, rejuvenate, and leave feeling more beautiful and confident than ever.
            </p>
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
