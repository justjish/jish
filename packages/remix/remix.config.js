/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  serverModuleFormat: 'esm',
  future: {
    unstable_dev: true,
    unstable_tailwind: true,
    v2_routeConvention: true,
  },
  devServerPort: 8002,
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: [
    'react-merge-refs',
    './vendor/remix-image/packages/remix-image/build/server/pure',
    './vendor/remix-image/packages/remix-image-wasm',
  ],
};
