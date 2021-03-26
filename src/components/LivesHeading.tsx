import { FC } from 'react';
import { SpringValue, useSpring, config, a } from 'react-spring';
import { useMedia } from 'hooks/useMedia';
import screenSizes from 'data/screenSizes';
import { h3, h3Inline } from 'styles/typography.style';
import { css } from '@emotion/react';

export const LivesHeading: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const { scale, y } = useSpring({
    scale: offset.to([2, 3], [2, 1]),
    y: offset.to([0, 1], [0, 1]),
    from: { scale: 10, y: 0 },
  });
  // I could just base the size of the useBounds store, but media queries are just quicker.
  const mqFont = useMedia(screenSizes, ['4rem', '3.5rem', '3rem'], '2rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  return (
    <a.div
      css={css`
        ${h3};
        position: absolute;
      `}
      style={{ scale, y, fontSize }}
    >
      Based In <div css={h3Inline}>NYC</div>
    </a.div>
  );
};