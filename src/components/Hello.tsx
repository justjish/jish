import React from "react";
import { animated as a, config, SpringValue, useSpring } from "react-spring";
import { section } from "styles/section.style";
import fullbodyWebP from "assets/pictures/fullbody@0.5x.webp";
import { css } from "@emotion/react";
import { box } from "styles/box.style";
import { h1, h3 } from "styles/typography.style";

/**
 * Hello
 *
 * The introductory component. Just pass it the offset so that it knows when to move.
 *
 * Notes:
 * The ios problem with intro image:
 * https://medium.com/@susiekim9/how-to-compensate-for-the-ios-viewport-unit-bug-46e78d54af0d
 *
 */

export const Hello: React.FC<{ offset: SpringValue<number> }> = (
  { offset },
) => {
  /** 
   * The animation set is sloppy...
   * Should really create seperate springs for each one
   **/
  const [
    {
      x,
      y,
      scale,
      opacity,
      height,
      width,
      presents,
      color,
      move,
      background,
      image,
    },
  ] = useSpring(
    {
      to: [
        { scale: 1 },
        {
          y: 200,
          x: 0,
          height: window.innerHeight * 0.4,
          width: "80vw",
          presents: "3vw",
          color: "rgba(214, 242, 255, 1.00)",
        },
        {
          opacity: offset.to({
            range: [0, 1],
            output: [1, 0],
            extrapolate: "clamp",
          }),
          x: offset.to({ range: [0, 1], output: [0, -400] }),
          move: 0,
          image: 1,
          y: offset.to({
            range: [0, 1],
            output: [200, -200],
            extrapolate: "clamp",
          }),
          background: "rgba(39, 39, 39, 0.25)",
        },
      ],
      from: {
        x: 0,
        y: -200,
        scale: 0,
        opacity: 0,
        height: "1vh",
        width: "80vw",
        color: "rgba(255, 70, 118, 1.00)",
        presents: "8vw",
        move: 200,
        background: "rgba(255, 70, 118, 1.00)",
        image: 1,
      },
      config: config.slow,
    },
    [],
    );
  
  const { rotateX } = useSpring({
    rotateX: y.to([0, 50], [0, 180]),
    config: config.molasses,
    immediate: true,
  });

  return (
    <div css={section} style={{ overflow: "hidden" }}>
      <a.img
        src={fullbodyWebP}
        alt="a photo of sujish patel"
        css={css`
            position: absolute;
            object-fit: scale-down;
            max-height: 100vh;
            max-width: 100vw;
            bottom: 0;
        `}
        style={{
          opacity,
          y: move,
          scale: image,
          x,
        } as any}
      />
      <a.div
        css={box}
        style={{ rotateX, y, x, scale, height, width, background } as any}
      >
        <a.div css={h3} style={{ color, fontSize: presents } as any}>Jish.Dev Presents</a.div>
        <a.div css={css` ${h1}; font-size:8vw;`} style={{ opacity, y: move } as any}>
          Sujish Patel
        </a.div>
        <a.div css={css`${h3}; font-size:4vw;`} style={{ opacity, y: move } as any}>
          A Full Stack Developer
        </a.div>
      </a.div>
    </div>
  );
};
export default Hello;
