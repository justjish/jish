/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@jish/cloudflare-env" />
/// <reference types="csstype" />
interface CacheStorage {
  default: Cache;
}

declare module '@remix-run/server-runtime' {
  export * from '@remix-run/server-runtime/dist/index';
  import type { DataFunctionArgs as RemixDataFunctionArgs } from '@remix-run/server-runtime/dist/index';
  export interface DataFunctionArgs extends Omit<RemixDataFunctionArgs, 'context' | 'request'> {
    request: RequestWithCloudflare;
    context: AppLoadContext;
  }
  export interface ActionFunction {
    (args: DataFunctionArgs): null | Response | Promise<Response>;
  }
  export interface LoaderFunction {
    (args: DataFunctionArgs): null | Response | Promise<Response>;
  }
}
