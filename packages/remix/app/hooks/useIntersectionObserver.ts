import { useState, useEffect, useTransition, useRef, Ref } from 'react';
import { isSSR } from '~/utils/utils';

export type IntersectionObserverProps = {
  /**
   * If you already have a ref assigned for the component you wish to observe,
   * then you can pass it in here. Otherwise, a new ref will be created and
   * returned for you to assigned to the component you wish to observe.
   */
  ref?: Ref<HTMLDivElement> | undefined;
  /**
   * The options object passed to the IntersectionObserver constructor.
   * Defaults will be used to create the IntersectionObserver if no options are provided.
   * By default, the root is set to null, which means that the viewport is used as the root.
   * By default, the rootMargin is set to 0px, which means that the threshold is relative to the visible part of the target element.
   * By default, the threshold is set to 0, meaning that the callback will be executed when the target element intersects the root.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
   */
  options?: IntersectionObserverInit | undefined;
};

export type IntersectionObserverReturn = [
  /**
   * Either
   * 1. A new ref that should be assigned to the component you wish to observe.
   * 2. Or the ref that was passed in as a prop.
   **/
  ref: Ref<HTMLDivElement> | undefined,
  /**
   * The IntersectionObserverEntry object that is returned by the IntersectionObserver.
   * If the IntersectionObserver is not supported, then this will be undefined.
   * If the IntersectionObserver is supported, but the ref is not assigned to a component, then this will be undefined.
   * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
   */
  entry: IntersectionObserverEntry | undefined,
];

/**
 *
 * @param IntersectionObserverProps
 * @returns
 */
const useIntersectionObserver = ({ ref, options }: IntersectionObserverProps = {}): IntersectionObserverReturn => {
  const [entry, set] = useState<IntersectionObserverEntry>();
  const [, start] = useTransition();
  const updateEntry: IntersectionObserverCallback = ([entry]) => {
    start(() => set(entry));
  };
  const nodeRef = ref ?? useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure we are not in SSR and that the ref has been assigned to a component.
    if (isSSR() || typeof nodeRef === 'function') return;
    const node = nodeRef.current;
    const hasIOSupport = 'IntersectionObserver' in window && typeof window.IntersectionObserver === 'function';
    if (!hasIOSupport || !node) return;

    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [nodeRef, options]);

  return [nodeRef, entry];
};
export default useIntersectionObserver;
