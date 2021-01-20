import * as React from 'react';

import useDatasets from '../hooks/useDatasets';
import fp from 'lodash/fp';

const Datasets = ({ }): JSX.Element => {
  const [index, ready, actions] = useDatasets(state => [state.store.data.index, state.store.data.ready, state.actions]);
  React.useEffect(() => { actions.loadDataIndicies() }, []);

  return (
    <div style={{ zIndex: 100 }}>
      {ready && 
        <ol>
        {Object.entries(index).map(([k,o]): JSX.Element => (
            <ul key={k}>
            <button title={o.doc.title}onClick={()=>actions.loadDataProper(k)}>Load a {o.doc.title} Graph</button>
            </ul>
          ), index)}
        </ol>
      }
      {!ready && <div>Loading</div>}
      </div>
  );
};
export default Datasets;