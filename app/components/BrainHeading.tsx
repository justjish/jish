import { type FC } from 'react';
import type { SpringValue } from '@react-spring/web';
import { useSpring, a } from '@react-spring/web';
import { h3, h3Inline } from '~/styles/legacy';
import { clsx } from 'clsx';

// By adding the media query in component, then attaching it's value to the spring,
// you can get animations as the browser triggers media query breakpoints.
export const BrainHeading: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const { scale } = useSpring({ scale: offset.to([1, 2], [2, 1]), from: { scale: 1 } });
  return (
    <a.div className={clsx(h3, 'text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]')} style={{ scale }}>
      an <a.div className={h3Inline}>EXPANSIVE </a.div>skillset
    </a.div>
  );
};
