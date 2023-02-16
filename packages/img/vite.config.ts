import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: {
        react: resolve(__dirname, 'lib/react.tsx'),
        node: resolve(__dirname, 'lib/node.ts'),
        pure: resolve(__dirname, 'lib/pure.ts'),
        cfworker: resolve(__dirname, 'lib/cfworker.ts'),
      },
      formats: ['es'],
      name: 'img',
    },
    sourcemap: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@cloudflare/workers-types', '@cloudflare/kv-asset-handler', '@next-boost/hybrid-disk-cache', 'react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [
    react(),
    dts({
      copyDtsFiles: false,
      insertTypesEntry: true,
      staticImport: true,
      logDiagnostics: true,
    }),
  ],
});
