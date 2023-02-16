import { type FC } from 'react';
import { h4 } from '~/styles/legacy';
import { clsx } from 'clsx';

export const LearnMessage: FC<{ show?: boolean }> = () => (
  <div className={clsx(h4, 'text-white text-[2rem] pb-10')}>In the meantime ...</div>
);
