import { FC } from 'react';
import { SpringValue, a, useSpring } from '@react-spring/web';
import fbSDWebp from '~/assets/pictures/fullbody@0.25x.webp';
import fbHQPng from '~/assets/pictures/fullbody@0.5x.png';
import fbSDPng from '~/assets/pictures/fullbody@0.25x.png';
import { useMedia } from '~/hooks/useMedia';
import screenSizes from '~/data/screenSizes';

export const HelloProfile: FC<{ opacity: SpringValue<number>; x: SpringValue<number> }> = ({ opacity, x }) => {
  const size = useMedia(screenSizes, ['40vw', '50vw', '90vw'], '120vw');
  const [{ width }] = useSpring({ width: size }, [size]);
  return (
    <a.img
      className={'object-scale-down'}
      srcSet={`${fbSDWebp} .5x, ${fbHQPng} 1.5x, ${fbSDPng} .5x`}
      src={fbSDWebp}
      alt="sujish patel"
      style={{ opacity, width, x }}
    ></a.img>
  );
};
