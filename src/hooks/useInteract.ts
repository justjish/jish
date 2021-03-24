
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
  const [{ scale }, scaleRef] = useSpring(() => ({ from: { scale: 1 }, config: config.wobbly }));
  const bind = useGesture({
    onTouchStart: ({ }) => scale.start(0.5),
    onTouchEnd: ({ }) => scale.start(1),
    onMouseDown: ({ }) => scale.start(0.9),
    onMouseUp: ({ hovering }) => {
      if (hovering) scale.start(1.2);
      onClick();
    },
    onHover: ({ hovering }) => (hovering ? scale.start(1.2 ) : scale.start(1))
  });
  return { bind, scale};
}

export default useInteract;