import { FC, useMemo } from 'react';
import { a, SpringValue, useSpring } from 'react-spring';
import { SkillItem } from 'data/BrainData';
import randomColor from 'randomcolor';
import { css } from '@emotion/react';
import { box } from 'styles/box.style';
import { isEven } from 'functions/utils';

const gridBox = css`
  ${box}
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  gap: 0.4rem;
`;
const flexBox = css`
  ${box}
  display: flex;
`;

const futuraFont = css`
  font-family: futura-pt, sans-serif;
  font-weight: 500;
  font-style: normal;
  text-transform: uppercase;
`;

const textStyle = (size: number) => css`
  ${futuraFont};
  font-size: ${(50 * size) / 100}px;
`;

const iconStyle = (size: number) => css`height: ${size}px; width: ${size}px;`;

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

  // Wrapping styles in useMemo for performance optimizations on lower end devices.
  const cssBox = useMemo(() => (Icon ? gridBox : flexBox), [Icon]);
  const cssIcon = useMemo(() => iconStyle(size), [size]);
  const cssText = useMemo(() => textStyle(size), [size]);

  return (
    <a.div css={cssBox} style={{ y, color }}>
      {Icon && <Icon title={desc} css={cssIcon} />}
      <div css={cssText}>{desc}</div>
    </a.div>
  );
};
