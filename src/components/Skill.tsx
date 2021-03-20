
import React from "react";
import {
  animated as a,
  SpringValue,
  useSpring,
} from "react-spring";
import { SkillItem } from "data/BrainData";
import randomColor from "randomcolor";
import { css } from "@emotion/react";
import { box } from "styles/box.style";
import { isEven, shifty } from "functions/utils";

export const Skill: React.FC<SkillItem & { offset: SpringValue<number> }> = (
  { Icon = null, idx, size, type, desc, offset },
) => {
  // const initial = offset(idx);
  const [{ y, color }] = useSpring(
    {
      y: offset.to([0, 2], [5000, 0]).to((v) => v + shifty(idx)),
      color: randomColor({ seed: type, luminosity: "bright", alpha: 0.5 }),
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
        border-radius: 16px;
        flex-direction: row;
        background-color: rgba(39, 39, 39, 0.75);
        gap: .5em;
        
      `}
      style={{ y, color } as any}
    >
      {Icon && (
        <Icon
          title={desc}
          css={css`
            height: ${size}px;
            width: ${size}px;
          `}
          style={{ fill: color } as any}
        />
      )}

      <a.div
        css={css`
          font-size: ${50 * size / 100}px;
          font-family: futura-pt, sans-serif;
          font-weight: 500;
          font-style: normal;
          text-transform:uppercase;
        `}
      >
        {desc}
      </a.div>
    </a.div>
  );
};