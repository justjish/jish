import { useSpring, type SpringValue } from '@react-spring/web';
export const useBouncing = (range: number | string) => {
  const style = useSpring({
    loop: { reverse: true },
    from: { y: -range },
    to: { y: range },
    config: { mass: 1, tension: 50, friction: 0 }, // No friction allows it to run forever... physics :) 
  });
  return [style] as const;
};