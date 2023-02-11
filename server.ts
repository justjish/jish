import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env['NODE_ENV']!,
  getLoadContext(context) {
    return context.env;
  },
});

export const onRequest: PagesFunction = function (context) {
  return handleRequest(context);
};
