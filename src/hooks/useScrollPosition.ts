import {useLayoutEffect, useState, useRef} from 'react';
import create from 'zustand';
// Its not the most effecient thing in the world, but gets the job done.
// TODO: Check/Optimize on Final Stress Test

export const useScrollPosition = () =>  {
  const [pos, set] = useState(0);
  useLayoutEffect(() => {
    const updatePosition = () => set(window.pageYOffset);
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);
  return [pos];
} 
