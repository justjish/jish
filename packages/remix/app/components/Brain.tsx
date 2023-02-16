import { FC, useRef, useEffect, useMemo } from 'react';
import { SpringValue } from '@react-spring/web';
import { section, row } from '~/styles/legacy.js';
import { BrainData } from '~/data/BrainData.js';
import useMeasure from 'react-use-measure/src/web/index.js';
import { mergeRefs } from 'react-merge-refs';
import { BrainSkill } from '~/components/BrainSkill.js';
import { BrainHeading } from '~/components/BrainHeading.js';
import { clsx } from 'clsx';
import { useMenuState } from '~/hooks/useMenu.js';

/**
 * A set of skills in my brain.
 * Notes:
 * Love using 'typeof' if the data is static or you have dummy data for creating the app.
 */

const Brain: FC<{ data?: typeof BrainData; offset: SpringValue<number> }> = ({ data = BrainData, offset }) => {
  const [ref, bounds] = useMeasure({ debounce: 200 });
  const localRef = useRef<HTMLDivElement>(null);
  const { setBrain } = useMenuState();
  useEffect(() => setBrain({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 200 }), [bounds, setBrain]);
  const Skills = useMemo(() => data.map((o, index) => <BrainSkill key={index} offset={offset} {...o} />), []);
  return (
    <div className={section} ref={mergeRefs([localRef, ref])}>
      <div className={clsx(row, 'absolute h-screen overflow-hidden gap-2')}>{...Skills}</div>
      <BrainHeading offset={offset} />
    </div>
  );
};

export default Brain;
