import { FC, useRef } from 'react';
import { useSpring } from 'react-spring';
import { useScroll } from 'react-use-gesture';
import { view } from 'styles/app.styles';
import Menu from 'components/Menu';
import Hello from 'components/Hello';
import Story from 'components/Story';
import Brain from 'components/Brain';
import Lives from 'components/Lives';
import Learn from 'components/Learn';

const Introduction: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  /**
   * Using 1 scroll listener across entire component tree
   *
   * **The React Component tree doesn't rerender after every 'set' because
   * stateful values gotten from react-spring live outside of react's state management**
   *
   * It's a little bit of prop passing, but was the quickest solution for render jank,
   * the alternative would be to use zustand (a state management library) and it's
   * transient update feature.
   *
   * Also I purposfully didn't introduce debouncing to the scroll listener. Since I wanted
   * the animations to be as fluid as possible.
   **/
  const [{ scroll }] = useSpring({ scroll: window.scrollY }, []);
  useScroll(({ xy: [, y] }) => scroll.set(y / window.innerHeight), { domTarget: window });
  return (
    <div ref={ref} css={view}>
      <Hello offset={scroll} />
      <Story offset={scroll} />
      <Brain offset={scroll} />
      <Lives offset={scroll} />
      <Learn offset={scroll} />
      <Menu />
      
    </div>
  );
};
export default Introduction;
