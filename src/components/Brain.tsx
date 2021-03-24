import {FC, useCallback, useRef, useEffect} from "react";
import {
  animated as a,
  SpringValue,
} from "react-spring";
import { section } from "styles/section.style";
import { BrainData } from "data/BrainData";
import useBounds from "hooks/useBounds";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import { useSpring } from 'react-spring';
import { css } from "@emotion/react";
import { h3 } from "styles/typography.style";
import { row } from "styles/row.style";
import { BrainSkill } from "components/BrainSkill";
/**
 * All the things floating or have floated around my brain.
 * Notes:
 * Love using 'typeof' if the data is static or you have dummy data for creating the app.
 */
const Brain: FC<{ data?: typeof BrainData; offset: SpringValue<number> }> = ({ data = BrainData, offset }) => {
  const [ref, bounds] = useMeasure({debounce: 200});
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useBounds(useCallback((state) => state.setBrain, []));
  useEffect(() =>updateBounds({...bounds,absoluteTop: localRef.current?.offsetTop ?? 0,}),[bounds]);

  const { scale } = useSpring({ scale: offset.to([1, 2], [2, 1]), from: { scale: 1 } });

  return (
    <div css={section} ref={mergeRefs([localRef, ref])}>
      <a.div
        css={css`
          ${row};
          position: absolute;
          height: 100vh;
          overflow: hidden;
        `}
      >
        {data.map((o, index) => (
          <BrainSkill key={index} offset={offset} {...o}></BrainSkill>
        ))}
      </a.div>
      <a.div
        css={css`
          ${h3};
          font-size: 4vw;
          z-index: 2;
        `}
        style={{ scale }}
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
