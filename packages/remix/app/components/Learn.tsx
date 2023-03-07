import { type FC, useMemo } from 'react';
import { a, SpringValue, useSpring, config } from '@react-spring/web';
import { box } from '~/styles/legacy';
import { LearnHeading } from '~/components/LearnHeading';
import { LearnMessage } from '~/components/LearnMessage';
import { LearnExternal } from '~/components/LearnExternal';
import { externalData } from '~/data/LearnData';
import { clsx } from 'clsx';
import { Section } from '~/ui/Section';

const Learn: FC<{ offset: SpringValue<number> }> = ({ offset }) => {

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

  const ExternalLinks = useMemo(() => <div className="grid grid-cols-[repeat(3,1fr)] gap-5">{externalData.map((props, i) => <LearnExternal {...props} key={i} />)}</div>, []);

  return (
   <Section sectionKey="learn">
      <a.div className={clsx(box, 'overflow-hidden')} style={{ opacity, scale, y }}>
        <LearnHeading />
        <LearnMessage />
        {ExternalLinks}
      </a.div>
    </Section>
  );
};

export default Learn;
