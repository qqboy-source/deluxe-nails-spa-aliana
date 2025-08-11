
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ServiceCategory } from '../types';

const servicesData: ServiceCategory[] = [
    {
        category: 'Nail Enhancements',
        note: '***Additional pricing for longer nails, shape and specials design requests***',
        items: [
            { name: 'Acrylic', price: 'Full Set $37 / Fill $30' },
            { name: 'Acrylic with Shellac/Gel', price: 'Full Set $57 / Fill $48' },
            { name: 'Solar Pink & White', price: 'Full Set $55' },
            { name: 'Pink Fill Only', price: '$45' },
            { name: 'Color Powder', price: 'Full Set $46' },
            { name: 'Color Powder Refill Same Color', price: '$37' },
            { name: 'Color Powder Refill Change Color', price: '$42' },
        ],
    },
    {
        category: 'Enhancement Add-Ons',
        layout: 'grid',
        items: [
            { name: 'Length', price: '$5+' }, { name: 'Shape (Stiletto/Almond/Coffin/Round, etc...)', price: '$5+' },
            { name: 'Ombre Design', price: '$15' }, { name: 'Chrome Design', price: '$20' },
            { name: 'Cateyes Design', price: '$10+' }, { name: 'Marble Design', price: '$5+' },
        ]
    },
    {
        category: 'Dipping Powder', items: [
            { name: 'Dipping Powder w/Cuticle Grooming & Massage', price: '$50' },
            { name: 'Dipping French w/Cuticle Grooming & Massage', price: '$55' },
        ],
    },
    {
        category: 'Manicures', note: 'Add Gel/Shellac Polish to any Manicure for $20',
        items: [
            { name: 'Classic', price: '$22', description: 'Basic and express manicure which includes nail trimming, cuticle grooming on hands, hot towel, massage, and finish with your choice of polish.' },
            { name: 'Signature', price: '$32', description: 'Includes everything in the Classic Manicure with a mask wrapped around the arms to re-hyrdrate your skin with a choice of lavender paraffin wax OR hot stone massage.' },
            { name: 'Aroma Therapy', price: '$40', description: 'Includes everything in the Signature Manicure plus your choice of our exclusive Organic Aroma treatments and extensive hands, arms, neck, and shoulder massages. Scents: Cucumber Dream, Citrus Sensation, Milk and Honey Rejuvenation, Lavender and Mint Relaxation, Organic Soothing Aloe Vera.' },
            { name: 'Deluxe', price: '$45', description: 'Our exclusive manicure service with organic ingredients to stimulate your skin, relax your muscles, and enhance healthier nail growth. Pamper yourself with BOTH lavender paraffin wax and hot stone massages for your hands, arms, neck, and shoulder.' },
        ]
    },
    {
        category: 'Pedicures', note: 'Add Gel/Shellac Polish to any Pedicure for $20',
        items: [
            { name: 'Classic (8 Mins Massage)', price: '$33', description: 'Basic express pedicure with nail trimming, shape, callus treatment, cuticle grooming, exfoliation, hot towel, leg and foot massage, and choice of polish.' },
            { name: 'Signature (12 Mins Massage)', price: '$43', description: 'Includes Classic Pedicure plus a mask for the legs and your choice of lavender paraffin wax OR hot stone massage.' },
            { name: 'Tropical Paradise (16 Mins Massage)', price: '$51', description: 'Relieve stress with a pleasant tropical citrus sensation, extensive foot treatment, and massages. Your choice of lavender wax OR hot stone massage included.' },
            { name: 'Aroma Therapy (20 Mins Massage)', price: '$60', description: 'Pamper yourself with selective natural Aroma treatments and extensive foot massages. Your choice of lavender paraffin wax OR hot stone massage. Scents: Cucumber Dream, Citrus Sensation, Milk and Honey Rejuvenation, Lavender and Mint Relaxation, Organic Soothing Aloe Vera.' },
            { name: 'Deluxe (24 Mins Massage)', price: '$69', description: 'Indulge in the most perfect, extensive pedicure treatment with BOTH paraffin wax and hot stone massage, using the highest quality natural ingredients for a luxurious experience.' },
            { name: 'Wellness Healing CBD (24 Mins Massage)', price: '$73', description: 'A one-of-a-kind pedicure therapy with high-quality CBD extract infused with selective herbal ingredients to enhance your wellness. Includes lavender paraffin wax and hot stone massages.' },
        ]
    },
    {
        category: 'Kids 12 & Under', note: 'Add Gel/Shellac Polish for $15', layout: 'grid',
        items: [
            { name: 'Classic Manicure', price: '$12' }, { name: 'Classic Pedicure', price: '$24' },
            { name: 'Hand Polish Change', price: '$8' }, { name: 'Toe Polish Change', price: '$10' },
        ]
    },
    {
        category: 'Additional Services', layout: 'grid',
        items: [
            { name: 'Nail Repair (Varies w/ design)', price: '$5+' }, { name: 'Nail Enhancement Removal Only', price: '$13' },
            { name: 'Nail Enhancement Removal (w/ another service)', price: '$6' }, { name: 'Shellac Gel Polish Change', price: '$30' },
            { name: 'Regular Hand Polish Change', price: '$12' }, { name: 'Regular Toe Polish Change', price: '$13' },
            { name: 'Basic French / American French Tip', price: '$5+' }, { name: 'Add Lavender Parafin Wax or Hot Stones', price: '$9' },
            { name: 'Add Shellac / Gel to Service', price: '$20' }, { name: 'Extra Massages', price: '$1 / Min' },
        ]
    },
    {
        category: 'Waxing', layout: 'grid',
        items: [
            { name: 'Eyebrows', price: '$12' }, { name: 'Wholeface', price: '$45' }, { name: 'Chin', price: '$10' },
            { name: 'Half Arm', price: '$35' }, { name: 'Lip', price: '$10' }, { name: 'Half Leg', price: '$40' },
            { name: 'Underarms', price: '$25' }, { name: 'Sideburns', price: '$18' }, { name: 'Full Arm', price: '$45' },
            { name: 'Chest', price: '$45' }, { name: 'Full Leg', price: '$55' }, { name: 'Bikini', price: '$45' },
            { name: 'Back', price: '$50' }, { name: 'Brazillian', price: '$55' },
        ]
    },
];

