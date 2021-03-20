
import { useSpring, config } from 'react-spring';
import { useGesture } from 'react-use-gesture';

/**
 * A unified hook to standardize interaction animations for animated components. 
 * TODO: Expand settings
 * 
 * onClick: Synchronously do what you want. 
 * onBeforeClick: An 
 */ 
export const useInteract = ({onClick=() => {}}) => {
  const [{ scale }, set] = useSpring({ from: {scale: 1 }, config: config.wobbly}, []);
  const bind = useGesture({
    onTouchStart: ({}) => set({ scale: 0.5}),
    onTouchEnd: ({ }) => set({ scale: 1 }),
    onMouseDown: ({}) => set({ scale: 0.9 }),
    onMouseUp: ({ hovering }) => {
      if (hovering) set({ scale: 1.2 });
      onClick();
    },
    onHover: ({ hovering }) => (hovering ? set([{ scale: 1.2}]) : set([{ scale: 1}])),
  });
  return { bind, scale};
}

export default useInteract;