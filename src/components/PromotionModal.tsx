import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose }) => {
    const [modalContainer, setModalContainer] = useState<Element | null>(null);

    useEffect(() => {
        setModalContainer(document.getElementById('modal-root'));
    }, []);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = originalOverflow;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !modalContainer) {
        return null;
    }

    return createPortal(
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex justify-center items-center animate-fade-in p-4" 
            onClick={onClose}
            role="dialog" aria-modal="true" aria-labelledby="promotion-modal-title"
        >
            <button
                onClick={onClose}
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
        </div>,
        modalContainer
    );
};
