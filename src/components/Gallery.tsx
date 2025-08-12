
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LeftArrowIcon, RightArrowIcon } from './icons';

// Using more reliable placeholders with theme colors and increased to 12 images
const images = [
  'https://placehold.co/400x500/c6934a/FBF3E6?text=Nails+1',
  'https://placehold.co/400x500/d9ac64/FBF3E6?text=Nails+2',
  'https://placehold.co/400x500/9F763B/FBF3E6?text=Nails+3',
  'https://placehold.co/400x500/c6934a/FBF3E6?text=Nails+4',
  'https://placehold.co/400x500/d9ac64/FBF3E6?text=Nails+5',
  'https://placehold.co/400x500/9F763B/FBF3E6?text=Nails+6',
  'https://placehold.co/400x500/c6934a/FBF3E6?text=Nails+7',
  'https://placehold.co/400x500/d9ac64/FBF3E6?text=Nails+8',
  'https://placehold.co/400x500/9F763B/FBF3E6?text=Nails+9',
  'https://placehold.co/400x500/c6934a/FBF3E6?text=Nails+10',
  'https://placehold.co/400x500/d9ac64/FBF3E6?text=Nails+11',
  'https://placehold.co/400x500/9F763B/FBF3E6?text=Nails+12',
];


// Distribute 12 images into three columns of 4
const columns = [
    [images[0], images[1], images[2], images[3]],
    [images[4], images[5], images[6], images[7]],
    [images[8], images[9], images[10], images[11]],
];

const GalleryImage: React.FC<{ src: string, onImageClick: (src: string) => void }> = ({ src, onImageClick }) => (
    <div
        className="w-full h-auto rounded-lg shadow-lg overflow-hidden mb-4 cursor-pointer border-2 border-transparent hover:border-gold-400 transition-all duration-300"
        onClick={() => onImageClick(src)}
        onKeyDown={(e) => e.key === 'Enter' && onImageClick(src)}
        role="button"
        tabIndex={0}
        aria-label={`View larger image for ${src.split('text=')[1] || 'nail design'}`}
    >
        <img
            src={src}
            alt={`Nail art example: ${src.split('text=')[1] || 'a nail design'}`}
            className="w-full h-full object-cover"
            loading="lazy"
        />
    </div>
);


export const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [modalContainer, setModalContainer] = useState<Element | null>(null);

  useEffect(() => {
    setModalContainer(document.getElementById('modal-root'));
  }, []);

  const openModal = (src: string) => {
    const index = images.indexOf(src);
    if (index !== -1) {
      setSelectedImageIndex(index);
    }
  };
  const closeModal = () => setSelectedImageIndex(null);

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % images.length);
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };

    if (selectedImageIndex !== null) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
    } else {
        document.body.style.overflow = originalOverflow;
    }
    
    return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex]);

  const selectedImageSrc = selectedImageIndex !== null ? images[selectedImageIndex] : null;
  const selectedImageAlt = selectedImageSrc ? `Enlarged nail art example: ${selectedImageSrc.split('text=')[1] || 'a nail design'}` : '';

  return (
    <>
      <div className="lg:text-center">
        <h2 className="text-base text-gold-700 font-semibold tracking-wide uppercase">Our Work</h2>
        <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl text-shadow-subtle">
          A Glimpse of Perfection
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto font-sans">
          Our gallery showcases the beautiful, continuous craft we pour into our work every day. Hover to pause, click to zoom.
        </p>
      </div>

      <div className="mt-12 w-full max-w-4xl mx-auto h-[60vh] max-h-[500px] flex gap-4" aria-label="Image gallery with animated columns">
        {columns.map((columnImages, colIndex) => (
            <div key={colIndex} className="w-1/3 h-full overflow-hidden group" role="presentation">
                <div
                  className={`w-full flex flex-col group-hover:pause will-change-transform ${
                    colIndex === 1 ? 'animate-scroll-down' : 'animate-scroll-up'
                  } ${selectedImageIndex !== null ? 'pause' : ''}`}
                >
                    {/* Render images twice for seamless loop */}
                    {columnImages.map((src, imgIndex) => <GalleryImage key={`${src}-${imgIndex}`} src={src} onImageClick={openModal} />)}
                    {columnImages.map((src, imgIndex) => <GalleryImage key={`${src}-${imgIndex}-clone`} src={src} onImageClick={openModal} />)}
                </div>
            </div>
        ))}
      </div>

      {selectedImageIndex !== null && modalContainer && createPortal(
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex justify-center items-center animate-fade-in p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
        >
            <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-5xl font-light leading-none z-[210] hover:text-gold-300 transition-colors"
                aria-label="Close image view"
            >&times;</button>

             <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
                <button
                    onClick={goToPrevious}
                    className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-[210] bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-gold-400"
                    aria-label="Previous image"
                >
                    <LeftArrowIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
            
                <div className="relative animate-scale-in z-[205]">
                    <h2 id="gallery-modal-title" className="sr-only">{selectedImageAlt}</h2>
                    <img
                        src={selectedImageSrc}
                        alt={selectedImageAlt}
                        className="max-w-[80vw] sm:max-w-[70vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    />
                </div>
                
                <button
                    onClick={goToNext}
                    className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-[210] bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-gold-400"
                    aria-label="Next image"
                >
                    <RightArrowIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
            </div>
        </div>,
        modalContainer
      )}
    </>
  );
};
