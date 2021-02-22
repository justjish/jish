import * as React from 'react';
export const useWindowSize = () => {
    const [ref,setRef] = React.useState({} as HTMLDivElement);
    const [bounds, setBounds] = React.useState({});
    const set = () => setBounds(ref && ref.getBoundingClientRect ? ref.getBoundingClientRect() : {});
  
    React.useEffect(() => {
      set();
      window.addEventListener('resize', set);
      return () => window.removeEventListener('resize', set);
    }, []);
  
    return [bounds, setRef];
};
  
export default useWindowSize;
