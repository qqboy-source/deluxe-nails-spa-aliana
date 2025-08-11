
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalContainer, setModalContainer] = useState<Element | null>(null);

  useEffect(() => {
    setModalContainer(document.getElementById('modal-root'));
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (selectedImage) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
    } else {
        document.body.style.overflow = originalOverflow;
    }
    
    return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const openModal = (src: string) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

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
                  } ${selectedImage ? 'pause' : ''}`}
                >
                    {/* Render images twice for seamless loop */}
                    {columnImages.map((src, imgIndex) => <GalleryImage key={`${src}-${imgIndex}`} src={src} onImageClick={openModal} />)}
                    {columnImages.map((src, imgIndex) => <GalleryImage key={`${src}-${imgIndex}-clone`} src={src} onImageClick={openModal} />)}
                </div>
            </div>
        ))}
      </div>

      {selectedImage && modalContainer && createPortal(
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
            <div className="relative animate-scale-in z-[205]" onClick={e => e.stopPropagation()}>
                <h2 id="gallery-modal-title" className="sr-only">Enlarged Image View</h2>
                <img
                    src={selectedImage}
                    alt="Enlarged nail art example"
                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
            </div>
        </div>,
        modalContainer
      )}
    </>
  );
};
