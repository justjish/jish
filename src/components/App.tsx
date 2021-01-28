import React, { useState, useEffect } from 'react';
import useStore from '../hooks/useStore';
import Network from './Network';
import Profile from './Profile';

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(
    () =>
      useStore.subscribe(
        () => setLoading(false),
        (state) => state.store.creds,
      ),
    [],
  );
  return loading ? (
    <div>Loading</div>
  ) : (
    <div>
      <Profile />
      <Network />
    </div>
  );
};

export default App;
