import React from 'react';
import { animated as a, SpringValue, useSpring } from 'react-spring';
import useBounds from 'hooks/useBounds';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import StoryData from 'data/StoryData';

import { css } from '@emotion/react';
import { section } from 'styles/section.style';
import { row } from 'styles/row.style';
import { h3 } from 'styles/typography.style';
import { Place } from 'components/Place';
import { Years } from 'components/Years';


const Story: React.FC<{ data?: typeof StoryData; offset: SpringValue<number> }> = ({ data = StoryData, offset }) => {
  const [ref, bounds] = useMeasure({debounce: 200});
  const localRef = React.useRef<HTMLDivElement>(null);
  const updateBounds = useBounds(React.useCallback((state) => state.setStory, []));
  React.useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds]);

  const [{ r }] = useSpring(
    {
      r: offset.to([0, 1], [0, 100]),
      from: { r: 0 },
      config: { mass: 50 / 15, tension: 50, friction: 26 },
    },
    [],
  );

  return (
    <div css={section} ref={mergeRefs([ref, localRef])}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        css={css`
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
      <div css={row}>
        <a.div
          css={css`
            ${h3};
            font-size: 4vw;
          `}
          style={{
            x: -100,
          }}
        >
          with
          <div
            css={css`
              ${h3};
              display: inline;
              color: yellow;
              font-size: 8vw;
            `}
          >
            Years
          </div>
          of Experience
        </a.div>
      </div>
      <div css={row}>
        {data.map((props, i) => (
          <Place key={i} offset={offset} {...props} />
        ))}
      </div>
      <div css={row}>
        <Years offset={offset} />
      </div>
    </div>
  );
};
export default Story;
