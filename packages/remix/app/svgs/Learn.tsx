import { a } from '@react-spring/web';
import { AnimatedSVGProps } from './AnimatedSVG.types';
const Learn = (props:AnimatedSVGProps) => (
  <a.svg
    height={100}
    width={100}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 100 100"
    {...props}
  >
    <circle cx={23} cy={50} r={9} />
    <circle cx={50} cy={50} r={9} />
    <circle cx={77} cy={50} r={9} />
  </a.svg>
)
export default Learn
