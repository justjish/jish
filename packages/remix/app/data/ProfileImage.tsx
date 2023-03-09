import avif300w1x from '~/assets/pictures/fullbody-ly-300w-1x.avif';
import avif600w2x from '~/assets/pictures/fullbody-ly-600w-2x.avif';
import avif900w3x from '~/assets/pictures/fullbody-ly-900w-3x.avif';
import avif600w1x from '~/assets/pictures/fullbody-ly-600w-1x.avif';
import avif1200w2x from '~/assets/pictures/fullbody-ly-1200w-2x.avif';
import avif1800w3x from '~/assets/pictures/fullbody-ly-1800w-3x.avif';
import avif700w1x from '~/assets/pictures/fullbody-ly-700w-1x.avif';
import avif1400w2x from '~/assets/pictures/fullbody-ly-1400w-2x.avif';
import avif2100w3x from '~/assets/pictures/fullbody-ly-2100w-3x.avif';
import avif950w1x from '~/assets/pictures/fullbody-ly-950w-1x.avif';
import avif1900w2x from '~/assets/pictures/fullbody-ly-1900w-2x.avif';
import avif2850w3x from '~/assets/pictures/fullbody-ly-2850w-3x.avif';
import avif640w1x from '~/assets/pictures/fullbody-ly-640w-1x.avif';
import avif1280w2x from '~/assets/pictures/fullbody-ly-1280w-2x.avif';
import avif1920w3x from '~/assets/pictures/fullbody-ly-1920w-3x.avif';
import webp300w1x from '~/assets/pictures/fullbody-ly-300w-1x.webp';
import webp600w2x from '~/assets/pictures/fullbody-ly-600w-2x.webp';
import webp900w3x from '~/assets/pictures/fullbody-ly-900w-3x.webp';
import webp600w1x from '~/assets/pictures/fullbody-ly-600w-1x.webp';
import webp1200w2x from '~/assets/pictures/fullbody-ly-1200w-2x.webp';
import webp1800w3x from '~/assets/pictures/fullbody-ly-1800w-3x.webp';
import webp700w1x from '~/assets/pictures/fullbody-ly-700w-1x.webp';
import webp1400w2x from '~/assets/pictures/fullbody-ly-1400w-2x.webp';
import webp2100w3x from '~/assets/pictures/fullbody-ly-2100w-3x.webp';
import webp950w1x from '~/assets/pictures/fullbody-ly-950w-1x.webp';
import webp1900w2x from '~/assets/pictures/fullbody-ly-1900w-2x.webp';
import webp2850w3x from '~/assets/pictures/fullbody-ly-2850w-3x.webp';
import webp640w1x from '~/assets/pictures/fullbody-ly-640w-1x.webp';
import webp1280w2x from '~/assets/pictures/fullbody-ly-1280w-2x.webp';
import webp1920w3x from '~/assets/pictures/fullbody-ly-1920w-3x.webp';
import png300w1x from '~/assets/pictures/fullbody-ll-300w-1x.png';
import png600w2x from '~/assets/pictures/fullbody-ll-600w-2x.png';
import png900w3x from '~/assets/pictures/fullbody-ll-900w-3x.png';
import png600w1x from '~/assets/pictures/fullbody-ll-600w-1x.png';
import png1200w2x from '~/assets/pictures/fullbody-ll-1200w-2x.png';
import png1800w3x from '~/assets/pictures/fullbody-ll-1800w-3x.png';
import png700w1x from '~/assets/pictures/fullbody-ll-700w-1x.png';
import png1400w2x from '~/assets/pictures/fullbody-ll-1400w-2x.png';
import png2100w3x from '~/assets/pictures/fullbody-ll-2100w-3x.png';
import png950w1x from '~/assets/pictures/fullbody-ll-950w-1x.png';
import png1900w2x from '~/assets/pictures/fullbody-ll-1900w-2x.png';
import png2850w3x from '~/assets/pictures/fullbody-ll-2850w-3x.png';
import png640w1x from '~/assets/pictures/fullbody-ll-640w-1x.png';
import png1280w2x from '~/assets/pictures/fullbody-ll-1280w-2x.png';
import png1920w3x from '~/assets/pictures/fullbody-ll-1920w-3x.png';

export const pngSources = [
  {
    id: '2xs',
    minW: 300,
    srcSet: [
      { file: png300w1x, w: 300 },
      { file: png600w2x, w: 600 },
      { file: png900w3x, w: 900 },
    ],
    sizes: '120vw',
  },
  {
    id: 'xs',
    minW: 480,
    srcSet: [
      { file: png600w1x, w: 600 },
      { file: png1200w2x, w: 1200 },
      { file: png1800w3x, w: 1800 },
    ],
    sizes: '120vw',
  },
  {
    id: 'sm',
    minW: 640,
    srcSet: [
      { file: png600w1x, w: 600 },
      { file: png1200w2x, w: 1200 },
      { file: png1800w3x, w: 1800 },
    ],
    sizes: '90vw',
  },
  {
    id: 'md',
    minW: 768,
    srcSet: [
      { file: png700w1x, w: 700 },
      { file: png1400w2x, w: 1400 },
      { file: png2100w3x, w: 2100 },
    ],
    sizes: '90vw',
  },
  {
    id: 'lg',
    minW: 1024,
    srcSet: [
      { file: png950w1x, w: 950 },
      { file: png1900w2x, w: 1900 },
      { file: png2850w3x, w: 2850 },
    ],
    sizes: '50vw',
  },
  {
    id: 'xl',
    minW: 1280,
    srcSet: [
      { file: png640w1x, w: 640 },
      { file: png1280w2x, w: 1280 },
      { file: png1920w3x, w: 1920 },
    ],
    sizes: '50vw',
  },
  {
    id: '2xl',
    minW: 1536,
    srcSet: [
      { file: png700w1x, w: 700 },
      { file: png1400w2x, w: 1400 },
      { file: png2100w3x, w: 2100 },
    ],
    sizes: '40vw',
  },
];


