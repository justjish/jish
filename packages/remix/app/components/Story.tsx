import { type FC, useMemo } from 'react';
import { SpringValue } from '@react-spring/web';
import StoryData from '~/components/data/StoryData';
import { row } from '~/styles/legacy';
import { StoryPlace } from '~/components/StoryPlace';
import { StoryYears } from '~/components/StoryYears';
import { StoryHeading } from '~/components/StoryHeading';
import { StoryBackground } from '~/components/StoryBackground';
import { Section } from '~/ui/Section';
import { StoryProvider, WithStoryProvider } from '~/hooks/useStory';

const Story: FC<{ data?: typeof StoryData; offset: SpringValue<number> }> = ({ data = StoryData, offset }) => {
  const Places = useMemo(
    () => data.map((props, i) => <StoryPlace key={i} offset={offset} id={i} {...props} />),
    [offset],
  );
  return (
    <Section sectionKey="story">
      <div className={row}>
        <StoryBackground offset={offset} />
        {Places}
        <StoryYears offset={offset} />
      </div>
      <StoryHeading offset={offset} />
    </Section>
  );
};
export default WithStoryProvider(StoryProvider)(Story);
