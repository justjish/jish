import { css } from '@emotion/react'
export const view = css`
  position: absolute;
  width: 100vw;
  height: 500vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y proximity;
`;
