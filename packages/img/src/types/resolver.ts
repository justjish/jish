import { MimeType } from "./file";
import { TransformOptions } from "./transformer";
export type Resolver<CustomResolverConfig> = (
  asset: string,
  url: string,
  options: TransformOptions,
  basePath: string,
  customConfig?: CustomResolverConfig
) => Promise<{
  buffer: Uint8Array;
  contentType: MimeType;
}>;
