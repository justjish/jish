import { useSpring } from "react-spring"

export const useBouncing = (range: number) => {
  const style = useSpring({
    loop: { reverse: true },
    from: { y: -range },
    to: { y: range },
    config: {mass: 1, tension: 50, friction: 0}
  });
  return [style];
}