import { createAssetHandler, createRequestHandler } from "./adapter";
import manifest from "__STATIC_CONTENT_MANIFEST";
import * as build from "@jish/remix";
const ASSET_MANIFEST = JSON.parse(manifest);
const handleAsset = createAssetHandler(ASSET_MANIFEST);
const handleRequest = createRequestHandler<Env>({
  build,
  getLoadContext(_request, env, ctx) {
    return {
      env,
      ctx,
      ASSET_MANIFEST,
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
      if (process.env.NODE_ENV === "development") throw e;
      return new Response("Internal Server Error",
        {
          status: 500,
        }
      );
    }
  },
} as ExportedHandler<Env>;
