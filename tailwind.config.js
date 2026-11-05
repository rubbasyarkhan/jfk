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
        // Midnight Black / Ink (Primary Backgrounds)
        midnight: {
          DEFAULT: '#0E0D0D',
          pure: '#080808',
          card: '#141414',
          soft: '#1A1A1A',
        },
        ink: {
          DEFAULT: '#0E0D0D',
          2: '#161616',
          3: '#1E1E1E',
          4: '#080808',
        },
        // Rich Luxury Metallic Gold (Upgraded from yellow)
        gold: {
          DEFAULT: '#D4AF37',       // Classic Liquid Gold
          hover: '#E5C268',         // Warm Light Gold Hover
          light: '#F3DB94',         // Bright Champagne Accent
          muted: '#9F7F28',         // Antique Bronze Gold
          dark: '#7D6118',          // Deep Cask Gold
          glow: 'rgba(212, 175, 55, 0.22)',
        },
        // Deep Burgundy (Collector Accents & Banners)
        burgundy: {
          DEFAULT: '#5B1018',
          light: '#781520',
          dark: '#3F0B10',
          deep: '#24060A',
          glow: 'rgba(91, 16, 24, 0.4)',
        },
        // Charcoal (Cards, Pedestals, Elevated Surfaces)
        charcoal: {
          DEFAULT: '#1A1A1A',
          card: '#161616',
          light: '#242424',
          hover: '#2A2A2A',
          border: '#2E2E2E',
        },
        line: {
          DEFAULT: '#262626',
          gold: 'rgba(212, 175, 55, 0.28)',
        },
        // Clean White & High Contrast
        paper: {
          DEFAULT: '#FFFFFF',
          2: '#E5E5E5',
          soft: '#F4F4F4',
          muted: '#A5A5A5',
          dim: '#737373',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-figtree)', 'system-ui', '-apple-system', 'sans-serif'],
        anton: ['var(--font-anton)', 'Impact', 'Arial Narrow', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.25)',
        'pedestal-glow': '0 15px 40px rgba(212, 175, 55, 0.15)',
        'burgundy-glow': '0 0 35px rgba(91, 16, 24, 0.45)',
        'card': '0 12px 35px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};
