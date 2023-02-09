import { FC } from 'react';
import scrolldown from 'assets/icons/scrolldown.svg';
import { useBouncing } from 'hooks/useBouncing';
import { a, useSpring } from 'react-spring';
import { css } from '@emotion/react';
import { useMedia } from 'hooks/useMedia';
import screenSizes from 'data/screenSizes';

export const HelloScrollDown: FC = () => {
  const [{ y }] = useBouncing(2);
  const sizes = useMedia(screenSizes, ['50px', '50px', '50px'], '40px');
  const { size } = useSpring({ size: sizes });

  return (
    <a.img
      css={css`
        top: 80vh;
        position: 'relative';
        z-index: 10;
      `}
      height={size}
      width={size}
      src={scrolldown}
      style={{ y }}
    />
  );
};
