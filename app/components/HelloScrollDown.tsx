import { type FC } from 'react';
import scrolldown from '~/assets/icons/scrolldown.svg';
import { useBouncing } from '~/hooks/useBouncing';
import { a, useSpring } from '@react-spring/web';
import { useMedia } from '~/hooks/useMedia';
import screenSizes from '~/data/screenSizes';

export const HelloScrollDown: FC = () => {
  const [{ y }] = useBouncing(2);
  const sizes = useMedia(screenSizes, ['50px', '50px', '50px'], '40px');
  const { size } = useSpring({ size: sizes });
  return <a.img className="relative z-10 m-auto" height={size} width={size} src={scrolldown} style={{ y }} />;
};
