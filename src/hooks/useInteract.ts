import { useSpring, config } from 'react-spring';
import { useGesture } from 'react-use-gesture';

/**
 * A unified hook to standardize interaction animations for interactable components.
 * TODO: Expand settings
 *
 * onClick: Synchronously do what you want.
 */
export const useInteract = ({ onClick = () => {} }) => {
  const [interactStyles] = useSpring({ scale: 1, config: config.wobbly }, []);
  const bind = useGesture({
    onClick: onClick,
    onMouseDown: ({}) => interactStyles.scale.start(0.9),
    onMouseUp: ({ hovering }) => (hovering ? interactStyles.scale.start(1.1) : interactStyles.scale.start(1)),
    onHover: ({ hovering }) => (hovering ? interactStyles.scale.start(1.1) : interactStyles.scale.start(1)),
  });
  return { bind, interactStyles };
};

export default useInteract;
