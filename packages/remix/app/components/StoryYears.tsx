import { FC } from 'react';
import { animated as a, SpringValue, useSpring } from '@react-spring/web';
import useInteract from '~/hooks/useInteract';
import { box, h2, h1 } from '~/styles/legacy';
import { clsx } from 'clsx';
import { noop } from '~/utils/utils';
export const StoryYears: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [{ x }] = useSpring(
    {
      x: offset.to([1, 0], [0, 1000]),
      config: { mass: 50 / 15, tension: 100 - 15 * 5, friction: 26 },
    },
    [],
  );
  const { bind, interactStyles } = useInteract({ onClick: noop });
  return (
    <a.div className={clsx(box, 'm-1 md:m-3 lg:m-3 gap-2 md:gap-0 lg:gap-0  min-w-[300px] md:min-w-[350px]')} {...bind()} style={{ ...interactStyles, x }}>
      <div className={h2}>Years Coding</div>
      <div className={clsx(h1, 'text-4xl md:text-7xl lg:text-7xl')}>10+</div>
    </a.div>
  );
};
