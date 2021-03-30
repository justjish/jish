import { FC, useRef} from 'react';
import { Global } from '@emotion/react';
import { Menu } from 'components/Menu';
import Hello from 'components/Hello';
import Story from 'components/Story';
import Brain from 'components/Brain';
import Lives from 'components/Lives';
import Learn from 'components/Learn';
import { useSpring } from 'react-spring';
import { view } from 'styles/app.styles';
import { globalStyles } from 'styles/global.style';
import { useScroll } from 'react-use-gesture';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
/**
 *
 * Entry point into the React part of the app.
 * (Currently the React part is the only piece coded up)
 *
 * I'm personally not a big fan of React based routing, so in this
 * particular repo, I'm just going to have the Firebase hosting
 * take care of routing configurations. Since their JS api package is
 * extremely functional. 
 * (Unfornately the bundle size for their JS package is huge, need to defer their loading)
 *
 * A few things will you not see because of code styling choices
 * 1. Components wrapped in Contexts... Since context changes cause rerenders down the chain
 *    (Plus they are ugly lol. )
 * 
 * @returns App Component
 */
export const App: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  /**
   * Using 1 scroll listener across entire component tree
   * It doesn't rerender after every 'set'.
   * It's a little bit of prop passing, but was the quickest solution for render jank
   **/
  const [{ scroll }] = useSpring({ scroll: window.scrollY }, []);
  useScroll(({ xy: [, y] }) => scroll.set(y / window.innerHeight), { domTarget: window })
  return (
    <>
      <Global styles={globalStyles} /> {/** Injects the initial style globally */}
      <div ref={ref} css={view}>
        <Hello offset={scroll} />
        <Story offset={scroll} />
        <Brain offset={scroll} />
        <Lives offset={scroll} />
        <Learn offset={scroll} />
        <Menu />
      </div>
     
    </>
  );
};
export default App;
