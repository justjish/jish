import React, { useState } from 'react';
import useStore from '../hooks/useStore';
import type { Dataset } from '../hooks/useStore';

const Button = ({ dsId, item, action }: { dsId: string; item: Dataset; action: () => Promise<void> }) => {
  const [active, setActive] = useState(true);
  React.useEffect(
    () =>
      useStore.subscribe(
        (sel: string | null) =>
          typeof sel == null ? setActive(true) : sel === dsId ? setActive(false) : setActive(true),
        (state) => state.store.selected,
      ),
    [],
  );
  return (
    <button title={item.meta.title} onClick={() => action()} disabled={!active}>
      Load a {item.meta.title} Graph
    </button>
  );
};

const Datasets = ({}): JSX.Element => {
  const datasets = useStore((state) => state.store.datasets);
  const loadMeta = useStore(React.useCallback((state) => state.actions.loadMeta, []));
  React.useEffect(() => void loadMeta(), []);
  return (
    <div>
      {Object.entries(datasets).map(
        ([k, o]): JSX.Element => (
          <Button key={k} dsId={k} item={o} action={() => useStore.getState().actions.loadData(k)} />
        ),
        datasets,
      )}
    </div>
  );
};
export default Datasets;
