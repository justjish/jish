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
    <a.div className={clsx(box, 'w-[350px]')} {...bind()} style={{ ...interactStyles, x }}>
      <div className={h2}>Years Coding</div>
      <div className={clsx(h1, 'text-[8em]')}>10+</div>
    </a.div>
  );
};
