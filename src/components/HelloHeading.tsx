import screenSizes from 'data/screenSizes';
import { useMedia } from 'hooks/useMedia';
import { FC } from 'react';
import { a, SpringValue, useSpring } from 'react-spring'
import { h3, h1 } from 'styles/typography.style';

export const HelloHeading: FC<{ opacity: SpringValue<number>; }> = ({ opacity }) => {
  const sizes = useMedia(screenSizes, [{h1:"9rem", h3: "3rem"}, {h1:"7rem", h3: "2.5rem"}, {h1:"6rem", h3: "2rem"}], {h1:"4rem", h3: "1.35rem"});
  const [ mqFont ] = useSpring({ h1: sizes.h1, h3: sizes.h3}, [sizes.h1,sizes.h3]);
  return (
    <div>
      <a.div css={h3} style={{fontSize:mqFont.h3}}>Jish.Dev Presents</a.div>
      <a.div
        css={h1}
        style={{ opacity, fontSize:mqFont.h1}}
      >
        Sujish Patel
      </a.div>
      <a.div
        css={h3}
        style={{ opacity,fontSize:mqFont.h3 }}
      >
        A Full Stack Developer
      </a.div>
    </div>
  );
};