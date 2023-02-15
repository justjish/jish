import { createAssetHandler, createRequestHandler } from "./adapter";
import manifest from "__STATIC_CONTENT_MANIFEST";
import * as build from "remix-app";
const ASSET_MANIFEST = JSON.parse(manifest);

const handleAsset = createAssetHandler(ASSET_MANIFEST);
const handleRequest = createRequestHandler<Env>({
  build,
  getLoadContext(_request, env, ctx) {
    return {
      env,
      ctx,
      ASSET_MANIFEST,
      wasm: {
        // jpeg_enc,
        // jpeg_dec,
        // webp_enc,
        // webp_dec,
        // avif_enc,
        // avif_dec,
        // avif_enc_mt,
        // png,
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
      return new Response(
        process.env["NODE_ENV"] === "development"
          ? `${e}`
          : "Internal Server Error",
        {
          status: 500,
        }
      );
    }
  },
} as ExportedHandler<Env>;
