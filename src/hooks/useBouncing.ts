import { useSpring } from '@react-spring/web';

export const useBouncing = (range: number | string) => {
  const style = useSpring({
    loop: { reverse: true },
    from: { y: -range },
    to: { y: range },
    config: { mass: 1, tension: 50, friction: 0 }, //No friction is away to allow this to go forever
  });
  return [style];
};
