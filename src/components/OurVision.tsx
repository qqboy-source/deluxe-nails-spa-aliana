import { useState } from 'react'
import MediaCarousel from './MediaCarousel'
import { ArrowDownIcon, ArrowUpIcon } from '../icons'
import { coreValues, mediaItems } from '../data/content'

export default function OurVision() {
  const [isExpanded, setIsExpanded] = useState(false)

  const boxClasses = isExpanded
    ? 'bg-black/30 liquid-glass-bg rounded-2xl p-6 md:p-10 border border-white/20 shadow-xl'
    : 'p-6 md:p-10'
  const titleClasses = isExpanded ? 'text-gold-300' : 'text-gold-700'
  const buttonTextClasses = isExpanded ? 'text-gray-200' : 'text-black'
  const buttonHoverClass = isExpanded ? 'hover:text-white' : 'hover:text-gray-600'

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
      <div className={`w-full lg:w-[45%] transition-all duration-500 ease-in-out ${boxClasses}`}>
        <h3 className={`text-4xl md:text-5xl font-serif font-bold text-center transition-colors duration-500 ${titleClasses}`}>
          Our Values & Vision
        </h3>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center mx-auto font-semibold transition-colors duration-500 ${buttonTextClasses} ${buttonHoverClass}`}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
            {isExpanded ? <ArrowUpIcon className="w-5 h-5 ml-2" /> : <ArrowDownIcon className="w-5 h-5 ml-2" />}
          </button>
        </div>
        <div className={`grid transition-all duration-500 ease-in-out mt-4 ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <ul className="space-y-5 font-sans text-gray-200 text-sm md:text-base">
              {coreValues.map((value, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gold-500 font-bold mr-3 mt-1">◆</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[55%] aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-white/20">
        <MediaCarousel items={mediaItems} />
      </div>
    </div>
  )
}
