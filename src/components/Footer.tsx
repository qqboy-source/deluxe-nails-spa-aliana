
import React from 'react';
import { InstagramIcon, TikTokIcon } from './icons';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black/20 backdrop-blur-lg text-white border-t border-white/20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gold-300">Deluxe Nails & Spa Aliana</h3>
                        <p className="mt-2 text-white/90 font-sans text-sm">
                           10335 West Grand Pkwy S STE 120<br/>
                           Richmond, TX 77407
                        </p>
                    </div>
                     <div className="md:text-center">
                        <h3 className="text-xl font-serif font-semibold text-gold-300">Amenities & Information</h3>
                        <p className="mt-4 text-white/90 font-sans text-sm uppercase">
                           Complimentary refreshments & cocktails are provided
                        </p>
                         <p className="mt-3 text-white/80 font-sans text-xs tracking-wider uppercase">
                           RSVP  |  WALK-IN WELCOME  |  GIFT CARDS AVAILABLE  |  EVENT HOSTING
                        </p>
                    </div>
                    <div className="md:text-right">
                        <h3 className="text-xl font-serif font-semibold text-gold-300">Follow Us</h3>
                        <div className="mt-4 flex justify-center md:justify-end space-x-6">
                            <a href="https://www.instagram.com/deluxenails_alianatx/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-300 transition-colors transform hover:scale-110">
                                <span className="sr-only">Instagram</span>
                                <InstagramIcon className="w-7 h-7" />
                            </a>
                             <a href="https://www.tiktok.com/@deluxenailsspaaliana?" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-300 transition-colors transform hover:scale-110">
                                <span className="sr-only">TikTok</span>
                                <TikTokIcon className="w-7 h-7" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-white/70 text-sm font-sans">
                    <p>&copy; {new Date().getFullYear()} Deluxe Nails & Spa Aliana. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};
