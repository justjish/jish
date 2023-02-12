export const DOMAINS = process.env.NODE_ENV === 'production' ? ['jish.dev', 'jish.pages.dev'] : ['localhost'];
export const IMAGE_DOMAINS_WHITELIST = new Set([
  ...DOMAINS,
  'images.unsplash.com',
  'assets.blogody.com',
  'i.picsum.photos',
  'fastly.picsum.photos',
]);
