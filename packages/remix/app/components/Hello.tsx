import { type FC } from 'react';
import { a, config, SpringValue, useSpring } from '@react-spring/web';
import { box } from '~/styles/legacy';
import { HelloHeading } from '~/components/HelloHeading';
import { HelloProfile } from '~/components/HelloProfile';
import { HelloScrollDown } from './HelloScrollDown';
import { Section } from '~/ui/Section';

/**
 * Hello
 *
 * The introductory component.
 *
 * Notes:
 * Interesting little ios problem
 * https://medium.com/@susiekim9/how-to-compensate-for-the-ios-viewport-unit-bug-46e78d54af0d
 *
 */

export const Hello: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [{ x, scale, opacity, background }] = useSpring(
    {
      to: [{ scale: 1, background: 'rgba(73, 82, 109, .75)', opacity: 1, x: offset.to([0, 1], [0, 1000]) }],
      from: {
        scale: 1.5,
        opacity: 0,
        background: 'rgba(255, 70, 118, 1.00)',
        x: -500,
      },
      config: config.slow,
    },
    [],
  );

  const [{ y }] = useSpring({ y: offset.to([0, 0.2], [200, 0]), config: config.stiff }, []);
  const [{ rotateX }] = useSpring({ rotateX: y.to([0, 100], [0, 180]), config: config.stiff, immediate: true }, []);
  return (
    <Section sectionKey="hello">
      <a.div className={box} style={{ scale, y, background, zIndex: 2, position: 'absolute', rotateX }}>
        <HelloHeading opacity={opacity} x={x} />
        <HelloScrollDown />
      </a.div>
      <HelloProfile opacity={opacity} x={x} />
    </Section>
  );
};
export default Hello;
