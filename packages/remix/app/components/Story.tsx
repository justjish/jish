import { type FC } from 'react';
import { SpringValue } from '@react-spring/web';
import StoryData from '~/data/StoryData';
import { StoryPlace } from '~/components/StoryPlace';
import { StoryYears } from '~/components/StoryYears';
import { StoryHeading } from '~/components/StoryHeading';
import { StoryBackground } from '~/components/StoryBackground';
import { Section } from '~/ui/Section';
import { StoryProvider, WithStoryProvider } from '~/hooks/useStory';

const Story: FC<{ data?: typeof StoryData; offset: SpringValue<number> }> = ({ data = StoryData, offset }) => {
  return (
    <Section sectionKey="story">
      <div className={'w-full flex flex-wrap justify-center items-center transition duration-75 ease-in-out'}>
        <StoryBackground offset={offset} />
        {data.map((props, i) => (
          <StoryPlace key={i} offset={offset} id={i} {...props} />
        ))}
        <StoryYears offset={offset} />
      </div>
      <StoryHeading offset={offset} />
    </Section>
  );
};
export default WithStoryProvider(StoryProvider)(Story);
