/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  // Required by the worker adapter
  __STATIC_CONTENT: string;
}

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext {
    env: Env;
    ctx: ExecutionContext;
  }
}
