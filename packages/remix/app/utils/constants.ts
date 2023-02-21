export const DOMAINS = process.env['NODE_ENV'] === 'production' ? ['jish.dev', 'jish.pages.dev'] : ['localhost'];
export const HOST = process.env['NODE_ENV'] === 'production' ? 'https://jish.dev' : 'http://192.168.86.161:8787';
export const IMAGE_DOMAINS_WHITELIST = new Set([
  ...DOMAINS,
  'images.unsplash.com',
  'assets.blogody.com',
  'i.picsum.photos',
  'fastly.picsum.photos',
]);

export const SECTIONS = ["hello","story","brain","lives","learn"] as const
export type SectionType = "hello"|"story"|"brain"|"lives"|"learn"