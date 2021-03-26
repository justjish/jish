import { FC, useRef, useEffect, useCallback, useMemo } from 'react';
import { SpringValue } from 'react-spring';
import useBounds from 'hooks/useBounds';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import StoryData from 'data/StoryData';
import { section } from 'styles/section.style';
import { row } from 'styles/row.style';
import { StoryPlace } from 'components/StoryPlace';
import { StoryYears } from 'components/StoryYears';
import { StoryHeading } from 'components/StoryHeading';
import { StoryBackground } from 'components/StoryBackground';

const Story: FC<{ data?: typeof StoryData; offset: SpringValue<number> }> = ({ data = StoryData, offset }) => {
  const [ref, bounds] = useMeasure({ debounce: 200 });
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useBounds(useCallback((state) => state.setStory, []));
  useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds]);
  const Places = useMemo(() => data.map((props, i) => <StoryPlace key={i} offset={offset} {...props} />), [offset]);
  return (
    <div css={section} ref={mergeRefs([ref, localRef])}>
      <div css={row}>
        <StoryBackground offset={offset} />
        {Places}
        <StoryYears offset={offset} />
      </div>
      <StoryHeading offset={offset} />
    </div>
  );
};
export default Story;
