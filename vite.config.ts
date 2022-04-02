import { defineConfig } from 'vite'; // Vite config
/** Vite Plugins */
// Used for relative imports - Gets the import path defined by tsconfig.json
import tsconfigPaths from 'vite-tsconfig-paths';
// Transforms images at compile time - Not in use
import { imagetools } from 'vite-imagetools';
// Enables the App to be a PWA
import { VitePWA } from 'vite-plugin-pwa';
// Compress Images to reduce bundle size
// import viteImagemin from 'vite-plugin-imagemin';
// Imports SVGs as component
// import svgr from 'vite-plugin-svgr';
// Preload Fonts to optimize initial render
import ViteFonts from 'vite-plugin-fonts';
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    // svgr(),
    imagetools(),
    // reactRefresh(),
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false,
    //   },
    //   optipng: {
    //     optimizationLevel: 7,
    //   },
    //   webp: {
    //     quality: 75,
    //   },
    //   mozjpeg: {
    //     quality: 65,
    //   },
    //   pngquant: {
    //     quality: [0.65, 0.9],
    //     speed: 4,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         removeViewBox: false,
    //       },
    //       {
    //         removeEmptyAttrs: false,
    //       },
    //     ],
    //   },
    // }),
    VitePWA({
      manifest: {
        name: 'Jish.Dev',
        short_name: 'Jish',
        start_url: '.',
        display: 'standalone',
        background_color: 'rgba(21, 16, 25, 1.00)',
        theme_color: 'rgba(12, 48, 149, 1.00)',
        description: 'Experiments with the web in 2021.',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    ViteFonts({
      typekit: {
        id: 'gen7ewv',
        defer: true,
      },
    }),
  ],
  assetsInclude: ['heic'],
  optimizeDeps: {
    include: [
      'lodash/fp',
      'zustand/middleware',
    ],
  },
  server: { force: true },
  esbuild: {
    jsxFactory: 'jsx',
    // Injects the 'css' into the JSX transformation
    // Injects react into the components that need it.
    jsxInject: `import {jsx} from "@emotion/react"; import React from "react";`,
  },
});
