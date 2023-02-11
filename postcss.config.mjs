import { postcssFontGrabber } from 'postcss-font-grabber';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
/** @type {import('postcss/lib/input').} */
export default {
  plugins: [
    tailwindcss({ config: './tailwind.config.cjs' }),
    autoprefixer({}),
    postcssFontGrabber({
      cssSrc: './app/styles/app.css',
      cssDest: './app/styles/app.css',
      fontDest: './app/assets/fonts',
    }),
  ],
};
