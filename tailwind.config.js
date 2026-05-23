/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C6A43F',
          light: '#D4AF37',
          dark: '#A8872E',
          muted: 'rgba(198,164,63,0.15)',
        },
        obsidian: '#000000',
        charcoal: '#0A0A0A',
        slate: '#111111',
        ash: '#1A1A1A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-once': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(198,164,63,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(198,164,63,0.7), 0 0 40px rgba(198,164,63,0.3)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'bounce-once': 'bounce-once 0.4s ease-in-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C6A43F 0%, #D4AF37 50%, #A8872E 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #000000 100%)',
      },
    },
  },
  plugins: [],
}
