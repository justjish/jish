import screenSizes from 'data/screenSizes';
import useInteract from 'hooks/useInteract';
import { useMedia } from 'hooks/useMedia';
import { FC, useCallback, ReactNode } from 'react';
import { a, SpringValue, useSpring } from '@react-spring/web';
import { h3, h1 } from 'styles/typography.style';
import { noop } from 'functions/utils';
const HiddenButton: FC<{ children: ReactNode }> = ({ children }) => {
  const onClick = useCallback(() => (import.meta.env.DEV ? noop() : noop()), []);
  const { bind, interactStyles } = useInteract({ onClick });
  return (
    <a.div {...bind()} style={interactStyles}>
      {children}
    </a.div>
  );
};

export const HelloHeading: FC<{ opacity: SpringValue<number>; x: SpringValue<number> }> = ({ opacity, x }) => {
  // Mobile First Design
  const sizes = useMedia(
    screenSizes,
    [
      { h1: '9rem', h3: '3rem' },
      { h1: '7rem', h3: '2.5rem' },
      { h1: '6rem', h3: '2rem' },
    ],
    { h1: '4rem', h3: '1.35rem' },
  );
  const [mqFont] = useSpring({ h1: sizes.h1, h3: sizes.h3 }, [sizes.h1, sizes.h3]);

  return (
    <HiddenButton>
      <a.div css={h3} style={{ fontSize: mqFont.h3 }}>
        Jish.Dev Presents
      </a.div>
      <a.div css={h1} style={{ opacity, fontSize: mqFont.h1, x }}>
        Sujish Patel
      </a.div>
      <a.div css={h3} style={{ opacity, fontSize: mqFont.h3, x }}>
        A Full Stack Developer
      </a.div>
    </HiddenButton>
  );
};
