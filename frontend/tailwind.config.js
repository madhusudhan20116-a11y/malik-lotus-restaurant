module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: '#0F0F12',
          navyDark: '#141418',
          cardBg: '#1A1A20',
          gold: '#D4AF37',
          goldHover: '#B89628',
          goldMuted: '#8C7323',
          cream: '#F8F5EE',
          offwhite: '#E5E1D8',
          subtext: '#A19E95',
          border: '#2A2A34',
          accentGreen: '#2D5A44'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        telugu: ['Mandali', 'Noto Sans Telugu', 'sans-serif']
      }
    },
  },
  plugins: [],
}
