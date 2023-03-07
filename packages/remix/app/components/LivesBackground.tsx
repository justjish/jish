import { FC } from 'react';
import { type SpringValue } from '@react-spring/web';
import { row } from '~/styles/legacy';
import City from '~/svgs/City';

export const LivesBackground: FC<{ scale: SpringValue<1 | 3>; y: SpringValue<number> }> = ({ scale, y }) => (
  <div className={row}>
    <City className={'w-screen relative will-change-transform'} style={{ scale, y }} />
  </div>
);
