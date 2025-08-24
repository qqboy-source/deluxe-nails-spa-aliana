import React from 'react';
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

export const About: React.FC = () => {
    return (
        <>
            <div className="lg:text-center">
                <h2 className="text-base text-gold-700 font-semibold tracking-wide uppercase">About Us</h2>
                <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl text-shadow-subtle">
                    Your Sanctuary of Beauty & Relaxation
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto font-sans">
                    At Deluxe Nails & Spa Aliana, we believe that self-care is a priority, not a luxury. Our mission is to provide an unparalleled spa experience, where you can unwind, rejuvenate, and leave feeling more beautiful and confident than ever.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* On mobile, this text block will appear second (order-2). On desktop, it appears first (md:order-1). */}
                <div className="bg-black/25 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl h-full order-2 md:order-1">
                    <h3 className="text-2xl font-serif font-bold text-white">Our Core Values</h3>
                    <ul className="mt-6 space-y-5 font-sans text-gray-200">
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
                {/* On mobile, this media carousel will appear first (order-1). On desktop, it appears second (md:order-2). */}
                <div className="rounded-lg overflow-hidden shadow-xl bg-gold-100 min-h-[400px] order-1 md:order-2">
                    <MediaCarousel items={mediaItems} />
                </div>
            </div>
        </>
    );
};
