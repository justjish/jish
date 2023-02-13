/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

declare interface CacheStorage {
  default: Cache;
}

declare var process: {
  env: { NODE_ENV: 'development' | 'production' };
};

declare module '__STATIC_CONTENT_MANIFEST' {
  const manifest: string;
  export default manifest;
}

declare interface Env {
  __STATIC_CONTENT: KVNamespace;
}
type RequestWithCf = Request & { cf?: IncomingRequestCfProperties };

declare interface AppLoadContext {
  env: Env;
  ctx: ExecutionContext;
}

declare module '@remix-run/server-runtime' {
  export * from '@remix-run/server-runtime/dist/index';
  import type { DataFunctionArgs as RemixDataFunctionArgs } from '@remix-run/server-runtime/dist/index';
  export interface DataFunctionArgs extends Omit<RemixDataFunctionArgs, 'context' | 'request'> {
    request: RequestWithCf;
    context: AppLoadContext;
  }
  export interface ActionFunction {
    (args: DataFunctionArgs): null | Response | Promise<Response>;
  }
  export interface LoaderFunction {
    (args: DataFunctionArgs): null | Response | Promise<Response>;
  }
}
