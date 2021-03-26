import { h4} from 'styles/typography.style';

import viteSvg from 'assets/logos/vite.svg';
import reactSvg from 'assets/logos/react.svg';
import heartSvg from 'assets/icons/love.svg';
import { row } from 'styles/row.style';
import { css } from '@emotion/react';


const ViteLogo = () => <img src={viteSvg} alt="vitejs" width="32px" />;
const ReactLogo = () => <img src={reactSvg} alt="reactjs" width="32px" />;
const HeartIcon = () => (
  <img
    css={css`
      display: inline;
    `}
    src={heartSvg}
    alt="love"
    width="32px"
  />
);
export const LearnClosing = () => (
  <div
    css={css`
      ${row};
      ${h4};
    `}
  >
     <div>Made with</div> <ReactLogo /> +<HeartIcon />+<ViteLogo />
  </div>
);
