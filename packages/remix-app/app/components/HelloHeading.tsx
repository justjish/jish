import useInteract from '~/hooks/useInteract';
import type { FC } from 'react';
import { useCallback } from 'react';
import type { SpringValue } from '@react-spring/web';
import { a } from '@react-spring/web';
import { h3, h1 } from '~/styles/legacy';
import { noop } from '~/utils/utils';
import { clsx } from 'clsx';

export const HelloHeading: FC<{ opacity: SpringValue<number>; x: SpringValue<number> }> = ({ opacity, x }) => {
  const onClick = useCallback(() => noop(), []);
  const { bind, interactStyles } = useInteract({ onClick });

  return (
    <a.div {...bind()} style={interactStyles}>
      <a.div className={clsx(h3, 'text-center text-[1.35rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]')}>
        Jish.Dev Presents
      </a.div>
      <a.div
        className={clsx(h1, 'text-center text-[4rem] sm:text-[6rem] lg:text-[7rem] 2xl:text-[9rem]')}
        style={{ opacity, x }}
      >
        Sujish Patel
      </a.div>
      <a.div
        className={clsx(h3, 'text-center text-[1.35rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]')}
        style={{ opacity, x }}
      >
        A Full Stack Developer
      </a.div>
    </a.div>
  );
};
