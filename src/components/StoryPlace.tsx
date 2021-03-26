import { FC } from 'react';
import { a, config, SpringValue, useSpring } from 'react-spring';
import { noop } from 'lodash/fp';
import useInteract from 'hooks/useInteract';
import { css } from '@emotion/react';
import { h2 } from 'styles/typography.style';
import { box } from 'styles/box.style';

export const StoryPlace: FC<{
  offset: SpringValue<number>;
  logo: string;
  focus: string;
  time: string;
  color: string;
  speed: number;
  includePlus?: boolean;
}> = ({ offset, logo, focus, time, color, speed, includePlus = false }) => {
  const [{ x }] = useSpring(() => ({
    x: offset.to([1, 0], [0, 1000]),
    config: { mass: 50 / 15, tension: 100 - 15 * speed, friction: 26 },
  }));
  const { skewX } = useSpring({
    skewX: x.to([0, 100], [0, 1]),
    config: config.molasses,
    immediate: true,
  });
  const { bind, interactStyles } = useInteract({ onClick: noop });
  return (
    
      <a.div css={box} {...bind()} style={{ ...interactStyles,skewX, x, }}>
        <img
          css={css`
            object-fit: contain;
            height: 50px;
          `}
          src={logo}
          alt={'company'}
        />
        <div css={h2}>{focus}</div>
        <div css={h2}>{time}</div>
      </a.div>

    
  );
};
