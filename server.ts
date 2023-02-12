import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';
export const handleRequest = createPagesFunctionHandler<Env>({
  build: build as Required<typeof build>, // Ensures 'exactOptionalPropertyTypes' is respected
  mode: process.env['NODE_ENV']!,
  getLoadContext: (context) => {
    return context.env;
  },
});
export const onRequest: PagesFunction<Env> = function (context) {
  return handleRequest(context);
};
