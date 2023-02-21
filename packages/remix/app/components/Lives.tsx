import { type FC } from 'react';
import { SpringValue, useSpring, config } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { LivesHeading } from '~/components/LivesHeading';
import { LivesBackground } from '~/components/LivesBackground';
import { Section } from '~/ui/Section';

const Lives: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [ref, bounds] = useMeasure();
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
    <Section sectionKey="lives" ref={ref}>
      <LivesBackground scale={scale} y={y} />
      <LivesHeading offset={offset} />
    </Section>
  );
};

export default Lives;
