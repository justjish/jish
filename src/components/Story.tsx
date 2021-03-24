import { FC, useRef, useEffect, useCallback } from 'react';
import { animated as a, SpringValue, useSpring } from 'react-spring';
import useBounds from 'hooks/useBounds';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import StoryData from 'data/StoryData';
import { section } from 'styles/section.style';
import { row } from 'styles/row.style';
import { StoryPlace } from 'components/StoryPlace';
import { Years } from 'components/Years';
import { StoryHeading } from 'components/StoryHeading';
import { StoryBackground } from 'components/StoryBackground';

const Story: FC<{ data?: typeof StoryData; offset: SpringValue<number> }> = ({ data = StoryData, offset }) => {
  const [ref, bounds] = useMeasure({ debounce: 200 });
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useBounds(useCallback((state) => state.setStory, []));
  useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds]);

  return (
    <div css={section} ref={mergeRefs([ref, localRef])}>
      <div css={row}>
        <StoryBackground offset={offset} />
        
        {data.map((props, i) => (
          <StoryPlace key={i} offset={offset} {...props} />
        ))}
        <Years offset={offset} />
      </div>
      <StoryHeading offset={offset} />
    </div>
  );
};
export default Story;
