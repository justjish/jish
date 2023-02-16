import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@react-spring/web';
import { isSSR } from '~/utils/utils';

export const useWindowHeightRef = () => {
  const ref = useRef(1);
  useIsomorphicLayoutEffect(() => {
    if (isSSR()) return;
    // Handle Resize
    const handleResize = () => {
      ref.current = window.innerHeight;
    };
    // Set initial height on mount
    handleResize();
    // Add resize listener to window
    window.addEventListener('resize', handleResize);
    // Remove resize listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);
  return ref;
};
