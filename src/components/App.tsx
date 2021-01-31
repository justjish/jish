import * as React from 'react';
import useStore from 'hooks/useStore';
import Network from 'components/Network';
import Profile from 'components/Profile';

const App = () => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(
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
