/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Synthflow-inspired palette
        primary: {
          DEFAULT: '#2563EB', // blue-600
          dark: '#1E40AF',    // blue-800 (active state)
          light: '#3B82F6',   // blue-500 (hover)
        },
        secondary: {
          DEFAULT: '#7C3AED', // violet-600
        },
        accent: {
          DEFAULT: '#10B981', // emerald-500 (success)
        },
        background: '#0F172A', // slate-900
        surface: '#1E293B',    // slate-800
        border: '#334155',     // slate-700
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1)',
        'button': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'button-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
