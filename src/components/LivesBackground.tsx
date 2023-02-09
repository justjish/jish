import { FC } from 'react';
import { SpringValue, a } from '@react-spring/web';
import { row } from 'styles/row.style';
import svgFrame from 'assets/graphics/cityFrameCircle.svg';
import { css } from '@emotion/react';

export const LivesBackground: FC<{ scale: SpringValue<1 | 3>; y: SpringValue<number> }> = ({ scale, y }) => (
  <div css={row}>
    <a.img
      css={css`
        width: 100vw;
        position: relative;
      `}
      style={{ scale, y }}
      src={svgFrame}
    />
  </div>
);
