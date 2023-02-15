import type { LoaderFunction } from '@remix-run/cloudflare';
import {
  imageLoader,
  kvResolver,
  KvResolverConfig,
  fetchResolver,
  kvCache,
  Resolver,
} from 'vendor/remix-image/packages/remix-image/build/server/pure';
import { createWasmTransformer } from 'vendor/remix-image/packages/remix-image-wasm';
export const cfResolver = (kvResolverConfig: KvResolverConfig): Resolver<KvResolverConfig> => {
  return async (asset, url, options, basePath) => {
    if (asset.startsWith('/') && (asset.length === 1 || asset[1] !== '/')) {
      return kvResolver(asset, url, options, basePath, kvResolverConfig);
    } else {
      return fetchResolver(asset, url, options, basePath);
    }
  };
};

export const loader: LoaderFunction = async ({ request, context }) => {
  context;
  try {
    const transformer = createWasmTransformer({
      modules: {
        pngWasm: context.wasm.png,
        avifDecWasm: context.wasm.avif_dec,
        avifEncWasm: context.wasm.avif_enc,
        avifEncWasmMt: context.wasm.avif_enc_mt,
        jpegDecWasm: context.wasm.jpeg_dec,
        jpegEncWasm: context.wasm.jpeg_enc,
        webpDecWasm: context.wasm.webp_dec,
        webpEncWasm: context.wasm.webp_enc,
      },
    });
    return imageLoader(
      {
        selfUrl: context.env?.SELF_URL ?? 'https://example.com',
        cache: new kvCache({ cache: context.env.IMAGE_KV }),
        resolver: cfResolver({
          handleAssetOptions: { ASSET_MANIFEST: context.ASSET_MANIFEST, ASSET_NAMESPACE: context.env.__STATIC_CONTENT },
        }),
        transformer: transformer,
        verbose: true,
      },
      request,
    );
  } catch (e) {
    console.error(e);
    return new Response(e instanceof Error ? e.message : 'Unknown Internal Error', { status: 500 });
  }
};