export const Services: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [modalContainer, setModalContainer] = useState<Element | null>(null);

    useEffect(() => {
        setModalContainer(document.getElementById('modal-root'));
    }, []);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        if (isMenuVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalOverflow;
        }
        return () => { document.body.style.overflow = originalOverflow; };
    }, [isMenuVisible]);

    const menuModal = (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex justify-center items-center animate-fade-in" 
            onClick={() => setIsMenuVisible(false)}
            role="dialog" aria-modal="true" aria-labelledby="services-heading"
        >
            <div 
                className="bg-gradient-to-br from-gray-900 to-black border border-gold-700/30 w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl m-4 flex flex-col animate-scale-in" 
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 border-b border-gold-600/30 flex justify-between items-center flex-shrink-0">
                    <h2 id="services-heading" className="text-2xl font-serif font-bold text-gold-200">Our Services</h2>
                    <button onClick={() => setIsMenuVisible(false)} className="text-4xl font-light leading-none text-gray-400 hover:text-white transition-colors" aria-label="Close services menu">&times;</button>
                </header>
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
                    {servicesData.map((category) => (
                        <div key={category.category} className="mb-8">
                            <h3 className="text-xl font-serif font-bold text-gold-400 border-b-2 border-gold-500/50 pb-2 mb-4">{category.category}</h3>
                            {category.note && <p className="text-sm text-gold-300/90 italic mb-4">{category.note}</p>}
                            <div className={category.layout === 'grid' ? 'grid md:grid-cols-2 gap-x-8 gap-y-2' : 'space-y-4'}>
                                {category.items.map(item => (
                                    <div key={item.name} className="font-sans py-1">
                                        <div className="flex justify-between items-baseline">
                                            <p className="font-semibold text-gold-100">{item.name}</p>
                                            <p className="font-medium text-gray-300 text-right pl-2">{item.price}</p>
                                        </div>
                                        {item.description && <p className="text-sm text-gray-400 mt-1 max-w-prose">{item.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <footer className="p-4 border-t border-gold-600/30 text-center flex-shrink-0">
                     <a href="tel:2817620878" className="inline-block bg-gold-600 text-white font-bold py-2 px-6 rounded-lg text-base shadow-lg hover:bg-gold-500 transition-colors">
                        Book Now
                    </a>
                </footer>
            </div>
        </div>
    );

    return (
        <>
            <div className="lg:text-center">
                <h2 className="text-base text-gold-700 font-semibold tracking-wide uppercase">Our Menu</h2>
                <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl text-shadow-subtle">
                    Indulge in Our Services
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto font-sans">
                    Explore our wide range of services designed to make you look and feel your best. Click below to view our full service menu.
                </p>
                <div className="mt-16">
                    <button onClick={() => setIsMenuVisible(true)} className="text-gray-900 font-bold py-3 px-8 rounded-lg text-lg shadow-lg btn-charging"
                        aria-haspopup="dialog" aria-expanded={isMenuVisible}>
                        View Full Menu
                    </button>
                </div>
            </div>
            {isMenuVisible && modalContainer && createPortal(menuModal, modalContainer)}
        </>
    );
};
