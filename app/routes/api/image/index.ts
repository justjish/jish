import type { LoaderFunction } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/server-runtime';
import { LoaderConfig, TransformOptions } from '~/image-lib/server/types';
import { imageLoader, KVCache, Resolver, cloudflareResolver, kvResolver } from '~/image-lib/server';
import { IMAGE_DOMAINS_WHITELIST } from '~/utils/constants';
import { decodeQuery } from '~/image-lib/component/utils/url';
import { parseURL } from '~/image-lib/server/utils/url';

const createResolver =
  (whitelistedDomains: Set<string>, pageAssets: ASSETS): Resolver =>
  async (asset: string, url: string, options: TransformOptions, basePath: string) => {
    if (asset.startsWith('/') && (asset.length === 1 || asset[1] !== '/')) {
      return kvResolver(asset, url, options, basePath, pageAssets);
    } else {
      if (!whitelistedDomains.has(new URL(url).host)) {
        throw new Error('Domain not allowed!');
      }
      return cloudflareResolver(asset, url, options, basePath, pageAssets);
    }
  };

export const loader: LoaderFunction = async ({ request, context }) => {
  const reqUrl = new URL(request.url);
  const reqUri = decodeQuery(reqUrl.searchParams, 'src')!;
  const src = decodeURI(reqUri);
  const assetUrl = parseURL(src, reqUrl.origin);
  return redirect(assetUrl.href, { cf: { image: { width: 300, format: 'avif', fit: 'scale-down' } } });
  // console.log('assetUrl', assetUrl);
  // const assetRes = context.ASSETS.fetch(assetUrl, { headers: request.headers });
  // console.log('assetRes', assetRes);
  // const optimize = await fetch(assetUrl.href, {
  //   cf: { image: { width: 300, format: 'avif', fit: 'scale-down' } },
  //   headers: request.headers,
  // });

  // return optimize;
};
