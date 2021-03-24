import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { section } from 'styles/section.style';
import { animated as a, SpringValue, useSpring, config } from 'react-spring';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import { css } from '@emotion/react';
import { box } from 'styles/box.style';
import useBounds from 'hooks/useBounds';

const Learn: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [ref, bounds] = useMeasure();
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useCallback(useBounds((state) => state.setLearn),[]);
  useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds,updateBounds]);

  /** Animations on the box **/
  const [{opacity, scale, y}] = useSpring({
    opacity: offset.to([1.5, 4], [0, 1]),
    scale: offset.to([2.5, 4], [0.5, 1]),
    y: offset.to([3, 4], [-2000, 0]),
    config: config.wobbly,
  },[]);

  /** Pulls in content. **/

  return (
    <div css={section} ref={mergeRefs([localRef, ref])}>
      <a.div
        css={css`
          ${box};
          height: 75vh;
          width: 80vw;
          z-index: 2;
          overflow: hidden;
        `}
        style={{ opacity, scale, y }}
      >
      </a.div>
    </div>
  );
};

export default Learn;
