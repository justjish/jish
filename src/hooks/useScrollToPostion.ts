import { config, useSpring } from 'react-spring';
/**
 * EXPERIMENTAL
 * @returns {scrollToTarget}
 */
export const useScrollToPosition = () => {
  const [{y}, yRef] = useSpring(({ y: 0 }),[]);

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
      onChange: ({ y }) => {
        if (!isStopped) {
          window.scrollTo(0, y);
        }
			},
			config:config.molasses
    });
  };

  return { scrollToTarget };
};
