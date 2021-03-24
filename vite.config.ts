import reactRefresh from '@vitejs/plugin-react-refresh'; // Conflicts with react-spring
import tsconfigPaths from 'vite-tsconfig-paths';
import { imagetools } from 'vite-imagetools';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import ViteFonts from 'vite-plugin-fonts';
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    svgr(),
    imagetools(),
    VitePWA({
      manifest: {
        name: "Jish.Dev",
        short_name: "Jish",
        start_url: ".",
        display: "standalone",
        background_color: "#fff",
        description: "A readable Hacker News app.",
        icons: [
          {
            src: "assets/pwa/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "assets/pwa/icon.svg",
            type: "image/svg"
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
      'graph/analysis',
      'zustand/middleware',
    ],
  },
  server: { force: true },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import {jsx} from "@emotion/react"; import React from "react";`
  }
});
