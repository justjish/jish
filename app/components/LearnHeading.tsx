import { a } from '@react-spring/web';
import { h3, h3Inline } from '~/styles/legacy';
import { clsx } from 'clsx';

export const LearnHeading = () => {
  return (
    <a.div className={clsx(h3, 'text-[1rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]')}>
      More<div className={h3Inline}> Coming </div>Soon!
    </a.div>
  );
};
