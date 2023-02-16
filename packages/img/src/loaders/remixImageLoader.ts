import { ClientLoader } from "../types/client";
import { encodeQuery } from "../utils/url";

export const remixImageLoader: ClientLoader = (
  src,
  loaderUrl,
  loaderOptions
) => {
  loaderUrl = loaderUrl ?? '/api/image';
  return encodeQuery(loaderUrl, {
    src: encodeURI(src),
    ...loaderOptions,
  });
};
