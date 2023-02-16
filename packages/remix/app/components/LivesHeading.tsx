import type { FC } from 'react';
import type { SpringValue } from '@react-spring/web';
import { useSpring, a } from '@react-spring/web';
import { h3, h3Inline } from '~/styles/legacy';
import { clsx } from 'clsx';

export const LivesHeading: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const { scale, y } = useSpring({
    scale: offset.to([2, 3], [2, 1]),
    y: offset.to([0, 1], [0, 1]),
    from: { scale: 10, y: 0 },
  });
  return (
    <a.div
      className={clsx(h3, 'absolute text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]')}
      style={{ scale, y }}
    >
      Based In <div className={h3Inline}>NYC</div>
    </a.div>
  );
};
