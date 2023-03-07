import { FC } from 'react';
import { SpringValue, a } from '@react-spring/web';
import { row } from '~/styles/legacy';
import svgFrame from '~/assets/graphics/cityFrameCircle.svg';

export const LivesBackground: FC<{ scale: SpringValue<1 | 3>; y: SpringValue<number> }> = ({ scale, y }) => (
  <div className={row}>
    <a.img className={'w-screen relative'} loading={'eager'} style={{ scale, y }} src={svgFrame} />
  </div>
);
