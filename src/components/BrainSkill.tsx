import React from 'react';
import { a, SpringValue, useSpring } from 'react-spring';
import { SkillItem } from 'data/BrainData';
import randomColor from 'randomcolor';
import { css } from '@emotion/react';
import { box } from 'styles/box.style';
import { isEven, shifty } from 'functions/utils';

export const BrainSkill: React.FC<SkillItem & { offset: SpringValue<number> }> = ({
  Icon = null,
  idx,
  size,
  type,
  desc,
  offset,
}) => {
  const [{ y, color }] = useSpring(
    {
      y: offset.to([0, 2, 2.75], [5000, 0, -1000]).to((v) => v + shifty(idx)),
      from: {y: 5000, color:randomColor({ seed: type, luminosity: 'bright', alpha: 0.5 })},
      config: {
        mass: (100 - size + (isEven(idx) ? -idx : idx)) / 25,
        tension: 50,
        friction: 25,
      },
    },
    [],
  );

  return (
    <a.div
      css={css`
        ${box};
      `}
      style={{ y, color}}
    >
      {Icon && (
        <Icon
          title={desc}
          
          css={css`
            height: ${size}px;
            width: ${size}px;
          `}
        />
      )}

      <a.div
        css={css`
          font-size: ${(50 * size) / 100}px;
          font-family: futura-pt, sans-serif;
          font-weight: 500;
          font-style: normal;
          text-transform: uppercase;
        `}
      >
        {desc}
      </a.div>
    </a.div>
  );
};
