import { h4, row } from '~/styles/legacy';
import { clsx } from 'clsx';
import viteSvg from '~/assets/logos/vite.svg';
import reactSvg from '~/assets/logos/react.svg';
import heartSvg from '~/assets/icons/love.svg';
import { Image } from 'remix-image-cloudflare';

const ViteLogo = () => <Image src={viteSvg} alt="vitejs" width="32px" />;
const ReactLogo = () => <Image src={reactSvg} alt="reactjs" width="32px" />;
const HeartIcon = () => <Image className="inline" src={heartSvg} alt="love" width="32px" />;
/** Not in Use */
export const LearnClosing = () => (
  <div className={clsx(row, h4)}>
    <div>Made with</div> <ReactLogo /> +<HeartIcon />+<ViteLogo />
  </div>
);
