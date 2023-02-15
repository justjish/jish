/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types/experimental" />
declare interface CacheStorage {
  default: Cache;
}
declare module '__STATIC_CONTENT_MANIFEST' {
  const manifest: string;
  export default manifest;
}
declare interface Env {
  __STATIC_CONTENT: KVNamespace;
  IMAGE_KV: KVNamespace<string>;
  SELF_URL: string;
}
type RequestWithCf = Request & { cf?: IncomingRequestCfProperties };
declare interface AppLoadContext {
  ASSET_MANIFEST: any;
  env: Env;
  ctx: ExecutionContext;
  wasm: {
    jpeg_enc: typeof JPEG_ENC_WASM;
    jpeg_dec: typeof JPEG_DEC_WASM;
    webp_enc: typeof WEBP_ENC_WASM;
    webp_dec: typeof WEBP_DEC_WASM;
    avif_enc: typeof AVIF_ENC_WASM;
    avif_enc_mt: typeof AVIF_ENC_WASM_MT;
    avif_dec: typeof AVIF_DEC_WASM;
    png: typeof PNG_WASM;
  };
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
