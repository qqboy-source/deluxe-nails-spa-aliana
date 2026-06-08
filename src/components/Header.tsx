import { useState } from 'react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Our Vision', href: '#vision' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    if (isOpen) setIsOpen(false)
    setTimeout(() => {
      const targetId = href.substring(1)
      if (targetId === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
      const targetElement = document.getElementById(targetId)
      if (!targetElement) return
      const horizontalContainer = document.querySelector('[data-testid="horizontal-scroll-container"]')
      if (horizontalContainer && horizontalContainer.contains(targetElement)) {
        const containerTop = horizontalContainer.getBoundingClientRect().top + window.scrollY
        const horizontalSections = Array.from(horizontalContainer.querySelectorAll('.horizontal-scroll-section-item'))
        const sectionIndex = horizontalSections.findIndex(section => section.id === targetId)
        if (sectionIndex !== -1) {
          const sectionWidth = (horizontalSections[0] as HTMLElement)?.getBoundingClientRect().width || window.innerWidth
          window.scrollTo({ top: containerTop + sectionIndex * sectionWidth, behavior: 'smooth' })
        }
      } else {
        const header = document.querySelector('header')
        const headerHeight = header ? header.offsetHeight : 80
        window.scrollTo({ top: targetElement.getBoundingClientRect().top + window.scrollY - headerHeight, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <header className="bg-white/30 sticky top-0 z-50 w-full border-b border-white/20 shadow-sm liquid-glass-bg">
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
                <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-800 hover:text-gold-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
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
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-800 hover:text-gold-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
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
  )
}
