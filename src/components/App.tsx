import React, { useEffect, useState } from 'react';
import useStore, { Creds } from '../hooks/useStore';
import { useSpring, animated as a } from 'react-spring';
import Header from './Header';
import Datasets from './Datasets';
import Network from './Network';
import Workers from './Workers';
import Toaster from './Toaster';
import Loading from './Graphics';

const App = () => {
  const [start, set] = useState(false);
  useEffect(
    () =>
      useStore.subscribe(
        () => set(true),
        (state) => state.store.creds,
      ),
    [],
  );
  return <Loading />;
};

export default App;
