import { useSpring } from 'react-spring';
import { useHover } from 'react-use-gesture';
export const useAnimatedHover = ({to=1}) => {
  const [{ scale }, set] = useSpring({ scale: 1 },[]);
  const bind = useHover(({ hovering }) => hovering ? set({ scale: to }) : set({ scale: 1 }));
  return { bind, scale };
}