import React, { useState } from 'react';
import { MediaCarousel, MediaItem } from './MediaCarousel';
import { ArrowDownIcon, ArrowUpIcon } from './icons';

// INSTRUCTIONS: To add your own media, place your files in the public folder and update the paths below.
// - Images go in `public/images`
// - Videos go in `public/media`
// The paths below have been updated to match your files.
const mediaItems: MediaItem[] = [
    { type: 'video', src: 'media/store-video-1.mp4', alt: 'A promotional video of the spa experience.' },
    { type: 'image', src: 'images/spa-interior.jpg', alt: 'A photo showcasing the elegant interior of Deluxe Nails & Spa Aliana.' },
    { type: 'video', src: 'media/store-video-2.mp4', alt: 'Another view of the beautiful and relaxing spa ambiance.' },
];

const coreValues = [
    "An Aliana-based, women-owned and operated establishment catering to a diverse, international clientele.",
    "Each reservation is customized to fit each individual’s personal experience.",
    "Our skilled staff are always up-to-date with the latest trends and hygienic practices, while applying innovative design techniques.",
    "To be an inspiration to our guests, operating with pride, integrity, and respect as an honest leader in the nail and spa industry.",
    "We strive to set the highest standards of beauty with our extraordinary products, exceptional service, and dedication to your well-being."
];


/**
 * The introductory "About Us" page.
 */
export const About: React.FC = () => {
    return (
        <div className="text-center flex flex-col items-center">
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
 * The "Our Values & Vision" page, now featuring a media carousel and collapsible text.
 */
export const OurStory: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="grid grid-cols-1 gap-8 lg:w-[47%] lg:mx-auto">
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/20 shadow-xl">
                 <h3 className="text-2xl font-serif font-bold text-gold-200 text-center">Our Values & Vision</h3>
                
                {/* Collapsible section for ALL items */}
                <div className={`grid transition-all duration-500 ease-in-out mt-6 ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <ul className="space-y-5 font-sans text-gray-200 text-sm md:text-base">
                            {coreValues.map((value, index) => (
                                 <li key={index} className="flex items-start">
                                    <span className="text-gold-500 font-bold mr-3 mt-1">◆</span>
                                    <span>{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {/* Show More/Less Button */}
                <div className="mt-6 text-center">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)} 
                        className="flex items-center mx-auto font-semibold text-gold-300 hover:text-gold-100 transition-colors"
                        aria-expanded={isExpanded}
                    >
                        <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                        {isExpanded 
                            ? <ArrowUpIcon className="w-5 h-5 ml-2" /> 
                            : <ArrowDownIcon className="w-5 h-5 ml-2" />
                        }
                    </button>
                </div>
            </div>

            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-white/20">
                <MediaCarousel items={mediaItems} />
            </div>
        </div>
    );
};
