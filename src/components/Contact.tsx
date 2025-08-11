
import React from 'react';
import { LocationPinIcon, PhoneIcon, ClockIcon } from './icons';

export const Contact: React.FC = () => {
    const address = "10335 W Grand Pkwy S STE 120, Richmond, TX 77407";
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

    const contactInfo = [
        {
            Icon: LocationPinIcon,
            title: 'Our Address',
            content: address,
            link: googleMapsUrl,
            linkText: 'Get Directions'
        },
        {
            Icon: PhoneIcon,
            title: 'Call Us',
            content: '(281) 762-0878',
            link: 'tel:2817620878',
            linkText: 'Tap to Call'
        },
        {
            Icon: ClockIcon,
            title: 'Opening Hours',
            content: (
                <>
                    MON - FRI: 9:30 AM - 7:00 PM<br />
                    SATURDAY: 9:00 AM - 7:00 PM<br />
                    SUNDAY: 11:00 AM - 5:30 PM
                </>
            )
        },
    ];

    return (
        <section id="contact" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-gold-700 font-semibold tracking-wide uppercase">Contact Us</h2>
                    <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl text-shadow-subtle">
                        Visit Us or Get in Touch
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto font-sans">
                        We're excited to welcome you to our spa. Find us at the address below or give us a call to book your next appointment.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {contactInfo.map(({ Icon, title, content, link, linkText }) => (
                        <div key={title} className="p-6 bg-black/25 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 group flex flex-col">
                            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gold-900/40 border border-gold-500/50 transition-all duration-300 group-hover:bg-gold-800/60 group-hover:border-gold-400/80 group-hover:scale-105 flex-shrink-0">
                                <Icon className="w-10 h-10 text-gold-400 transition-colors duration-300 group-hover:text-gold-300" />
                            </div>
                            <h3 className="mt-4 text-xl font-serif font-semibold text-white">{title}</h3>
                            <div className="mt-2 text-gray-200 font-sans flex-grow flex items-center justify-center">{content}</div>
                            {link && linkText && (
                                <a href={link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-gold-400 font-semibold hover:text-gold-300 transition-colors">
                                    {linkText}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
                 <div className="mt-16 rounded-lg overflow-hidden shadow-xl h-96 border border-white/20">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.4361545620846!2d-95.69899432367462!3d29.64964913702047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e10e4a13348b%3A0x6e26b1758c0c0048!2sDeluxe%20Nails%20%26%20Spa%20Aliana!5e0!3m2!1sen!2sus!4v1718826742511!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location of Deluxe Nails & Spa Aliana"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};
