import { createRequestHandler as createRemixRequestHandler } from '@remix-run/cloudflare';
import type { AppLoadContext, RequestHandler, ServerBuild } from '@remix-run/server-runtime';
import { getAssetFromKV, MethodNotAllowedError, NotFoundError } from '@cloudflare/kv-asset-handler';

interface GetLoadContextFunction<Env = unknown> {
  (request: RequestWithCloudflare, env: Env, ctx: ExecutionContext): AppLoadContext;
}
export const createRequestHandler = <Env>({
  build,
  getLoadContext,
}: {
  build: ServerBuild | Omit<ServerBuild, 'dev'>;
  getLoadContext: GetLoadContextFunction<Env>;
}): ExportedHandlerFetchHandler<Env> => {
  const handleRequest = createRemixRequestHandler(build, process.env.NODE_ENV) as RequestHandler;
  return (request: RequestWithCloudflare, env: Env, ctx: ExecutionContext) => {
    return handleRequest(request, getLoadContext(request, env, ctx));
  };
};

export const createAssetHandler = (ASSET_MANIFEST: any) => {
  return async (request: Request, env: Env, ctx: ExecutionContext) => {
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
      if (e instanceof MethodNotAllowedError || e instanceof NotFoundError) {
        return new Response('Not Found', { status: 404 });
      } else {
        throw e;
      }
    }
  };
};
