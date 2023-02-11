/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  serverModuleFormat: 'esm',
  server: './server.ts',
  serverBuildTarget: 'cloudflare-pages',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['.*'],
  serverDependenciesToBundle: ['react-merge-refs'],
};
