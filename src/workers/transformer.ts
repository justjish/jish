// import type { NodeData, EdgeData } from '../@types/app';
// import {fromPairs, map, pipe, pickBy,merge, keys} from 'ramda';
// import _ from 'lodash/fp';
// import { distances } from 'graph/analysis';
// import {
//   convertNodeToIndex,
//   convertEdgeToIndex,
//   convertEdgeDataToEdge,
//   convertNodeDataToNode,
// } from '../functions/transformers.js';
// import { formatEdge, formatNode } from '../functions/formatters';
// import { isSource } from '../functions/conditionals';

// onmessage = async (e: { data: [any, any]; }) => {
//   const [id, url] = e.data;
//   const res = await fetch(url);
//   const data: { nodes: Array<NodeData>; edges: Array<EdgeData> } = await res.json();
//   const nodes = fromPairs(map(pipe(formatNode, convertNodeDataToNode, convertNodeToIndex))(data.nodes));
//   const edges = fromPairs(map(pipe(formatEdge, convertEdgeDataToEdge, convertEdgeToIndex))(data.edges));
//   const centralNodes = keys(pickBy(isSource, nodes));
//   const items = merge(nodes, edges);
//   void Promise.all(centralNodes.map((id) => distances(items, id as string, { direction: 'from' }))).then((values) => {
//     const distanceLookup = values.reduce((acc, item) => {
//       void Object.entries(item).forEach(([k, v]) => (acc[k] = acc[k] ? (acc[k] < v ? v : acc[k]) : v));
//       return acc;
//     });
//     const degreesLookup = _.invertBy(_.identity, distanceLookup);
//     const order = Object.values(degreesLookup).flat();
//     postMessage([id, nodes, edges, order, degreesLookup]);
//   });
// };
// export default self
export default {};