import { FC } from 'react';
import { a, SpringValue } from 'react-spring'
import { h3, h1 } from 'styles/typography.style';

export const HelloHeading: FC<{ opacity: SpringValue<number>; }> = ({ opacity }) => {
  return (
    <div>
      <div css={h3}>Jish.Dev Presents</div>
      <a.div
        css={h1}
        style={{ opacity}}
      >
        Sujish Patel
      </a.div>
      <a.div
        css={h3}
        style={{ opacity }}
      >
        A Full Stack Developer
      </a.div>
    </div>
  );
};