import * as React from 'react';

export const useWindowSize = () => {
  const windowSize = React.useRef({
    width: 0,
    height: 0,
  });
  React.useEffect(() => {
    const handleResize = () => {
      windowSize.current.width = window.innerWidth;
      windowSize.current.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize.current;
};
export default useWindowSize;
