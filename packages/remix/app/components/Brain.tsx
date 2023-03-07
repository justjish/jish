import { type FC, useMemo } from 'react';
import { SpringValue, useSprings } from '@react-spring/web';
import { row } from '~/styles/legacy';
import { BrainData, Sizes } from '~/data/BrainData';
import { BrainSkill } from '~/components/BrainSkill';
import { BrainHeading } from '~/components/BrainHeading';
import { clsx } from 'clsx';
import { Section } from '~/ui/Section';
import randomColor from 'randomcolor';

const Brain: FC<{ data?: typeof BrainData; offset: SpringValue<number> }> = ({ data = BrainData, offset }) => {
  const [[sm, md, lg]] = useSprings(
    3,
    (i) => ({
      y: offset.to([0, 2, 2.75], [5000, 0, -1000]),
      from: { y: 5000 },
      config: {
        mass: (100 - (Sizes.sm * i + 1)) / 25,
        tension: 50,
        friction: 25,
      },
    }),
    [offset],
  );
  /**
   * [Performance] Rather than creating a spring for each skill, I create a spring for each size.
   **/
  const Skills = useMemo(
    () => () => {
      if (!(sm && md && lg)) return <div></div>;

      return (
        <div className={clsx(row, 'absolute h-screen overflow-hidden gap-1 md:gap-1 lg:gap-2')}>
          {...data.map((o, index) => {
            const { y } = o.size === Sizes.sm ? sm : o.size === Sizes.md ? md : lg;
            const color = randomColor({ seed: o.type, luminosity: 'bright', alpha: 0.5 });
            return <BrainSkill key={index} {...{ color, y, ...o }} />;
          })}
        </div>
      );
    },
    [sm, md, lg],
  );
  /**
   * [Performance] Wrapped in useMemo to preventing rerender from IntersectionObserver.
   **/
  const MemoHeading = useMemo(() => <BrainHeading offset={offset} />, [offset]);
  return (
    <Section sectionKey="brain">
      <Skills />
      {MemoHeading}
    </Section>
  );
};

export default Brain;
