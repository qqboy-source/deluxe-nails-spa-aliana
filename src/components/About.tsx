export default function About() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
      <div className="w-full lg:w-[55%]">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-800 mb-3 text-shadow-subtle">About Us</h2>
        <p className="text-xl md:text-2xl text-gold-600 font-medium tracking-wide uppercase">More than a nail appointment</p>
        <blockquote className="mt-6 border-l-4 border-gold-500 pl-5 font-serif text-xl md:text-2xl italic text-gold-800">
          "We don't just do nails. We build relationships, one appointment at a time."
        </blockquote>
        <p className="mt-5 text-lg text-gray-700 font-sans leading-relaxed">
          Luxury isn't just what we do — it's how we make you feel. At Deluxe Nails & Spa Aliana, every visit is designed around you, creating an experience that feels personal, effortless, and uniquely yours.
        </p>
        <p className="mt-3 text-lg text-gray-700 font-sans leading-relaxed">
          Our team takes the time to get to know you, so every visit feels personal — not just professional.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gold-100 text-gold-800 border border-gold-300">Women-owned</span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gold-100 text-gold-800 border border-gold-300">Walk-ins welcome</span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gold-100 text-gold-800 border border-gold-300">Gift cards available</span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gold-100 text-gold-800 border border-gold-300">Complimentary drinks</span>
        </div>
      </div>
      <div className="w-full lg:w-[45%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/20 flex-shrink-0">
        <img src="/images/spa-interior.jpg" alt="The elegant and welcoming interior of Deluxe Nails & Spa Aliana" className="w-full h-full object-cover" loading="lazy" />
      </div>
    </div>
  )
}
