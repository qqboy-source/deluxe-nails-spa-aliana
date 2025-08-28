
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
    const [modalContainer, setModalContainer] = useState<Element | null>(null);

    useEffect(() => {
        setModalContainer(document.getElementById('modal-root'));
    }, []);
    
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        if (isPromotionModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalOverflow;
        }
        return () => { document.body.style.overflow = originalOverflow; };
    }, [isPromotionModalOpen]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Our Values', href: '#our-values' },
        { name: 'Services', href: '#services' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Promotion', href: '#promotion' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault();
        
        if (href === '#promotion') {
            setIsPromotionModalOpen(true);
            if (isOpen) setIsOpen(false); // Close mobile menu if open
            return;
        }

        if (isOpen) {
            setIsOpen(false);
        }

        const targetId = href.substring(1);

        if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const horizontalContainer = document.querySelector<HTMLElement>('[data-testid="horizontal-scroll-container"]');
        if (!horizontalContainer) return;

        const horizontalSections = Array.from(horizontalContainer.querySelectorAll<HTMLElement>('.horizontal-scroll-section-item'));
        const sectionIndex = horizontalSections.findIndex(section => section.id === targetId);

        if (sectionIndex !== -1) {
            // It's a horizontal section.
            const rect = horizontalContainer.getBoundingClientRect();
            const containerTop = rect.top + window.scrollY;
            // Using window.innerWidth provides a consistent, reliable source of truth
            // for the viewport width, matching the w-screen utility and fixing mobile discrepancies.
            const sectionWidth = window.innerWidth;
            const targetScrollY = containerTop + (sectionIndex * sectionWidth);
            
            window.scrollTo({
                top: targetScrollY,
                behavior: 'smooth',
            });
        } else {
            // It's a vertical section (e.g., Contact).
            const targetElement = document.getElementById(targetId);
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 80;

            if (targetElement) {
                const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementTop - headerHeight,
                    behavior: 'smooth',
                });
            }
        }
    };

    const promotionModal = (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex justify-center items-center animate-fade-in p-4" 
            onClick={() => setIsPromotionModalOpen(false)}
            role="dialog" aria-modal="true" aria-labelledby="promotion-modal-title"
        >
            <button
                onClick={() => setIsPromotionModalOpen(false)}
                className="absolute top-4 right-4 text-white text-5xl font-light leading-none z-[210] hover:text-gold-300 transition-colors"
                aria-label="Close promotion view"
            >&times;</button>
            <div className="relative animate-scale-in z-[205]" onClick={e => e.stopPropagation()}>
                <h2 id="promotion-modal-title" className="sr-only">Current Promotion</h2>
                <img
                    src="images/promotion.jpg"
                    alt="Current promotion flyer. To update, replace the image in the public/images folder."
                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
            </div>
        </div>
    );

    return (
        <>
            <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex-shrink-0">
                            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl md:text-3xl font-serif font-bold text-gold-800">
                                Deluxe Nails & Spa Aliana
                            </a>
                        </div>
                        <nav className="hidden md:flex items-center">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map(link => (
                                    <a 
                                        key={link.name} 
                                        href={link.href} 
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="text-gray-800 hover:text-gold-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <a href="tel:2817620878" className="ml-4 font-semibold px-4 py-2 rounded-md text-sm btn-golden-glow btn-fill-gold">
                                    Book Your Escape
                                </a>
                            </div>
                        </nav>
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gold-800 hover:text-gold-600 focus:outline-none" aria-label="Toggle menu">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* 
                  FIX: The mobile dropdown now correctly inherits the glass effect from the parent <header>
                  by removing its own redundant background styles.
                */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                            {navLinks.map(link => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-gray-800 hover:text-gold-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a href="tel:2817620878" className="block w-full text-center font-semibold mt-2 px-3 py-2 rounded-md text-base btn-golden-glow btn-fill-gold">
                                Book Your Escape
                            </a>
                        </div>
                    </div>
                )}
            </header>
            {isPromotionModalOpen && modalContainer && createPortal(promotionModal, modalContainer)}
        </>
    );
};
