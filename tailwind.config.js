/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
      extend: {
        fontFamily: {
          ostrich: ['OstrichSansFont', 'sans-serif'],
          soria: ['SoriaFont', 'serif'],
          skyscrapers: ['SkyscrapersFont'],
        },
      },
    },
    plugins: [],
  };
  