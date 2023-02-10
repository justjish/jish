import { type FC } from 'react';
import { SpringValue, a, useSpring, config } from '@react-spring/web';
import { h3, h3Inline } from 'styles/legacy';
import { useMedia } from 'hooks/useMedia';
import { clsx } from 'clsx';
import screenSizes from 'data/screenSizes';
import { useStorySnapshot } from 'context/StoryContext';

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
  const mqFont = useMedia(screenSizes, ['4rem', '3.5rem', '3rem'], '2rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  return (
    <a.div className={clsx(h3, 'z-[1] absolute')} style={{ scale, fontSize, y }}>
      with
      <div className={h3Inline}>Years</div> of Experience
    </a.div>
  );
};
