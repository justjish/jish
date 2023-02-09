import { css } from '@emotion/react';
import { FC } from 'react';
import { a, SpringValue, useSpring } from '@react-spring/web';
export const StoryBackground: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [{ r }] = useSpring(
    {
      r: offset.to({ range: [0, 1], output: [0, 100] }),
      from: { r: 0 },
      config: { mass: 50 / 15, tension: 50, friction: 26 },
    },
    [],
  );

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      css={css`
        z-index: -1;
        position: absolute;
      `}
    >
      <a.circle
        cx="-50%"
        cy="50%"
        r={r}
        fill="rgba(8, 9, 69, 1.00)"
        css={css`
          mix-blend-mode: screen;
        `}
      />
      <a.circle
        cx="100%"
        cy="50%"
        r={r}
        fill="rgba(4, 40, 110, 1.00)"
        css={css`
          mix-blend-mode: screen;
        `}
      />
    </svg>
  );
};
