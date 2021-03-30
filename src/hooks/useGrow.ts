import { useSpring } from 'react-spring';
/**
 * Hook that will grow font to a final size on mount.
 * Note* All fonts are read as rem. Feel free to add 
 * an optional options enum for override
 */
export const useGrow = (size: number) => {
  const [style] = useSpring({ fontSize: `${size}rem` }, []);
  return [style];
};
