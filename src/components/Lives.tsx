import { FC, useCallback, useRef, useEffect } from 'react';
import { SpringValue, useSpring, config } from '@react-spring/web';
import { section } from 'styles/legacy';
import useMeasure from 'react-use-measure';
import useBounds from 'hooks/useBounds';
import { mergeRefs } from 'react-merge-refs';
import { LivesHeading } from 'components/LivesHeading';
import { LivesBackground } from 'components/LivesBackground';

const Lives: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [ref, bounds] = useMeasure();
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useBounds(useCallback((state) => state.setLives, []));
  useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds, updateBounds]);

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
