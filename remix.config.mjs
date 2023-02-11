/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  serverModuleFormat: 'esm',
  future: {
    unstable_dev: true,
  },
  server: './server.ts',
  serverBuildTarget: 'cloudflare-pages',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['.*'],
  serverDependenciesToBundle: ['react-merge-refs'],
};
