
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LeftArrowIcon, RightArrowIcon } from './icons';

// INSTRUCTIONS FOR ADDING YOUR OWN GALLERY IMAGES:
// 1. In the root directory of your project, create a folder named `public`, then a folder inside that called `gallery`.
// 2. Place your images inside the `public/gallery` folder (e.g., `nail-1.jpeg`, `nail-2.jpeg`, etc.).
// 3. IMPORTANT: List the exact file paths for your images in the `images` array below.
//    You can add or remove images from this list, and the gallery will update automatically!
const images = [
  'gallery/nail-1.jpeg',
  'gallery/nail-2.jpeg',
  'gallery/nail-3.jpeg',
  'gallery/nail-4.jpeg',
  'gallery/nail-5.jpeg',
  'gallery/nail-6.jpeg',
  'gallery/nail-7.jpeg',
  'gallery/nail-8.jpeg',
  // Add more image paths here, like: 'gallery/nail-9.jpeg',
];


// This code automatically distributes the images into three columns.
const numColumns = 3;
const columns: string[][] = Array.from({ length: numColumns }, () => []);
images.forEach((image, index) => {
  columns[index % numColumns].push(image);
});

const GalleryImage: React.FC<{ src: string, onImageClick: (src: string) => void }> = ({ src, onImageClick }) => {
    const imageNumber = src.split('-')[1]?.split('.')[0] || 'design';
    return (
        <div
            className="w-full h-auto rounded-lg shadow-lg overflow-hidden mb-4 cursor-pointer border-2 border-transparent hover:border-gold-400 transition-all duration-300"
            onClick={() => onImageClick(src)}
            onKeyDown={(e) => e.key === 'Enter' && onImageClick(src)}
            role="button"
            tabIndex={0}
            aria-label={`View larger image for nail design ${imageNumber}`}
        >
            <img
                src={src}
                alt={`Nail art example ${imageNumber}`}
                className="w-full h-full object-cover"
                loading="lazy"
            />
        </div>
    );
};


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
    if (selectedImageIndex === null || images.length === 0) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % images.length);
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null || images.length === 0) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIndex]);

  const selectedImageSrc = selectedImageIndex !== null ? images[selectedImageIndex] : null;
  const selectedImageAlt = selectedImageIndex !== null ? `Enlarged nail art example ${selectedImageIndex + 1}` : '';

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
                  } ${selectedImageSrc ? 'pause' : ''}`}
                >
                    {/* Render images twice for seamless loop */}
                    {columnImages.map((src, imgIndex) => <GalleryImage key={`${src}-${imgIndex}`} src={src} onImageClick={openModal} />)}
                    {columnImages.map((src, imgIndex) => <GalleryImage key={`${src}-${imgIndex}-clone`} src={src} onImageClick={openModal} />)}
                </div>
            </div>
        ))}
      </div>

      {selectedImageSrc && modalContainer && createPortal(
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
