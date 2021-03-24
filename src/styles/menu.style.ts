import { css } from "@emotion/react";
import { blur } from 'styles/blur.style';
export const menuBox = css`
  ${blur};
  position: fixed; /* Take it out of the flow of the document */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  right: 0px;
  left: 0px;
  top: 20px;

  margin: auto; /* Center it */
  max-width: 90%;
  height: 64px;
  width: 500px;

`;

export const menuItem = css`
  ${blur};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  height: 48px;
  width: 48px;
`;
