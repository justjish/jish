import React, {  useEffect , useCallback} from 'react';
import { useTransition, animated as a } from 'react-spring';
import Graph from 'graph';
import { distances } from 'graph/analysis';
import { useStorage } from '../hooks/useFirebase';
import useDatasets from '../hooks/useDatasets';
import { formatNode, formatEdge } from '../functions/formatters';
import { convertNodeDataToNode, convertEdgeDataToEdge } from '../functions/transformers';
import type { Edge, Edges, Node, Nodes, Item, EdgeData, NodeData } from '../app';
import fp from 'lodash/fp';
import shallow from 'zustand/shallow'
import type { StateSliceListener, Subscribe, UseStore } from 'zustand';
import BoxLoading from 'react-loading';



const getSourceNodes = fp.filter((v:Node) => v.data.is_source);

type Listener = {
  selected: string,
  isReady: boolean
}

// const AnimateLoad = ({Component}) => {
//   const [show, set] = useState(false);
//   const transitions = useTransition(show, null, {
//     from: { position: 'absolute', opacity: 0, height: 0, width: "0%" },
//     enter: { opacity: 1, height:600, width: "100%" },
//     leave: { opacity: 0, height: 100, width: 100 },
//   });
//   return <>{transitions.map(({ item, key, props }) => <a.div key={key} style={props}><Component/></a.div>)}</>
// }

const Network = ({ }) => {
  const style = { opacity: 1, height: 600, width: "100%" };
  const ready = useDatasets(state=>state.store.chart.ready);
  const chart = useDatasets(state => state.store.chart.props);
  return <a.div id={'id'} style={style} ><Graph.Chart {...chart} /></a.div >;
}

export default Network;
