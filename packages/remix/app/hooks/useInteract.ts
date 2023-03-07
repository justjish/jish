import { useSpring, config } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
/**
 * A unified hook to standardize interaction animations for interactable components.
 * TODO: Expand settings
 *
 * onClick: Synchronously do what you want.
 */

export const useInteract = ({ onClick = () => ({}) }: { onClick: () => void }) => {
  const [interactStyles] = useSpring({ scale: 1, config: config.wobbly }, []);
  const bind = useGesture({
    onMouseDown: () => interactStyles.scale.start(0.9),
    onMouseUp: async () => {
      onClick();
    },
    onHover: ({ hovering }) => (hovering ? interactStyles.scale.start(1.1) : interactStyles.scale.start(1)),
  });
  return { bind, interactStyles };
};

export default useInteract;
