import reactRefresh from '@vitejs/plugin-react-refresh'; 
import tsconfigPaths from 'vite-tsconfig-paths';
import { imagetools } from 'vite-imagetools';
import { VitePWA } from 'vite-plugin-pwa';
import viteImagemin from 'vite-plugin-imagemin';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import ViteFonts from 'vite-plugin-fonts';
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    svgr(),
    imagetools(),
    reactRefresh(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      webp: {
        quality: 75,
      },
      mozjpeg: {
        quality: 65,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
          {
            removeEmptyAttrs: false,
          },
        ],
      },
    }),
    VitePWA({
      manifest: {
        name: "Jish.Dev",
        short_name: "Jish",
        start_url: ".",
        display: "standalone",
        background_color: "rgba(21, 16, 25, 1.00)",
        theme_color: "rgba(12, 48, 149, 1.00)",
        description: "Experiments with the web in 2021.",
        icons: [
          {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
      }
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
      'firebase/app',
      'firebase/firebase-auth',
      'firebase/firebase-analytics',
      'firebase/firebase-functions',
      'firebase/firebase-firestore',
      'firebase/firebase-database',
      'firebase/firebase-analytics',
      'firebase/firebase-remote-config',
      'firebase/firebase-storage',
      'firebase/firebase-performance',
      'lodash/fp',
      'zustand/middleware',
    ],
  },
  server: { force: true },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import {jsx} from "@emotion/react"; import React from "react";`
  },
});
