import React from 'react';

export const About: React.FC = () => {
    return (
        <>
            <div className="lg:text-center">
                <h2 className="text-base text-gold-700 font-semibold tracking-wide uppercase">About Us</h2>
                <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl"  style={{textShadow: '1px 1px 2px rgba(0,0,0,0.1)'}}>
                    Your Sanctuary of Beauty & Relaxation
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto font-sans">
                    At Deluxe Nails & Spa Aliana, we believe that self-care is a priority, not a luxury. Our mission is to provide an unparalleled spa experience, where you can unwind, rejuvenate, and leave feeling more beautiful and confident than ever.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-black/25 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl h-full">
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
                <div className="rounded-lg overflow-hidden">
                    <img className="w-full h-full object-cover rounded-lg" src="https://picsum.photos/600/400?random=2" alt="Interior of the nail spa" />
                </div>
            </div>
        </>
    );
};