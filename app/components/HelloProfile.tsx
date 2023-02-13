import type { FC } from 'react';
import type { SpringValue } from '@react-spring/web';
import { a } from '@react-spring/web';
import fbSDWebp from '~/assets/pictures/fullbody@0.25x.webp';
import fbHQPng from '~/assets/pictures/fullbody@0.5x.png';
import fbSDPng from '~/assets/pictures/fullbody@0.25x.png';
export const HelloProfile: FC<{ opacity: SpringValue<number>; x: SpringValue<number> }> = ({ opacity, x }) => {
  return (
    <a.img
      className={'object-scale-down w-[120vw] sm:w-[90vw] lg:w-[50vw] 2xl:w-[40vw]'}
      srcSet={`${fbSDWebp} .5x, ${fbHQPng} 1.5x, ${fbSDPng} .5x`}
      src={fbSDWebp}
      alt="sujish patel"
      style={{ opacity, x }}
    />
  );
};
