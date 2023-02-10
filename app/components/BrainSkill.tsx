import { type FC } from 'react';
import { a, SpringValue, useSpring } from '@react-spring/web';
import { SkillItem } from '~/data/BrainData';
import randomColor from 'randomcolor';
import { grid, flex } from '~/styles/legacy';
import { isEven } from '~/functions/utils';
import { clsx } from 'clsx';

// TODO: Fix sizing of icons.
export const BrainSkill: FC<SkillItem & { offset: SpringValue<number> }> = ({
  Icon = null,
  idx,
  size,
  type,
  desc,
  offset,
}) => {
  const [{ y, color }] = useSpring(
    {
      y: offset.to([0, 2, 2.75], [5000, 0, -1000]),
      from: { y: 5000, color: randomColor({ seed: type, luminosity: 'bright', alpha: 0.5 }) },
      config: {
        mass: (100 - size + (isEven(idx) ? -idx : idx)) / 25,
        tension: 50,
        friction: 25,
      },
    },
    [],
  );

  return (
    <a.div className={clsx(Icon ? grid : flex)} style={{ y, color }}>
      {Icon && <Icon className="m-auto" title={desc} style={{ height: `${size}px`, width: `${size}px` }} />}
      <div
        className={'font-medium not-italic uppercase font-futura m-auto'}
        style={{ fontSize: `${(50 * size) / 100}px` }}
      >
        {desc}
      </div>
    </a.div>
  );
};
