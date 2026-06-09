import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { LeftArrowIcon, RightArrowIcon } from '../icons'
import { galleryImages } from '../data/content'

const numColumns = 3
const columns: string[][] = Array.from({ length: numColumns }, () => [])
galleryImages.forEach((image, index) => { columns[index % numColumns].push(image) })

interface GalleryImageProps {
  src: string
  onImageClick: (src: string) => void
}

function GalleryImage({ src, onImageClick }: GalleryImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const imageNumber = src.split('-')[1]?.split('.')[0] || 'design'
  return (
    <div
      className="gallery-img-wrapper w-full h-auto rounded-lg shadow-lg overflow-hidden mb-4 cursor-pointer border-2 border-transparent hover:border-gold-400 transition-all duration-300 bg-gold-100"
      onClick={() => onImageClick(src)}
      onKeyDown={(e) => e.key === 'Enter' && onImageClick(src)}
      role="button"
      tabIndex={0}
      aria-label={`View larger image for nail design ${imageNumber}`}
    >
      <img
        src={imageSrc}
        alt={`Nail art example ${imageNumber}`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setImageSrc('https://placehold.co/400x500/c6934a/FBF3E6?text=Image+Not+Found')}
      />
    </div>
  )
}

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [modalContainer, setModalContainer] = useState<HTMLElement | null>(null)

  useEffect(() => { setModalContainer(document.getElementById('modal-root')) }, [])

  const openModal = (src: string) => {
    const index = galleryImages.indexOf(src)
    if (index !== -1) setSelectedImageIndex(index)
  }
  const closeModal = () => setSelectedImageIndex(null)
  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex === null) return
    setSelectedImageIndex(prev => ((prev ?? 0) + 1) % galleryImages.length)
  }
  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex === null) return
    setSelectedImageIndex(prev => ((prev ?? 0) - 1 + galleryImages.length) % galleryImages.length)
  }

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrevious()
    }
    if (selectedImageIndex !== null) { document.body.style.overflow = 'hidden'; window.addEventListener('keydown', handleKeyDown) }
    else document.body.style.overflow = originalOverflow
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener('keydown', handleKeyDown) }
  }, [selectedImageIndex])

  const selectedImageSrc = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null
  const selectedImageAlt = selectedImageIndex !== null ? `Enlarged nail art example ${selectedImageIndex + 1}` : ''

  return (
    <>
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-800 mb-3 text-shadow-subtle">Our Work</h2>
        <p className="text-xl md:text-2xl text-gold-600 font-medium tracking-wide uppercase">A Glimpse of Perfection</p>
      </div>
      <div className="mt-12 w-full max-w-4xl mx-auto h-[60vh] max-h-[500px] flex gap-4" aria-label="Image gallery with animated columns">
        {columns.map((columnImages, colIndex) => (
          <div key={colIndex} className="w-1/3 h-full overflow-hidden group" role="presentation">
            <div className={`w-full flex flex-col group-hover:pause will-change-transform ${colIndex === 1 ? 'animate-scroll-down' : 'animate-scroll-up'} ${selectedImageSrc ? 'pause' : ''}`}>
              {columnImages.map((src, imgIndex) => <GalleryImage key={`${src}-${imgIndex}`} src={src} onImageClick={openModal} />)}
              {columnImages.map((src, imgIndex) => <GalleryImage key={`${src}-${imgIndex}-clone`} src={src} onImageClick={openModal} />)}
            </div>
          </div>
        ))}
      </div>
      {selectedImageSrc && modalContainer && ReactDOM.createPortal(
        <div
          className="fixed inset-0 bg-black/70 liquid-glass-bg z-[200] flex justify-center items-center animate-fade-in p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
        >
          <button onClick={closeModal} className="absolute top-4 right-4 text-white text-5xl font-light leading-none z-[210] hover:text-gold-300 transition-colors" aria-label="Close image view">×</button>
          <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <button onClick={goToPrevious} className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-[210] bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors" aria-label="Previous image">
              <LeftArrowIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <div className="relative animate-scale-in z-[205]">
              <h2 id="gallery-modal-title" className="sr-only">{selectedImageAlt}</h2>
              <img src={selectedImageSrc} alt={selectedImageAlt} className="max-w-[80vw] sm:max-w-[70vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" />
            </div>
            <button onClick={goToNext} className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-[210] bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors" aria-label="Next image">
              <RightArrowIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>,
        modalContainer
      )}
    </>
  )
}
