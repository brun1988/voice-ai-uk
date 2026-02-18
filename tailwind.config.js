/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'gradient-bg',
    'blob', 
    'glowing-btn',
    'scenario-btn',
    'card-hover',
    'wave-element',
    'hero-gradient',
    'bg-[#1877F2]',
    'bg-[#9333EA]',
    'from-[#1877F2]',
    'to-[#9333EA]',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1877F2',
        accent: '#9333EA',
        dark: '#0F172A',
        light: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
