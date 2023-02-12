import type { FC } from 'react';
import type { SpringValue } from '@react-spring/web';
import { a } from '@react-spring/web';
import fbSDWebp from '~/assets/pictures/fullbody@0.25x.webp';
import { Image } from 'remix-image-cloudflare';
const AnimatedImage = a(Image);
export const HelloProfile: FC<{ opacity: SpringValue<number>; x: SpringValue<number> }> = ({ opacity, x }) => {
  return (
    <AnimatedImage
      className={'object-scale-down w-[120vw] sm:w-[90vw] lg:w-[50vw] 2xl:w-[40vw]'}
      src={fbSDWebp}
      responsive={[
        {
          size: {
            width: 400,
          },
          maxWidth: 640,
        },
        {
          size: {
            width: 800,
          },
        },
      ]}
      decoding="async"
      alt="sujish patel"
      style={{ opacity, x }}
    ></AnimatedImage>
  );
};
