/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // High-end Dark Luxury Palette
        obsidian: {
          DEFAULT: '#050505',
          deep: '#030303',
          surface: '#0B0C0E',
          card: '#121316',
        },
        midnight: {
          DEFAULT: '#111111',
          pure: '#080808',
          card: '#161616',
        },
        // Liquor Store Gold Accent
        gold: {
          DEFAULT: '#F5D900',
          hover: '#FFE524',
          light: '#FFF066',
          dark: '#CCA800',
        },
        // Deep Burgundy - Secondary Accent
        burgundy: {
          DEFAULT: '#5B1018',
          light: '#781520',
          dark: '#3A070D',
          deep: '#240407',
        },
        // Refined Charcoal
        charcoal: {
          DEFAULT: '#1A1A1A',
          card: '#141414',
          light: '#242424',
          border: '#2E2E2E',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        anton: ['var(--font-anton)', 'Impact', 'Arial Narrow', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
