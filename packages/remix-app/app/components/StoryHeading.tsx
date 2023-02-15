import { type FC } from 'react';
import type { SpringValue } from '@react-spring/web';
import { a, useSpring, config } from '@react-spring/web';
import { h3, h3Inline } from '~/styles/legacy';
import { clsx } from 'clsx';
import { useStorySnapshot } from '~/hooks/useStory';

export const StoryHeading: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const snapshot = useStorySnapshot();
  const [{ scale, y }] = useSpring(
    snapshot.selected === null
      ? {
          scale: offset.to([0, 1], [2, 1]),
          y: offset.to([0, 1], [0, 200]),
          from: { scale: 10, y: 0 },
        }
      : {
          scale: 0,
          y: 500,
          config: config.slow,
        },
    [snapshot, offset],
  );
  return (
    <a.div
      className={clsx(h3, 'z-[1] absolute text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]')}
      style={{ scale, y }}
    >
      with
      <div className={h3Inline}>Years</div> of Experience
    </a.div>
  );
};
