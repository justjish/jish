import { TransformOptions } from "./transformer";

export type ClientLoader = (
  src: string,
  loaderUrl: string | undefined,
  loaderOptions: TransformOptions
) => string;
