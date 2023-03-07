import { type FC, type CSSProperties } from 'react';
import { a, SpringValue } from '@react-spring/web';
import { Sizes, SkillItem } from '~/data/BrainData';
import { grid, flex } from '~/styles/legacy';
import { clsx } from 'clsx';

const iconClassNameBySize = {
  [Sizes.sm]: "h-[12.5px] w-[12.5px] md:h-[18.75px] md:w-[18.75px] lg:h-[25px] lg:w-[25px]",
  [Sizes.md]: "h-[25px] w-[25px] md:h-[37.5px] md:w-[37.5px] lg:h-[50px] lg:w-[50px]",
  [Sizes.lg]: "h-[37.5px] w-[37.5px] md:h-[56.25px] md:w-[56.25px] lg:h-[75px] lg:w-[75px]"
} as const

const descClassNameBySize = {
  [Sizes.sm]: "text-[7.5px] md:text-[10px] lg:text-[12.5px]",
  [Sizes.md]: "text-[15px] md:text-[20px] lg:text-[25px]",
  [Sizes.lg]: "text-[22.5px] md:text-[30px] lg:text-[37.5px]"
} as const

export const BrainSkill: FC<
  SkillItem & {
    y: SpringValue<number>;
    color: string;
    iconClassName?: string;
    iconStyle?: CSSProperties;
    descClassName?: string;
    descStyle?: CSSProperties;
  } & Parameters<(typeof a)['div']>[0]
> = ({
  Icon = null,
  idx,
  size,
  type,
  desc,
  y,
  color,
  iconClassName,
  iconStyle,
  descClassName,
  descStyle,
  className,
  ...rest
}) => {
  return (
    <a.div className={clsx(Icon ? grid : flex, 'will-change-transform', className)} style={{ y, color }} {...rest}>
      {Icon && <Icon className={clsx('m-auto', iconClassNameBySize[size])} title={desc} style={iconStyle} />}
      <div className={clsx('font-medium not-italic uppercase font-futura m-auto', descClassNameBySize[size])} style={descStyle}>
        {desc}
      </div>
    </a.div>
  );
};
