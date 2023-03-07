import { type FC , type CSSProperties} from 'react';
import { a, SpringValue} from '@react-spring/web';
import { SkillItem } from '~/components/data/BrainData';
import { grid, flex } from '~/styles/legacy';
import { clsx } from 'clsx';

export const BrainSkill: FC<SkillItem & { y: SpringValue<number>,color:string, iconStyle:CSSProperties, descStyle:CSSProperties }> = ({
  Icon = null,
  idx,
  size,
  type,
  desc,
  y,
  color,
  iconStyle,
  descStyle
}) => {
  return (
    <a.div className={clsx(Icon ? grid : flex, 'will-change-transform')} style={{ y, color }}>
      {Icon && <Icon className="m-auto" title={desc} style={iconStyle} />}
      <div
        className={'font-medium not-italic uppercase font-futura m-auto'}
        style={descStyle}
      >
        {desc}
      </div>
    </a.div>
  );
};
