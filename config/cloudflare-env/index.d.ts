import type { KVNamespace, IncomingRequestCfProperties, ExecutionContext } from "@cloudflare/workers-types/experimental";
export interface Env {
  __STATIC_CONTENT: KVNamespace;
  IMAGE_KV: KVNamespace;
  SESSION_SECRET: string;
}
// https://stackoverflow.com/a/59499895
declare module globalThis {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
export interface AppLoadContext {
  ASSET_MANIFEST: any;
  env: Env;
  ctx: ExecutionContext;
  // wasm: {
  //   jpeg_enc: typeof JPEG_ENC_WASM;
  //   jpeg_dec: typeof JPEG_DEC_WASM;
  //   webp_enc: typeof WEBP_ENC_WASM;
  //   webp_dec: typeof WEBP_DEC_WASM;
  //   avif_enc: typeof AVIF_ENC_WASM;
  //   avif_enc_mt: typeof AVIF_ENC_WASM_MT;
  //   avif_dec: typeof AVIF_DEC_WASM;
  //   png: typeof PNG_WASM;
  // };
}

export type RequestWithCloudflare = Request & { cf?: IncomingRequestCfProperties };
export type RequestHandler = (
  request: RequestWithCloudflare,
  loadContext?: AppLoadContext
) => Promise<Response>;

export * from "@cloudflare/workers-types/experimental"