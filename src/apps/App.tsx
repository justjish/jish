import React, {useCallback, useEffect, useRef} from 'react';
import { Global } from '@emotion/react';
import { Menu } from 'components/Menu';
import Hello from 'components/Hello';
import Story from 'components/Story';
import Brain from 'components/Brain';
import About from 'components/About';
import { useSpring } from 'react-spring';
import { view } from '../styles/app.styles';
import { BrainData } from 'data/BrainData';
import { shuffle, memoize } from 'lodash';
import useBounds from 'hooks/useBounds';
import { globalStyles } from 'styles/global.style';
const ShuffledBrain = memoize(()=>shuffle(BrainData));
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
export const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ scroll }, set] = useSpring(() => ({ scroll: 0 }));

  const onScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    set({ scroll: e.currentTarget.scrollTop / (window.innerHeight)});
  }, []);

  /** 
   * Listen to the useBounds store. If the state of the click value has change
   * update the scrollTo. 
   * ... need to polyfill 'behavior: smooth' for Safari ... 
   * 
   * Or just use react-spring and 'onFrame'.
   */
  useEffect(() => {
    const fn = (x: number) => ref.current?.scrollTo({ top: x, left: 0, behavior: 'smooth' });
    const unsubscribe = useBounds.subscribe(fn, state => state.click);
    return () => unsubscribe();
  },[])

  return (
    <>
      <Global styles={globalStyles} /> {/** Injects the initial style globally */}
      <div ref={ref} css={view} onScroll={onScroll}>
        <Hello offset={scroll}/>
        <Story offset={scroll}/>
        <Brain offset={scroll}/>
        <About offset={scroll}/>
        <Menu offset={scroll}/>
      </div>
    </>
  );
};
export default App;
