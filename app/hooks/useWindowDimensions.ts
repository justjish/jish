import { useState, useEffect } from 'react';
import { isSSR } from '~/functions/utils';
function getWindowDimensions() {
  const width = isSSR() ? 0 : window.innerWidth;
  const height = isSSR() ? 0 : window.innerHeight;
  return {
    width,
    height,
  };
}
/**
 * useWindowDimensions
 * A hook that will return the current window dimensions and update them when the window is resized.
 * Note that this hook will return 0 for both width and height if it is called on the server, which maybe
 * problematic if you are using it to determine the size of an element.
 * @returns
 */
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    if (isSSR()) return;
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
