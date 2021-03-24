import { FC, useCallback, useRef, useEffect } from 'react';
import { SpringValue, animated as a, useSpring, config } from 'react-spring';
import { css } from '@emotion/react';
import { section } from 'styles/section.style';
import { h3 } from 'styles/typography.style';
import svgFrame from 'assets/graphics/cityFrameCircle.svg';
import { box } from 'styles/box.style';
import { row } from 'styles/row.style';
import useMeasure from 'react-use-measure';
import useBounds from 'hooks/useBounds';
import mergeRefs from 'react-merge-refs';

const Lives: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [ref, bounds] = useMeasure();
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useBounds(useCallback((state) => state.setLives, []));
  useEffect(
    () =>updateBounds({...bounds,absoluteTop: localRef.current?.offsetTop ?? 0,}),[bounds, updateBounds]
  );
  const [{ scale },set] = useSpring({ scale: offset.to([2, 3], [3, 2]), from: { scale: 1 }, config:config.molasses },[]);
  return (
    <div css={section} ref={mergeRefs([localRef,ref])}>
      <a.div
        css={css`
          ${row};
          ${h3};
          flex-direction: column;
          font-size: 4vw;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: url(${svgFrame}) no-repeat center center fixed;
          background-size: cover;
        `}
        style={{ scale }}
      >
        Based in{' '}
        <a.div
          css={css`
            ${h3};
            display: inline;
            color: yellow;
            font-size: 8vw;
          `}
        >
          NYC
        </a.div>
        {" "}
      </a.div>
    </div>
  );
};

export default Lives;
