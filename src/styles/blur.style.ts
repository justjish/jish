import { css } from '@emotion/react';
export const blur = css`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
`