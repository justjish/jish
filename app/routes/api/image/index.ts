import type { LoaderFunction } from '@remix-run/cloudflare';
import { LoaderConfig, TransformOptions } from '~/image-lib/server/types';
import { imageLoader, KVCache, Resolver, cloudflareResolver, kvResolver } from '~/image-lib/server';
import { IMAGE_DOMAINS_WHITELIST } from '~/utils/constants';

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
  await context.IMAGE_KV.put('test', 'test');
  context.ASSETS;
  const config: LoaderConfig = {
    selfUrl: context.SELF_URL,
    cache: new KVCache({ namespace: context.IMAGE_KV }),
    resolver: createResolver(IMAGE_DOMAINS_WHITELIST, context.ASSETS),
    transformer: null,
    rewrite: null,
  };
  return imageLoader(config, request);
};
