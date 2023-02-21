import { ClientLoader } from '../types/client';
import { ImagePosition } from '../types/transformer';

const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

const positionMap: Record<ImagePosition, string> = {
  'center bottom': '0.5x1',
  'center center': '0.5x0.5',
  'center top': '0.5x0',
  'left bottom': '0x1',
  'left center': '0x0.5',
  'left top': '0x0',
  'right bottom': '1x1',
  'right center': '1x0.5',
  'right top': '1x0',
  bottom: 'bottom',
  center: '0.5x0.5',
  left: 'left',
  right: 'right',
  top: 'top',
};

export const cloudflareWorkerImagesLoader: ClientLoader = (src, loaderUrl, loaderOptions) => {
  const params = new URLSearchParams();

  if (loaderOptions.background) {
    params.append(
      'background',
      `rgba(${loaderOptions.background[0]},${loaderOptions.background[1]},${loaderOptions.background[2]},${Number(
        loaderOptions.background[3] / 255,
      ).toFixed(2)})`,
    );
  }

  if (loaderOptions.crop) {
    params.append('trim',
      `${loaderOptions.crop.y};${loaderOptions.crop.x + loaderOptions.crop.width};${loaderOptions.crop.height};${
        loaderOptions.crop.x
      }`,
    );
  }

  if (loaderOptions.rotate) {
    params.append('rotate',`${loaderOptions.rotate}`);
  }

  if (loaderOptions.blurRadius) {
    params.append('blur',`${loaderOptions.blurRadius}`);
  }

  if (loaderOptions.fit === 'outside') {
    params.append('fit',`contain`);

    if (loaderOptions.width && loaderOptions.height) {
      params.append('width',`${Math.max(loaderOptions.width, loaderOptions.height)}`);
      params.append('height',`${Math.max(loaderOptions.width, loaderOptions.height)}`);
    } else if (loaderOptions.width) {
      params.append('width',`${loaderOptions.width}`);
    } else if (loaderOptions.height) {
      params.append('height',`${loaderOptions.height}`);
    }
  } else {
    if (loaderOptions.fit === 'contain') {
      params.append('fit',`pad`);
    } else if (loaderOptions.fit === 'cover') {
      params.append('fit',`cover`);
    } else if (loaderOptions.fit === 'fill') {
      params.append('fit',`fill`);
    } else if (loaderOptions.fit === 'inside') {
      params.append('fit',`contain`);
    }

    if (loaderOptions.width) {
      params.append('width',`${loaderOptions.width}`);
    }

    if (loaderOptions.height) {
      params.append('height',`${loaderOptions.height}`);
    }
  }

  if (loaderOptions.position) {
    params.append('gravity',`${positionMap[loaderOptions.position as ImagePosition] || '0.5x0.5'}`);
  }

  if (loaderOptions.quality) {
    params.append('quality',`${loaderOptions.quality}`);
  }
  if (src) {
    params.append('url',`${normalizeSrc(src)}`);
  }
  if (loaderOptions.contentType) {
    params.append('format',`${loaderOptions.contentType.split('/')[1]}`);
  }

  return `${loaderUrl ?? `/cdn-cgi/image`}/?${params.toString()}`;
};
