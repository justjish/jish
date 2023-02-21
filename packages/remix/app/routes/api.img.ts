import type { LoaderFunction } from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/server-runtime';
import { RequestInitCfPropertiesImage } from '@cloudflare/workers-types/experimental';
import { enums, assert, nullable, is, boolean, object, type } from 'superstruct';
import { HOST } from '~/utils/constants';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const FormatStruct = enums(['avif', 'webp', 'jpeg', 'png', 'json']);

// const TransformOptionsStruct = type({
//   format: nullable(FormatStruct),
//   fit: nullable(is("cover" , "contain" , "fill" , "inside" , "outside")),
// });

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const url = new URL(request.url);
  const img: RequestInitCfPropertiesImage = {};
  if (url.searchParams.has('fit')) img['fit'] = url.searchParams.get('fit') as "contain" | "cover" | "scale-down" | "crop" | "pad";
  if (url.searchParams.has('width')) img['width'] = parseInt(url.searchParams.get('width')!);
  if (url.searchParams.has('height')) img['height'] = parseInt(url.searchParams.get('height')!);
  // if (url.searchParams.has('quality')) img['quality'] = parseInt(url.searchParams.get('quality')!);
  const accept = request.headers.get("Accept");
  if (/image\/avif/.test(accept??"")) {
    img['format'] = 'avif';
  } else if (/image\/webp/.test(accept??"")) {
    img['format'] = 'webp';
  }

  // if (url.searchParams.has('background')) img['background'] = url.searchParams.get('background');
  
  // if (url.searchParams.has('rotate')) img['rotate'] = parseInt(url.searchParams.get('rotate')!);
  // if (url.searchParams.has('blur')) img['blur'] = parseInt(url.searchParams.get('blur')!);
  // if (url.searchParams.has('trim')) img['trim'] = url.searchParams.get('trim')!;
  // if (url.searchParams.has('gravity')) img['gravity'] = url.searchParams.get('gravity')!;
  
  const asset = new URL(`${HOST}/${url.searchParams.get('url')}`);
  const assetRequest = new Request(asset.toString(), { headers: request.headers, cf: { image: img } });
  return await getAssetFromKV(
    {
      request:assetRequest,
      waitUntil(promise: Promise<any>) {
        return context.ctx.waitUntil(promise);
      },
    },
    {
      cacheControl:{
      },
      ASSET_NAMESPACE: context.env.__STATIC_CONTENT,
      ASSET_MANIFEST: context.ASSET_MANIFEST,
    }
  );
  // context;
  // try {
  //   const transformer = createWasmTransformer({
  //     modules: {
  //       pngWasm: context.wasm.png,
  //       avifDecWasm: context.wasm.avif_dec,
  //       avifEncWasm: context.wasm.avif_enc,
  //       avifEncWasmMt: context.wasm.avif_enc_mt,
  //       jpegDecWasm: context.wasm.jpeg_dec,
  //       jpegEncWasm: context.wasm.jpeg_enc,
  //       webpDecWasm: context.wasm.webp_dec,
  //       webpEncWasm: context.wasm.webp_enc,
  //     },
  //   });
  //   return imageLoader(
  //     {
  //       selfUrl: context.env?.SELF_URL ?? 'https://example.com',
  //       cache: new kvCache({ cache: context.env.IMAGE_KV }),
  //       resolver: cfResolver({
  //         handleAssetOptions: { ASSET_MANIFEST: context.ASSET_MANIFEST, ASSET_NAMESPACE: context.env.__STATIC_CONTENT },
  //       }),
  //       transformer: transformer,
  //       verbose: true,
  //     },
  //     request,
  //   );
  // } catch (e) {
  //   console.error(e);
  //   return new Response(e instanceof Error ? e.message : 'Unknown Internal Error', { status: 500 });
  // }
};
