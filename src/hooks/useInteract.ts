import { useSpring, config } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { noop } from 'functions/utils';
import { type MouseEventHandler } from 'react';

/**
 * A unified hook to standardize interaction animations for interactable components.
 * TODO: Expand settings
 *
 * onClick: Synchronously do what you want.
 */

type OnClickUseGesture = () => void;
export const useInteract = ({ onClick = () => ({}) }: { onClick: OnClickUseGesture }) => {
  const [interactStyles, api] = useSpring({ scale: 1, config: config.wobbly }, []);
  const bind = useGesture({
    onMouseDown: () => interactStyles.scale.start(0.9),
    onMouseUp: async ({ hovering, event }) => {
      console.log('onMouseUp', hovering, event);
      // const val = hovering ? interactStyles.scale.start(1.1) : interactStyles.scale.start(1);
      onClick();
    },
    onHover: ({ hovering }) => (hovering ? interactStyles.scale.start(1.1) : interactStyles.scale.start(1)),
  });
  return { bind, interactStyles };
};

export default useInteract;
