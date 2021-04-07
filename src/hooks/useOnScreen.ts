import { useEffect, useState } from 'react';

/**
 * Helps to determine if a component is onScreen using the IntersectionObeserver API
 */
export const useOnScreen = (options = {} as IntersectionObserverInit) => {
  const [ref, setRef] = useState<HTMLDivElement>();
  const [view, set] = useState(false);
  useEffect(() => {
    // Create observer on mount.
    const observer = new IntersectionObserver(([entry]) => set(entry.isIntersecting), options);
    // If the ref is ready, attach it to observer.
    if (ref) observer.observe(ref);
    // Remove observer on dismount.
    return () => ref && observer.unobserve(ref);
  }, [ref, options]);
  return [setRef, view];
};
