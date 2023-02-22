import { type FC, useMemo } from 'react';
import { SpringValue } from '@react-spring/web';
import { row } from '~/styles/legacy';
import { BrainData } from '~/components/data/BrainData';
import { BrainSkill } from '~/components/BrainSkill';
import { BrainHeading } from '~/components/BrainHeading';
import { clsx } from 'clsx';
import { Section } from '~/ui/Section';

/**
 * A set of skills in my brain.
 * Notes:
 * Love using 'typeof' if the data is static or you have dummy data for creating the app.
 */

const Brain: FC<{ data?: typeof BrainData; offset: SpringValue<number> }> = ({ data = BrainData, offset }) => {
  const Skills = useMemo(() => data.map((o, index) => <BrainSkill key={index} offset={offset} {...o} />), []);
  return (
    <Section sectionKey="brain">
      <div className={clsx(row, 'absolute h-screen overflow-hidden gap-2')}>{...Skills}</div>
      <BrainHeading offset={offset} />
    </Section>
  );
};

export default Brain;
