import { useState } from 'react'

export default function WorldCupBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="wc-banner relative z-50 text-white text-sm md:text-base font-medium">
      <div className="relative max-w-7xl mx-auto px-10 py-2 flex items-center justify-center gap-2 text-center">
        <span className="wc-trophy" aria-hidden="true">🏆</span>
        <span className="text-shadow-subtle">
          <span className="font-bold">World Cup 2026 is in Houston!</span>{' '}
          Celebrate with team-spirit nails — ask us about World Cup nail art ⚽
        </span>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
