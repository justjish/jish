import { FC } from 'react';
import { globalStyles } from 'styles/global.style';
import { Global } from '@emotion/react';
import useApp from 'hooks/useApp';

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
 * @returns App Component
 */

export const App: FC = () => {
  const CurrentApp = useApp((state) => state.Current);
  return (
    <>
      <Global styles={globalStyles} />
      <CurrentApp />
    </>
  );
};
export default App;
