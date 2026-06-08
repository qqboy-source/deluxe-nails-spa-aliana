export interface MediaItem {
  type: 'video' | 'image'
  src: string
  alt: string
}

export const mediaItems: MediaItem[] = [
  { type: 'video', src: '/media/store-video-1.mp4', alt: 'A promotional video of the spa experience.' },
  { type: 'image', src: '/images/spa-interior.jpg', alt: 'A photo showcasing the elegant interior of Deluxe Nails & Spa Aliana.' },
  { type: 'video', src: '/media/store-video-2.mp4', alt: 'Another view of the beautiful and relaxing spa ambiance.' },
]

export const galleryImages: string[] = [
  '/gallery/nail-1.jpeg',
  '/gallery/nail-2.jpeg',
  '/gallery/nail-3.jpeg',
  '/gallery/nail-4.jpeg',
  '/gallery/nail-5.jpeg',
  '/gallery/nail-6.jpeg',
  '/gallery/nail-7.jpeg',
  '/gallery/nail-8.jpeg',
]

export const coreValues: string[] = [
  'An Aliana-based, women-owned and operated establishment catering to a diverse, international clientele.',
  "Each reservation is customized to fit each individual's personal experience.",
  'Our skilled staff are always up-to-date with the latest trends and hygienic practices, while applying innovative design techniques.',
  'To be an inspiration to our guests, operating with pride, integrity, and respect as an honest leader in the nail and spa industry.',
  'We strive to set the highest standards of beauty with our extraordinary products, exceptional service, and dedication to your well-being.',
]
