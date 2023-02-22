import { a } from '@react-spring/web';
import { AnimatedSVGProps } from './AnimatedSVG.types';
const Lives = (props: AnimatedSVGProps) => (
  <a.svg
    height={100}
    width={100}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    shapeRendering="geometricPrecision"
    viewBox="0 0 661 643"
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <path
      d="M567 422v128c0 51-42 93-94 93H188c-52 0-93-42-93-93V422c-97 0-121-88-66-159 79-79 158-157 237-236 37-36 92-36 129 0 79 79 158 157 237 236 55 71 31 159-65 159zM331 213c73 5 129 44 135 102 6 59 13 94-135 279-149-185-141-220-136-279 6-58 63-97 136-102zm0 73c30 0 54 24 54 54 0 31-24 55-54 55-31 0-55-24-55-55 0-30 24-54 55-54z"
      style={{
        fill: "#000",
      }}
    />
  </a.svg>
)

export default Lives
