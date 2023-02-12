import type { MimeType } from './file';
import type { TransformOptions } from './image';
export type Resolver = (
  asset: string,
  url: string,
  options: TransformOptions,
  basePath: string,
  pageAssets?: ASSETS,
) => Promise<{
  buffer: Uint8Array;
  contentType: MimeType;
  shouldTransform: boolean;
}>;
