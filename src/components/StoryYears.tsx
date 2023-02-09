import { FC } from 'react';
import { animated as a, SpringValue, useSpring } from '@react-spring/web';
import useInteract from 'hooks/useInteract';
import { css } from '@emotion/react';
import { h1, h2 } from 'styles/typography.style';
import { box } from 'styles/box.style';
import { noop } from 'functions/utils';
export const StoryYears: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [{ x }] = useSpring(
    {
      x: offset.to([1, 0], [0, 1000]),
      config: { mass: 50 / 15, tension: 100 - 15 * 5, friction: 26 },
    },
    [],
  );
  const { bind, interactStyles } = useInteract({ onClick: noop });
  return (
    <a.div
      css={css`
        ${box};
        width: 350px;
      `}
      {...bind()}
      style={{ ...interactStyles, x }}
    >
      <div css={h2}>Years Coding</div>
      <div
        css={css`
          ${h1};
          font-size: '8em';
        `}
      >
        10+
      </div>
    </a.div>
  );
};
