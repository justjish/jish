/// <reference types="@cloudflare/workers-types/experimental" />
/// <reference types="@types/node" />
declare interface Env {
  __STATIC_CONTENT: KVNamespace;
  IMAGE_KV: KVNamespace;
  SESSION_SECRET: string;
  NODE_ENV: "development" | "production" | "test";
}
// https://stackoverflow.com/questions/47008773/how-to-augment-process-env-in-typescript

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
  }
}

declare interface AppLoadContext {
  ASSET_MANIFEST: any;
  env: Env;
  ctx: ExecutionContext;
}

declare type RequestWithCloudflare = Request & { cf?: IncomingRequestCfProperties };
declare type RequestHandler = (request: RequestWithCloudflare, loadContext?: AppLoadContext) => Promise<Response>;

// Worker Specific
declare module '__STATIC_CONTENT_MANIFEST' {
  const manifestJSON: string;
  export default manifestJSON;
}
