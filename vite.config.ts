import { defineConfig } from 'vite'; // Vite config
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import ViteFonts from 'vite-plugin-fonts';
export default defineConfig({
  plugins: [
    react({ plugins: [['@swc/plugin-emotion', {}]], jsxImportSource: '@emotion/react' }),
    tsconfigPaths(),
    VitePWA({
      manifest: {
        name: 'Jish.Dev',
        short_name: 'Jish',
        start_url: '.',
        display: 'standalone',
        background_color: 'rgba(21, 16, 25, 1.00)',
        theme_color: 'rgba(12, 48, 149, 1.00)',
        description: 'Experiments with the web in 2023.',
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
      registerType: 'autoUpdate',
    }),
    ViteFonts({
      typekit: {
        id: 'gen7ewv',
        defer: true,
      },
    }),
  ],
  assetsInclude: ['heic'],
  esbuild: {
    jsx: 'automatic',
    jsxFactory: 'jsx',
    jsxImportSource: '@emotion/react',
  },
});
