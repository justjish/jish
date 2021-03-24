import { css } from '@emotion/react';

/** Entry point for Global Styles. 
 * 
 * Note: css prop configuration from @emotion is configured in two places 
 * As a type in tsconfig.json for type-checking, and as a jsx injection in
 * @vite.config.js 
 * 
 * */
export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x:hidden;
    background-color: rgba(21, 16, 25, 1.00);
    scroll-snap-type: y proximity;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
      segoe ui, arial, sans-serif;
    background: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
    scroll-snap-type: y proximity;
  }
  #root {
    background-color: rgba(21, 16, 25, 1);
    overflow: hidden;
  }
`;