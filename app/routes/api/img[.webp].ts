import type { LoaderFunction } from '@remix-run/cloudflare';

const url = new URL('https://upload.wikimedia.org/wikipedia/commons/3/3d/LARGE_elevation.jpg');
export const loader: LoaderFunction = async ({ request, context }) => {
  const resize = await fetch(url.href, {
    cf: { image: { width: 300, format: 'webp', fit: 'scale-down' } },
    headers: request.headers,
  });

  return resize;
  // console.log('assetUrl', assetUrl);
  // const assetRes = context.ASSETS.fetch(assetUrl, { headers: request.headers });
  // console.log('assetRes', assetRes);
  // const optimize = await fetch(assetUrl.href, {
  //   cf: { image: { width: 300, format: 'avif', fit: 'scale-down' } },
  //   headers: request.headers,
  // });

  // return optimize;
};
