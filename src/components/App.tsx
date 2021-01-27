import * as React from 'react';
import useStore, { Creds } from '../hooks/useStore';
import Header from './Header';
import Datasets from './Datasets';
import Network from './Network';
import Workers from './Workers';
import Toaster from './Toaster';

const App = () => {
  const [start, set] = React.useState(false);
  React.useEffect(
    () =>
      useStore.subscribe(
        () => set(true),
        (state) => state.store.creds,
      ),
    [],
  );
  return (
    <div>
      {start ? (
        <>
          <Header />
          <>
            <Toaster />
            <Workers />
            <Datasets />
            <Network />
          </>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default App;
