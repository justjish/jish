import { a } from '@react-spring/web';
export type AnimatedSVGComponent = typeof a.svg;
export type AnimatedSVGProps = Parameters<AnimatedSVGComponent>[0];
export type AnimatedSVGFn = (props: AnimatedSVGProps) => JSX.Element;
