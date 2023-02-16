import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/server-runtime';
import { RequestInitCfPropertiesImage } from '@cloudflare/workers-types/experimental';
import { enums, assert, nullable, is, boolean, object,type } from 'superstruct';

const FormatStruct = enums(["avif" , "webp" , "jpeg" , "png" , "json"]);

// const TransformOptionsStruct = type({
//   format: nullable(FormatStruct),
//   fit: nullable(is("cover" , "contain" , "fill" , "inside" , "outside")),
// });

export const loader: LoaderFunction = async ({request,context, params}) => {
  const url = new URL(request.url);
  const imageProps: RequestInitCfPropertiesImage = {
    format: "avif",
  };
  const format = url.searchParams.get('format');
  const fit = url.searchParams.get('fit');
  return json({ ok: true });
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
