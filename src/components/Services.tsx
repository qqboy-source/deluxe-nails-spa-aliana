import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { servicesData } from '../data/services'
import MagneticWrapper from './MagneticWrapper'

export default function Services() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [modalContainer, setModalContainer] = useState<HTMLElement | null>(null)

  useEffect(() => { setModalContainer(document.getElementById('modal-root')) }, [])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    if (isMenuVisible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = originalOverflow
    return () => { document.body.style.overflow = originalOverflow }
  }, [isMenuVisible])

  const menuModal = (
    <div
      className="fixed inset-0 bg-black/60 liquid-glass-bg z-[100] flex justify-center items-center animate-fade-in"
      onClick={() => setIsMenuVisible(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="services-heading"
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-black border border-gold-700/30 w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl m-4 flex flex-col animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gold-600/30 flex justify-between items-center flex-shrink-0">
          <h2 id="services-heading" className="text-2xl font-serif font-bold text-gold-200">Our Services</h2>
          <button onClick={() => setIsMenuVisible(false)} className="text-4xl font-light leading-none text-gray-400 hover:text-white transition-colors" aria-label="Close services menu">×</button>
        </header>
        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
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
          <a href="tel:2817620878" className="inline-block bg-gold-600 text-white font-bold py-2 px-6 rounded-lg text-base shadow-lg hover:bg-gold-500 transition-colors">Book Now</a>
        </footer>
      </div>
    </div>
  )

  return (
    <>
      <div className="lg:text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-800 mb-3 text-shadow-subtle">Our Treatments</h2>
        <p className="text-xl md:text-2xl text-gold-600 font-medium tracking-wide uppercase">Tailored to you, every time</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl lg:mx-auto">
          {[
            { icon: 'ti-hand-stop', name: 'Manicures', price: 'from $24' },
            { icon: 'ti-shoe', name: 'Pedicures', price: 'from $35' },
            { icon: 'ti-crown', name: 'Nail Enhancements', price: 'from $40' },
            { icon: 'ti-droplet-half-2', name: 'Gel & Dipping', price: 'from $44' },
            { icon: 'ti-flame', name: 'Waxing', price: 'from $11' },
            { icon: 'ti-baby-carriage', name: 'Kids Services', price: 'from $13' },
          ].map(({ icon, name, price }, index) => (
            <div
              key={name}
              className="bg-white/40 border border-gold-300/40 rounded-xl p-4 text-center hover:bg-white/60 transition-colors duration-200 stagger-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <i className={`ti ${icon} text-3xl text-gold-600`} aria-hidden="true"></i>
              <p className="mt-2 font-semibold text-gold-800 font-sans text-sm md:text-base">{name}</p>
              <p className="text-gold-600 text-xs md:text-sm mt-1">{price}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center">
          <MagneticWrapper>
            <button
              onClick={() => setIsMenuVisible(true)}
              className="font-bold py-3 px-8 rounded-lg text-lg btn-golden-glow btn-fill-gold"
              aria-haspopup="dialog"
              aria-expanded={isMenuVisible}
            >
              Explore All Treatments
            </button>
          </MagneticWrapper>
        </div>
      </div>
      {isMenuVisible && modalContainer && ReactDOM.createPortal(menuModal, modalContainer)}
    </>
  )
}
