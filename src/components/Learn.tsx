import { FC, useRef, useEffect, useCallback, useMemo } from 'react';
import { section } from 'styles/section.style';
import { a, SpringValue, useSpring, config } from 'react-spring';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import { css } from '@emotion/react';
import { box } from 'styles/box.style';
import useBounds from 'hooks/useBounds';
import { LearnHeading } from 'components/LearnHeading';
import { LearnMessage } from 'components/LearnMessage';
import { LearnClosing } from 'components/LearnClosing';
import { LearnExternal } from 'components/LearnExternal';
import { externalData } from 'data/LearnData';
// Gotta love how easy these are.
const grid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Learn: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [ref, bounds] = useMeasure();
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useCallback(
    useBounds((state) => state.setLearn),
    [],
  );
  useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds, updateBounds]);

  /** Animations on the box **/
  const [{ opacity, scale, y }] = useSpring(
    {
      opacity: offset.to([1.5, 4], [0, 1]),
      scale: offset.to([2.5, 4], [0.5, 1]),
      y: offset.to([3, 4], [-600, 0]),
      config: config.default,
    },
    [],
  );

  const ExternalLinks = useMemo(() => externalData.map((props, i) => <LearnExternal {...props} key={i} />), []);

  return (
    <div css={section} ref={mergeRefs([localRef, ref])}>
      <a.div
        css={css`
          ${box};
          overflow: hidden;
        `}
        style={{ opacity, scale, y }}
      >
        <LearnHeading />
        <LearnMessage />
        <div css={grid}> {...ExternalLinks} </div>
      </a.div>
    </div>
  );
};

export default Learn;
