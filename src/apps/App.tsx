import { FC, useRef, useState } from 'react';
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
import { useScroll } from 'react-use-gesture';
/**
 *
 * Entry point into the React part of the app.
 * (Currently the React part is the only piece coded up)
 *
 * I'm personally not a big fan of React based routing, so in this
 * particular repo, I'm just going to have the Firebase hosting
 * take care of routing configurations. Since their JS api package is
 * extremely functional. 
 * (Unfornately the bundle for their authentication is huge)
 *
 * @returns App Component
 */
export const App: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  // Using 1 scroll listener across entire component tree
  // It's a little bit of prop passing, but was the quickest solution for render jank
  // *Update* react-spring's officially 9.0 release is a lot more performant than their 9.0.rc3
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
