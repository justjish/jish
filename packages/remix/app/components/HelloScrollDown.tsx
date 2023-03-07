import { type FC } from 'react';
import { useBouncing } from '~/hooks/useBouncing';
import { a, type SpringValue } from '@react-spring/web';
import Scroll from '~/svgs/Scroll';

export const HelloScrollDown: FC = () => {
  const [{ y }] = useBouncing(2);
  return <a.div className="relative z-10 m-auto" style={{ y }}><Scroll className={'m-auto h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]'} /></a.div>;
};
