// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#071021', // fallback
          deep: '#06121a',
          mid: '#0b1a26'
        },
        pastel: {
          cyan: '#8BE0FF',
          blue: '#7CB3FF',
          teal: '#8BE7C9',
          violet: '#C7A7FF',
          warm: '#FFD28C'
        },
        text: {
          DEFAULT: '#E6EEF6',
          muted: '#9FB3C8'
        }
      },
      fontFamily: {
        ostrich: ['OstrichSansFont', 'sans-serif'],
        soria: ['SoriaFont', 'serif'],
        skyscrapers: ['SkyscrapersFont'],
        nevis: ['NevisFont'],
      },
      boxShadow: {
        'soft-glow': '0 8px 40px rgba(59,130,246,0.08)',
        'card': '0 6px 30px rgba(2,6,23,0.6)'
      },
      borderRadius: {
        'md-lg': '14px'
      }
    }
  },
  plugins: []
}
