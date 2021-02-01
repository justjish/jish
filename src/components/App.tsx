import * as React from 'react';
import useStore from 'hooks/useStore';
import Network from 'components/Network';
import Loading from 'components/Loading';
import Header from 'components/Header';

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
  return loading ? <Loading /> :
    <div>
      <Header />
      <Network />
    </div>;
};

export default App;
