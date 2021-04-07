import { FC } from 'react';
import { css } from '@emotion/react';
import { SpringValue, a, useSpring, config } from 'react-spring';
import { h3, h3Inline } from 'styles/typography.style';
import { useMedia } from 'hooks/useMedia';
import screenSizes from 'data/screenSizes';

export const StoryHeading: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const { scale, y } = useSpring({
    scale: offset.to([0, 1], [2, 1]),
    y: offset.to([0, 1], [0, 200]),
    from: { scale: 10, y: 0 },
  });
  const mqFont = useMedia(screenSizes, ['4rem', '3.5rem', '3rem'], '2rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  return (
    <a.div
      css={css`
        ${h3};
        z-index: 1;
        position: absolute;
      `}
      style={{ scale, fontSize, y }}
    >
      with
      <div css={h3Inline}>Years</div> of Experience
    </a.div>
  );
};
