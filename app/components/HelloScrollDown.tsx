import { type FC } from 'react';
import scrolldown from '~/assets/icons/scrolldown.svg';
import { useBouncing } from '~/hooks/useBouncing';
import { a } from '@react-spring/web';

export const HelloScrollDown: FC = () => {
  const [{ y }] = useBouncing(2);
  return (
    <a.img className="relative z-10 m-auto h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]" src={scrolldown} style={{ y }} />
  );
};
