import { FC } from 'react';
import { SpringValue, a, useSpring } from 'react-spring';
import { css } from '@emotion/react';
import fullbodyWebP from 'assets/pictures/fullbody@0.5x.webp';
import { useMedia } from 'hooks/useMedia';
import screenSizes from 'data/screenSizes';

const style = css`
  object-fit: scale-down;

`;

export const HelloProfile: FC<{ opacity: SpringValue<number>}> = ({ opacity }) => {
  const size = useMedia(screenSizes, ['40vw', '50vw', '90vw'], '120vw');
  const [{ width }] = useSpring({ width: size }, [size]);
  return <a.img css={style} src={fullbodyWebP} style={{ opacity, width }}></a.img>
};
