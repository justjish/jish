import { DetailedHTMLProps, HTMLAttributes, useEffect,useState } from 'react';

export const useOnScreen = (options = {} as IntersectionObserverInit) => {
  const [ref, setRef] = useState<HTMLDivElement>();
  const [view, set] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => set(entry.isIntersecting), options);
    if (ref) observer.observe(ref);
    return () => ref && observer.unobserve(ref);
  }, [ref,options]);
  return [setRef, view];
};