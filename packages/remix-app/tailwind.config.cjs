/** @type {import('tailwindcss').Config} */
module.exports = {
  relative: true,
  content: ['./app/**/*.tsx', './app/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        vag: ['vag-rundschrift-d', 'sans-serif'],
        acier: ['acier-bat-gris', 'sans-serif'],
        sauna: ['sauna-new', 'sans-serif'],
        omnium: ['omnium', 'sans-serif'],
        futura: ['futura-pt', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