export const pngDefaultSrc = png600w1x;
export const pngDefaultSrcSet = pngSources[3]?.srcSet!;

const webpSources = [
  {
    id: '2xs',
    minW: 300,
    srcSet: [
      { file: webp300w1x, w: 300 },
      { file: webp600w2x, w: 600 },
      { file: webp900w3x, w: 900 },
    ],
    sizes: '120vw',
  },
  {
    id: 'xs',
    minW: 480,
    srcSet: [
      { file: webp600w1x, w: 600 },
      { file: webp1200w2x, w: 1200 },
      { file: webp1800w3x, w: 1800 },
    ],
    sizes: '120vw',
  },
  {
    id: 'sm',
    minW: 640,
    srcSet: [
      { file: webp600w1x, w: 600 },
      { file: webp1200w2x, w: 1200 },
      { file: webp1800w3x, w: 1800 },
    ],
    sizes: '90vw',
  },
  {
    id: 'md',
    minW: 768,
    srcSet: [
      { file: webp700w1x, w: 700 },
      { file: webp1400w2x, w: 1400 },
      { file: webp2100w3x, w: 2100 },
    ],
    sizes: '90vw',
  },
  {
    id: 'lg',
    minW: 1024,
    srcSet: [
      { file: webp950w1x, w: 950 },
      { file: webp1900w2x, w: 1900 },
      { file: webp2850w3x, w: 2850 },
    ],
    sizes: '50vw',
  },
  {
    id: 'xl',
    minW: 1280,
    srcSet: [
      { file: webp640w1x, w: 640 },
      { file: webp1280w2x, w: 1280 },
      { file: webp1920w3x, w: 1920 },
    ],
    sizes: '50vw',
  },
  {
    id: '2xl',
    minW: 1536,
    srcSet: [
      { file: webp700w1x, w: 700 },
      { file: webp1400w2x, w: 1400 },
      { file: webp2100w3x, w: 2100 },
    ],
    sizes: '40vw',
  },
];

const avifSources = [
  {
    id: '2xs',
    minW: 300,
    srcSet: [
      { file: avif300w1x, w: 300 },
      { file: avif600w2x, w: 600 },
      { file: avif900w3x, w: 900 },
    ],
    sizes: '120vw',
  },
  {
    id: 'xs',
    minW: 480,
    srcSet: [
      { file: avif600w1x, w: 600 },
      { file: avif1200w2x, w: 1200 },
      { file: avif1800w3x, w: 1800 },
    ],
    sizes: '120vw',
  },
  {
    id: 'sm',
    minW: 640,
    srcSet: [
      { file: avif600w1x, w: 600 },
      { file: avif1200w2x, w: 1200 },
      { file: avif1800w3x, w: 1800 },
    ],
    sizes: '90vw',
  },
  {
    id: 'md',
    minW: 768,
    srcSet: [
      { file: avif700w1x, w: 700 },
      { file: avif1400w2x, w: 1400 },
      { file: avif2100w3x, w: 2100 },
    ],
    sizes: '90vw',
  },
  {
    id: 'lg',
    minW: 1024,
    srcSet: [
      { file: avif950w1x, w: 950 },
      { file: avif1900w2x, w: 1900 },
      { file: avif2850w3x, w: 2850 },
    ],
    sizes: '50vw',
  },
  {
    id: 'xl',
    minW: 1280,
    srcSet: [
      { file: avif640w1x, w: 640 },
      { file: avif1280w2x, w: 1280 },
      { file: avif1920w3x, w: 1920 },
    ],
    sizes: '50vw',
  },
  {
    id: '2xl',
    minW: 1536,
    srcSet: [
      { file: avif700w1x, w: 700 },
      { file: avif1400w2x, w: 1400 },
      { file: avif2100w3x, w: 2100 },
    ],
    sizes: '40vw',
  },
];
export const AvifSources = () =>
  avifSources.map(({ id, minW, srcSet, sizes }) => {
    return (
      <source
        key={`${id}-avif-${minW}-${sizes}`}
        media={`(min-width: ${minW}px)`}
        srcSet={srcSet.map(({ file, w }) => `${file} ${w}w`).join(', ')}
        type="image/avif"
      />
    );
  });

export const WebpSources = () =>
  webpSources.map(({ id, minW, srcSet, sizes }) => {
    return (
      <source
        key={`${id}-webp-${minW}-${sizes}`}
        media={`(min-width: ${minW}px)`}

        srcSet={srcSet.map(({ file, w }) => `${file} ${w}w`).join(', ')}
        type="image/webp"
      />
    );
  });
export const PngSources = () =>
  pngSources.map(({ id, minW, srcSet, sizes }) => {
    return (
      <source
        key={`${id}-png-${minW}-${sizes}`}
        media={`(min-width: ${minW}px)`}

        srcSet={srcSet.map(({ file, w }) => `${file} ${w}w`).join(', ')}
        type="image/png"
      />
    );
  });