/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Synthflow-inspired palette - Purple/Violet based
        primary: {
          DEFAULT: '#5b0dd5',    // Synthflow violet
          dark: '#1e0a45',       // Darker purple
          light: '#7e5ac6',     // Lighter violet
        },
        secondary: {
          DEFAULT: '#502d95',   // Violet-600
        },
        accent: {
          DEFAULT: '#10B981',   // emerald-500 (success)
        },
        background: '#0F172A',  // slate-900
        surface: '#1E293B',     // slate-800
        border: '#334155',      // slate-700
        
        // Named colors for easy use
        violet: {
          DEFAULT: '#5b0dd5',
          dark: '#1e0a45',
          light: '#7e5ac6',
        },
        purple: {
          DEFAULT: '#502d95',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Reddit Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        // Synthflow-style rounded
        'btn': '0.5rem',
        'card': '1rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 12px -4px rgba(0,0,0,0.07)',  // Synthflow style
        'button': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'button-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
      spacing: {
        // Synthflow 8px grid
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
