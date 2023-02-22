/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  serverModuleFormat: 'esm',
  
  serverPlatform: "neutral",
  serverConditions: ["worker", "import", "module","default"],
  serverMainFields: ["module", "main"],
  serverTarget: "es2019",
  future: {
    unstable_tailwind: true,
    v2_routeConvention: true,
  },
  devServerPort: 8002,
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: 'all',
};
