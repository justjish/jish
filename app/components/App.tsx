import { type FC } from 'react';
import { useScroll, useSpring } from '@react-spring/web';
import { useWindowHeightRef } from 'hooks/useWindowHeightRef';
import Menu from 'components/Menu';
import Hello from 'components/Hello';
import Story from 'components/Story';
import Brain from 'components/Brain';
import Lives from 'components/Lives';
import Learn from 'components/Learn';
import { StoryProvider } from 'hooks/useStory';
import { MenuProvider } from 'hooks/useMenu';

/**
 *
 * Entry point into the React part of the app.
 * (Currently the React part is the only piece coded up)
 *
 * I'm personally not a big fan of React based routing, so in this
 * particular repo, I'm just going to have the Firebase hosting
 * take care of routing configurations.
 *
 * A few things will you not see because of code styling choices
 * 1. Components wrapped in Contexts... Since context changes cause rerenders down their individual
 *    tree path, that then require wrapping up components in React.memo()... It just gets messy quickly.
 * 2. A component library like bootstrap/materialui. I am not opposed to them, I just wanted
 *    to create a custom look without having to reverse engineer pre-existing styles.
 * 3. A scroll listener that is not debounced, to ensure fluid motion during scrolling.
 *
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
 *
 *
 * @returns App Component
 */

export const App: FC = () => {
  // Do not destructure, this holds a reference to the window height
  const heightRef = useWindowHeightRef();
  // This provides the row scroll position
  const scrollPos = useScroll({});
  // We interpolate the scroll position to a value between 0 and 4, representing the sections of the page
  const [{ offset }] = useSpring({ offset: scrollPos.scrollY.to((v) => v / heightRef.current) }, [scrollPos]);
  return (
    <MenuProvider>
      <div className="absolute w-screen h-[500vh] overflow-x-hidden m-0 p-0">
        <Hello offset={offset} />
        <StoryProvider>
          <Story offset={offset} />
        </StoryProvider>
        <Brain offset={offset} />
        <Lives offset={offset} />
        <Learn offset={offset} />
        <Menu />
      </div>
    </MenuProvider>
  );
};
export default App;
