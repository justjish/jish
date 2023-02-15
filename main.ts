import * as build from './build';
import {
  type AppLoadContext,
  type ServerBuild,
  createRequestHandler as createRemixRequestHandler,
} from '@remix-run/cloudflare';
import { getAssetFromKV, MethodNotAllowedError, NotFoundError } from '@cloudflare/kv-asset-handler';
import manifest from '__STATIC_CONTENT_MANIFEST';
import png from 'vendor/remix-image/packages/remix-image-wasm/png.wasm';
import jpeg_enc from 'vendor/remix-image/packages/remix-image-wasm/jpeg_enc.wasm';
import jpeg_dec from 'vendor/remix-image/packages/remix-image-wasm/jpeg_dec.wasm';
import webp_enc from 'vendor/remix-image/packages/remix-image-wasm/webp_enc.wasm';
import webp_dec from 'vendor/remix-image/packages/remix-image-wasm/webp_dec.wasm';
import avif_enc from 'vendor/remix-image/packages/remix-image-wasm/avif_enc.wasm';
import avif_dec from 'vendor/remix-image/packages/remix-image-wasm/avif_dec.wasm';
import avif_enc_mt from 'vendor/remix-image/packages/remix-image-wasm/avif_enc_mt.wasm';

type RequestWithCloudFlare = RequestWithCf;
interface GetLoadContextFunction<Env = unknown> {
  (request: RequestWithCloudFlare, env: Env, ctx: ExecutionContext): AppLoadContext;
}

const createRequestHandler = <Env>({
  build,
  getLoadContext,
}: {
  build: ServerBuild;
  getLoadContext: GetLoadContextFunction<Env>;
}): ExportedHandlerFetchHandler<Env> => {
  const handleRequest = createRemixRequestHandler(build, process.env['NODE_ENV']);
  return (request: RequestWithCloudFlare, env: Env, ctx: ExecutionContext) => {
    return handleRequest(request, getLoadContext(request, env, ctx));
  };
};
const ASSET_MANIFEST = JSON.parse(manifest);
const handleAsset = async (request: Request, env: Env, ctx: ExecutionContext) => {
  try {
    return await getAssetFromKV(
      {
        request,
        waitUntil(promise: Promise<any>) {
          return ctx.waitUntil(promise);
        },
      },
      {
        cacheControl(request) {
          const url = new URL(request.url);

          if (url.pathname.startsWith('/build')) {
            return {
              browserTTL: 60 * 60 * 24 * 365,
              edgeTTL: 60 * 60 * 24 * 365,
            };
          }

          return {
            browserTTL: 60 * 10,
            edgeTTL: 60 * 10,
          };
        },
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST,
      },
    );
  } catch (e) {
    if (e instanceof MethodNotAllowedError || e instanceof NotFoundError)
      return new Response('Not Found', { status: 404 });
    throw e;
  }
};

const handleRequest = createRequestHandler<Env>({
  build,
  getLoadContext(_request, env, ctx) {
    return {
      env,
      ctx,
      ASSET_MANIFEST,
      wasm: {
        jpeg_enc,
        jpeg_dec,
        webp_enc,
        webp_dec,
        avif_enc,
        avif_dec,
        avif_enc_mt,
        png,
      },
    };
  },
});

export default {
  async fetch(request, env, ctx) {
    try {
      let res = await handleAsset(request, env, ctx);
      if (res.status === 404) res = await handleRequest(request, env, ctx);
      return res;
    } catch (e) {
      return new Response(process.env['NODE_ENV'] === 'development' ? `${e}` : 'Internal Server Error', {
        status: 500,
      });
    }
  },
} as ExportedHandler<Env>;
