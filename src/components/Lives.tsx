import { type FC, useRef, useEffect } from 'react';
import { SpringValue, useSpring, config } from '@react-spring/web';
import { section } from 'styles/legacy';
import useMeasure from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';
import { LivesHeading } from 'components/LivesHeading';
import { LivesBackground } from 'components/LivesBackground';
import { useMenuState } from 'hooks/useMenu';

const Lives: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [ref, bounds] = useMeasure();
  const localRef = useRef<HTMLDivElement>(null);
  const { setLives } = useMenuState();
  useEffect(() => setLives({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 300 }), [bounds, setLives]);

  const [{ scale }] = useSpring(
    { scale: offset.to({ range: [2, 4], output: [3, 1], extrapolate: 'clamp' }), config: config.molasses },
    [],
  );
  const [{ y }] = useSpring(
    {
      y: offset.to({ range: [2.5, 3.5], output: [-bounds.height, bounds.height], extrapolate: 'clamp' }),
      config: config.slow,
    },
    [bounds.height],
  );
  return (
    <div className={section} ref={mergeRefs([localRef, ref])}>
      <LivesBackground scale={scale} y={y} />
      <LivesHeading offset={offset} />
    </div>
  );
};

export default Lives;
