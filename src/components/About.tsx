import React,{ useState, useRef, useEffect, useCallback } from 'react';
import { section } from 'styles/section.style';
import useBounds from 'hooks/useBounds';
import { animated as a, SpringValue, useSpring, config} from 'react-spring';

import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import { css } from '@emotion/react';
import { h1 } from 'styles/typography.style';
import { box } from 'styles/box.style';

const About: React.FC<{offset: SpringValue<number>}> = ({offset}) => {
  const [ref, bounds] = useMeasure({debounce: 200});
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useBounds(useCallback((state) => state.setAbout, []));

  useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds]);
  const [{ height }, set] = useSpring({ from: { height: '20%', width: '20%' }, config: config.wobbly }, []);
  
  return (
    <div css={section} ref={mergeRefs([ref, localRef])}>
      {/* <div css={css`
        ${h1}
        color: yellow;
        left:0;
        right:0;
        bottom:0;
      `}>Thanks for coming!</div> */}
      <a.div css={css`
        background-blend-mode:screen;
        background-color: red;
        left:0;
        right:0;
        top: 0;
        width: 100%;
      `}
        style={{ height: height }}
      >{ height }</a.div>
      {/* <a.div
        css={css`
        ${box};
        border-radius: 16px;
        flex-direction: row;
        background-color: rgba(39, 39, 39, 0.75);
        gap: .5em;
    `}>{offset.to([2,3],[0,100])}</a.div>*/}

    </div> 
  );
};

export default About;
