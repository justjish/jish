import { type ServerBuild } from '@remix-run/cloudflare';
declare module 'index' {
  const build: ServerBuild;
  export default build;
}
