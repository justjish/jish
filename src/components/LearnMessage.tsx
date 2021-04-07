import { FC } from 'react';
import { css } from '@emotion/react';
import { h4 } from 'styles/typography.style';

export const LearnMessage: FC<{ show?: boolean }> = () => (
  <div
    css={css`
      ${h4};
      color: white;
      font-size: 1.5rem;
    `}
  >
    In the meantime ...
  </div>
);
