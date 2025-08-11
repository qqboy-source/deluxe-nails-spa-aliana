
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
      colors: {
        'gold': {
          '100': '#FBF3E6', '200': '#F6E5C9', '300': '#EED6AB',
          '400': '#E4C186', '500': '#D9AC64', '600': '#C6934A',
          '700': '#9F763B', '800': '#78592C', '900': '#503C1D',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.5s ease-out 0.5s forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'scroll-up': 'scroll-up 40s linear infinite',
        'scroll-down': 'scroll-down 40s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scroll-up': {
          'from': { transform: 'translateY(0)' },
          'to': { transform: 'translateY(-50%)' },
        },
        'scroll-down': {
          'from': { transform: 'translateY(-50%)' },
          'to': { transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-shadow-subtle': {
          'text-shadow': '1px 1px 2px rgba(0,0,0,0.1)',
        },
        '.text-shadow-strong': {
          'text-shadow': '2px 2px 8px rgba(0,0,0,0.5)',
        },
      })
    })
  ],
}
