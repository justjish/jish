import { type FC, useRef, useEffect, useMemo } from 'react';
import { SpringValue } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';
import StoryData from 'data/StoryData';
import { section, row } from 'styles/legacy';
import { StoryPlace } from 'components/StoryPlace';
import { StoryYears } from 'components/StoryYears';
import { StoryHeading } from 'components/StoryHeading';
import { StoryBackground } from 'components/StoryBackground';
import { useMenuState } from 'context/MenuContext';

const Story: FC<{ data?: typeof StoryData; offset: SpringValue<number> }> = ({ data = StoryData, offset }) => {
  const [ref, bounds] = useMeasure({ debounce: 200 });
  const localRef = useRef<HTMLDivElement>(null);
  const { setStory } = useMenuState();
  useEffect(() => setStory({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 100 }), [bounds, setStory]);
  const Places = useMemo(
    () => data.map((props, i) => <StoryPlace key={i} offset={offset} id={i} {...props} />),
    [offset],
  );
  return (
    <div className={section} ref={mergeRefs([ref, localRef])}>
      <div className={row}>
        <StoryBackground offset={offset} />
        {Places}
        <StoryYears offset={offset} />
      </div>
      <StoryHeading offset={offset} />
    </div>
  );
};
export default Story;
