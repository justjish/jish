import { type FC } from 'react';
import { a, config, SpringValue, useSpring } from '@react-spring/web';
import { h2, box } from '~/styles/legacy';
import { clsx } from 'clsx';
import { AnimatedSVGFn } from '~/svgs/AnimatedSVG.types';
export const StoryPlace: FC<{
  id: number;
  offset: SpringValue<number>;
  Logo: AnimatedSVGFn;
  focus: string;
  time: string;
  color: string;
  speed: number;
  includePlus?: boolean;
}> = ({ offset, Logo, focus, time, speed }) => {
  const [{ x }] = useSpring(() => ({
    x: offset.to([1, 0], [0, 1000]),
    config: { mass: 50 / 15, tension: 100 - 15 * speed, friction: 26 },
  }));

  const { skewX } = useSpring({
    skewX: x.to([0, 100], [0, 1]),
    config: config.molasses,
    immediate: true,
  });

  const [animation] = useSpring(
    () => ({
      config: config.slow,
      x: x,
      y: 0,
      skewX,
      opacity: 1,
    }),
    [x, skewX],
  );

  return (
    <a.div className={clsx(box, 'm-1 md:m-3 lg:m-3 gap-2 md:gap-0 lg:gap-0 min-w-[300px] md:min-w-[350px]')} style={{ ...animation }}>
      <Logo className={'object-scale-down w-[120px] md:h-[50px] md:w-fit m-auto'} />
      <div className="flex md:flex-col gap-2 md:gap-0 lg:gap-0 items-center justify-center">
        <div className={clsx(h2, 'text-sm md:text-lg')}>{focus}</div>
        <div className={clsx(h2, 'text-sm md:text-lg')}>{time}</div>
      </div>
    </a.div>
  );
};
