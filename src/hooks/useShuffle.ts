import { useSpring } from 'react-spring';
export const useShuffle = () => {
  const style = useSpring({
    from: { y: 0, x: 0, opacity: 1 },
    to: [{ x: 100 }, { y: 100 }, { x: 0 }, { y: 0 }],
  });
  return [style];
};
