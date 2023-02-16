import { type Options as KvAssetHandlerOptions,getAssetFromKV, NotFoundError } from "@cloudflare/kv-asset-handler";
import isSvg from "is-svg";
import mimeFromBuffer from "mime-tree";
import { MimeType, ImageError, UnsupportedImageError } from "../../types";
import type { Resolver } from "../../types/resolver";

export interface FetchEvent {
  request: Request;
  waitUntil: (params: unknown) => Promise<void>;
}

const noOp = async () => {};

export type ServiceWorker = Partial<KvAssetHandlerOptions>;
export type ModuleWorker = ServiceWorker & {
  ASSET_MANIFEST: KvAssetHandlerOptions["ASSET_MANIFEST"];
  ASSET_NAMESPACE: KvAssetHandlerOptions["ASSET_NAMESPACE"];
};
export type HandleAssetOptions = ServiceWorker | ModuleWorker;
export type KvResolverConfig = {handleAssetOptions: HandleAssetOptions};

const handleAsset = (
  event: FetchEvent,
  options: HandleAssetOptions = {}
): Promise<Response> => {
  if (
    typeof process !== "undefined" &&
    process?.env?.["NODE_ENV"] === "development"
  ) {
    options["cacheControl"] = {
      bypassCache: true,
    };
    return getAssetFromKV(event, { ...options });
  }
  const url = new URL(event.request.url);
  const assetpath = "/build";
  const requestpath = url.pathname.split("/").slice(0, -1).join("/");

  if (
    requestpath.startsWith(assetpath) &&
    options["cacheControl"] === undefined
  ) {
    options["cacheControl"] = {
      bypassCache: false,
      edgeTTL: 31536000,
      browserTTL: 31536000,
    };
  }

  return getAssetFromKV(event, {
    ...options,
  });
};

export const kvResolver: Resolver<KvResolverConfig> = async (
  _asset,
  url,
  _options,
  _basePath,
  customConfig
) => {
  const imgRequest = new Request(url);
  const imageResponse = await handleAsset(
    {
      request: imgRequest,
      waitUntil: noOp,
    },
    {...customConfig?.handleAssetOptions}
  );

  if (!imageResponse) {
    throw new NotFoundError("Image not found!");
  }

  const arrBuff = await imageResponse.arrayBuffer();

  if (!arrBuff || arrBuff.byteLength < 2) {
    throw new ImageError("Invalid image retrieved from resolver!");
  }

  const buffer = new Uint8Array(arrBuff);
  let contentType: MimeType | null = null;
  try {
    contentType = mimeFromBuffer(buffer);
  } catch (error) {
    if (isSvg(new TextDecoder().decode(buffer))) {
      contentType = MimeType.SVG;
    } else {
      throw new UnsupportedImageError("Buffer is not a supported image type!");
    }
  }

  return {
    buffer,
    contentType,
  };
};
