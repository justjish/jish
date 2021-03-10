
import { useSpring, config } from 'react-spring';
import { useGesture } from 'react-use-gesture';

/**
 * A simple hook used to enable animated interactions with components.
 */ 
export const useHover = ({ onClick=() => {}}) => {
  const [{ scale }, set] = useSpring({ from: { scale: .1 }, to: { scale: 1 }, config: config.default}, []);
  const bind = useGesture({
    onTouchStart: ({}) => set({ scale: 0.5}),
    onTouchEnd: ({ }) => set({ scale: 1 }),
    onMouseDown: ({}) => set({ scale: 0.9 }),
    onMouseUp: ({ hovering }) => {
      if (hovering) set({ scale: 1.2 });
      onClick();
    },
    onHover: ({ hovering }) => (hovering ? set({ scale: 1.2 }) : set({ scale: 1 })),
  });
  return { bind, scale };
}

