/** @type {import('tailwindcss').Config} */
module.exports = {
  relative: true,
  content: ['./app/**/*.tsx', './app/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        omnium: ['omnium', 'sans-serif'],
        acier: 'acier-bat-gris, sans-serif',
        vag: 'vag-rundschrift-d, sans-serif',
        futura: 'futura-pt, sans-serif',
        sauna: 'sauna-new, sans-serif',
      },
    },
  },
  plugins: [],
};
