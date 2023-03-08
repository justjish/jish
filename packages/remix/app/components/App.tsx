import { useEffect, useRef, type FC } from 'react';
import { useScroll, useSpring } from '@react-spring/web';
import { useWindowHeightRef } from '~/hooks/useWindowHeightRef';
import Menu from '~/components/Menu';
import Hello from '~/components/Hello';
import Story from '~/components/Story';
import Brain from '~/components/Brain';
import Lives from '~/components/Lives';
import Learn from '~/components/Learn';
import { MenuProvider } from '~/contexts/menu';
import { isSSR } from '~/utils/utils';
import useMeasure from 'react-use-measure';

/**
 * The entire point for the landing page of the site.
 *
 * Notes
 * - There is 1 scroll listener for the entire page
 * - The scroll listener is used to calculate the scroll position
 * - As a personal perf challenge, I wanted the scroll listener to never
 *   debounce or throttle. This way the animations are always smooth.
 * @returns App Component
 */
export const App: FC = () => {
  const ref = useRef<HTMLDivElement>({ clientHeight: 1 } as HTMLDivElement);
  // This provides the row scroll position
  const scrollPos = useScroll({});
  // We interpolate the scroll position to a value between 0 and 4, representing the sections of the page
  const [{ offset },api] = useSpring(
    () => ({
      offset: scrollPos.scrollY.to((v) => v / ref.current.clientHeight),
    }),
    [scrollPos,ref.current.clientHeight],
  );
  return (
    <>
      <div style={{ overflow: 'hidden', height: 0 }}>
        <div ref={ref} style={{ position: 'fixed', height: '100vh' }}></div>
      </div>
      <MenuProvider>
        <div className="absolute w-screen h-[500vh] overflow-x-hidden m-0 p-0">
          <Hello offset={offset} />
          <Story offset={offset} />
          <Brain offset={offset} />
          <Lives offset={offset} />
          <Learn offset={offset} />
          <Menu />
        </div>
      </MenuProvider>
    </>
  );
};
export default App;
