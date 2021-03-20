import React from "react";
import {
  animated as a,
  SpringValue,
} from "react-spring";
import { section } from "styles/section.style";
import { BrainData } from "data/BrainData";
import useBounds from "hooks/useBounds";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import { css } from "@emotion/react";
import { h3 } from "styles/typography.style";
import { row } from "styles/row.style";
import { Skill } from "components/Skill";
/**
 * All the things floating or have floated around my brain.
 * Notes:
 * Love using 'typeof' if the data is static or you have dummy data for creating the app.
 */
const Brain: React.FC<{ data?: typeof BrainData; offset: SpringValue<number> }> = ({ data = BrainData, offset }) => {
  const [ref, bounds] = useMeasure({debounce: 200});
  const localRef = React.useRef<HTMLDivElement>(null);
  const updateBounds = useBounds(
    React.useCallback((state) => state.setBrain, []),
  );
  React.useEffect(
    () =>
      updateBounds({
        ...bounds,
        absoluteTop: localRef.current?.offsetTop ?? 0,
      }),
    [bounds],
  );

  return (
    <div css={section} ref={mergeRefs([ref, localRef])}>
      <a.div
        css={css`
          ${row};
          position: absolute;
          height: 100vh;
          overflow: hidden;
        `}
      >
        {data.map((o, index) => (
          <Skill key={index} offset={offset} {...o}></Skill>
        ))}
      </a.div>
      <a.div
        css={css`
          ${h3};
          position: absolute;
          font-size: 4vw;
          z-index: 2;
        `}
      >
        and an {" "}
        <a.div
          css={css`
            ${h3};
            display: inline;
            color: yellow;
            font-size: 8vw;
          `}
        >
          EXPANSIVE{" "}
        </a.div>
        skillset{" "}
      </a.div>
    </div>
  );
};

export default Brain;
