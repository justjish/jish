/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  // Required by the worker adapter
  __STATIC_CONTENT: string;
}

/// <reference types="@remix-run/dev" />

interface LoadContext {
  env: Env;
}

declare module '@remix-run/cloudflare' {
  import type {
    DataFunctionArgs as RemixDataFunctionArgs,
    AppLoadContext as RemixAppLoadContext,
  } from '@remix-run/cloudflare/dist/index';
  export * from '@remix-run/cloudflare/dist/index';
  export interface AppLoadContext extends RemixAppLoadContext {
    env: Env;
    ctx: ExecutionContext;
  }
  export interface DataFunctionArgs extends Omit<RemixDataFunctionArgs, 'context'> {
    context: LoadContext;
  }
}
