import { FC, useCallback, useEffect, useRef, UIEvent, useState } from 'react';
import { Global } from '@emotion/react';
import { Menu } from 'components/Menu';
import Hello from 'components/Hello';
import Story from 'components/Story';
import Brain from 'components/Brain';
import Lives from 'components/Lives';
import Learn from 'components/Learn';
import { useSpring } from 'react-spring';
import { view } from '../styles/app.styles';
import { globalStyles } from 'styles/global.style';
import { useGesture, useScroll } from 'react-use-gesture';
/**
 *
 * Entry point into the React part of the app.
 * Currently thats the only piece I have coded up, but want to get Flutter, Vue,
 * and pure HTML in here... this is a web test bench after all.
 *
 * Funny enough, I am not a big fan of using Routers inside React.
 * It would be preferrable to do those types of interacts in pure
 * HTML5 or server side functions.
 *
 * In this particular case, I'm just going to have the Firebase hosting
 * take care of routing configurations. Since their JS webpackage is
 * extremely functional.
 *
 * @returns App Component
 */
export const App: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  // Using 1 scroll listener across entire component tree
  // It's a little bit of prop passing, but was the quickly solution for render jank
  const [{ scroll }] = useSpring({ scroll: window.scrollY }, []);
  useScroll(({ xy: [, y] }) => scroll.set(y / window.innerHeight), { domTarget: window })
  const [show, setShow] = useState(false);
  return (
    <>
      <Global styles={globalStyles} /> {/** Injects the initial style globally */}
      <div ref={ref} css={view}>
        <Hello offset={scroll} setShow={setShow}/>
        {show && <Story offset={scroll} />}
        {show && <Brain offset={scroll} />}
        {show && <Lives offset={scroll} />}
        {show && <Learn offset={scroll} />}
        {show && <Menu />}
      </div>
     
    </>
  );
};
export default App;
