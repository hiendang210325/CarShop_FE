/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0px',
      'sm': '8px',
      'DEFAULT': '8px',
      'md': '8px',
      'lg': '8px',
      'xl': '10px',
      '2xl': '10px',
      '3xl': '10px',
      'full': '10px',
    },
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0066ff',
          600: '#0050cb',
          700: '#003fa4',
          accent: '#0284c7',
        },
        surface: {
          DEFAULT: '#ffffff',
          alt: '#f8fafc',
          inset: '#f1f5f9',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'card-hover': '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'floating': '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
        'glow': '0 0 24px rgba(0, 102, 255, 0.28)',
      },
    },
  },
  plugins: [],
}
