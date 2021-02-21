import * as React from 'react';
import { useSpring } from 'react-spring';
export const useGrow = (size: number) => {
  const [style, animate] = useSpring({ fontSize: '0vh' }, []);
  React.useEffect(() => {
    void animate({ fontSize: '3vh' });
    return () => void animate({ fontSize: '0vh' });
  }, []);
  return [style];
};
