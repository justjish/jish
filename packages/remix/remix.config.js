/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  serverModuleFormat: 'esm',
  serverPlatform: "neutral",
  future: {
    unstable_tailwind: true,
    v2_routeConvention: true,
  },
  devServerPort: 8002,
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: ["superstruct", "react-merge-refs"],
};
