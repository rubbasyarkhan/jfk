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
        // Midnight Black - Primary Background (#111111)
        midnight: {
          DEFAULT: '#111111',
          pure: '#0A0A0A',
          card: '#1A1A1A',
        },
        // Liquor Store Gold - Brand Accent, Buttons, Highlights (#F5D900)
        gold: {
          DEFAULT: '#F5D900',
          hover: '#FFE524',
          light: '#FFF066',
          dark: '#CCA800',
          glow: 'rgba(245, 217, 0, 0.25)',
        },
        // Deep Burgundy - Premium Sections, Secondary Accent (#5B1018)
        burgundy: {
          DEFAULT: '#5B1018',
          light: '#781520',
          dark: '#3F0B10',
          deep: '#29060B',
          glow: 'rgba(91, 16, 24, 0.4)',
        },
        // Charcoal - Cards, Navigation, Footer (#242424)
        charcoal: {
          DEFAULT: '#242424',
          card: '#1F1F1F',
          light: '#2E2E2E',
          hover: '#333333',
          border: '#383838',
        },
        // Clean White - Text, Cards, Contrast (#FFFFFF)
        white: '#FFFFFF',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(245, 217, 0, 0.25)',
        'burgundy-glow': '0 0 30px rgba(91, 16, 24, 0.4)',
      },
    },
  },
  plugins: [],
};
