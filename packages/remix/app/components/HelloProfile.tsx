import { type FC } from 'react';
import { a, SpringValue } from '@react-spring/web';
import { AvifSources, WebpSources, PngSources, pngDefaultSrc, pngDefaultSrcSet } from '../data/ProfileImage';

export const HelloProfile: FC<{ opacity: SpringValue<number>; x: SpringValue<number> }> = ({ opacity, x }) => {
  return (
    <picture>
      {AvifSources()}
      {WebpSources()}
      {PngSources()}
      <a.img
        alt="sujish patel"
        className={'object-scale-down w-[120vw] sm:w-[90vw] lg:w-[50vw] 2xl:w-[40vw] center'}
        src={pngDefaultSrc}
        loading="eager"
        decoding={'async'}
        srcSet={pngDefaultSrcSet.map(({ file, w }) => `${file} ${w}w`).join(', ')}
        style={{ opacity,x }}
      />
    </picture>
  );
};