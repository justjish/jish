import { config, useSpring } from '@react-spring/web';
/**
 * EXPERIMENTAL
 *
 * Using React-Spring to handle 'scrollTo' smoothly.
 * Polyfill for Safari made this not needed for release,
 * however it can be expanded upon to provide a customized
 * scrollTo expierence.
 *
 * @returns {scrollToTarget}
 */
export const useScrollToPosition = () => {
  const [, yRef] = useSpring({ y: 0 }, []);

  let isStopped = false;
  const onWheel = () => {
    isStopped = true;
    window.removeEventListener('wheel', onWheel);
  };

  const scrollToTarget = (to: number) => {
    const value = to;
    window.addEventListener('wheel', onWheel);
    yRef.update({
      y: value,
      reset: true,
      from: { y: 0 },
      onRest: () => {
        isStopped = false;
        window.removeEventListener('wheel', onWheel);
      },
      onChange: () => {
        if (!isStopped) window.scrollTo(0, to);
      },
      config: config.molasses,
    });
  };

  return { scrollToTarget };
};
