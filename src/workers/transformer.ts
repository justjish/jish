import type { NodeData, EdgeData } from '../@types/app';
import * as R from 'ramda';
import _ from 'lodash/fp.js';
import { distances } from 'graph/analysis.js';
import {
  convertNodeToIndex,
  convertEdgeToIndex,
  convertEdgeDataToEdge,
  convertNodeDataToNode,
} from '../functions/transformers.js';
import { formatEdge, formatNode } from '../functions/formatters.js';
import { isSource } from '../functions/conditionals.js';

onmessage = async (e) => {
  const [id, url] = e.data;
  const res = await fetch(url);
  const data: { nodes: Array<NodeData>; edges: Array<EdgeData> } = await res.json();
  const nodes = R.fromPairs(R.map(R.pipe(formatNode, convertNodeDataToNode, convertNodeToIndex))(data.nodes));
  const edges = R.fromPairs(R.map(R.pipe(formatEdge, convertEdgeDataToEdge, convertEdgeToIndex))(data.edges));
  const centralNodes = R.keys(R.pickBy(isSource, nodes));
  const items = R.merge(nodes, edges);

  void Promise.all(centralNodes.map((id) => distances(items, id as string, { direction: 'from' }))).then((values) => {
    const distanceLookup = values.reduce((acc, item) => {
      void Object.entries(item).forEach(([k, v]) => (acc[k] = acc[k] ? (acc[k] < v ? v : acc[k]) : v));
      return acc;
    });
    const degreesLookup = _.invertBy(_.identity, distanceLookup);
    const order = Object.values(degreesLookup).flat();
    postMessage([id, nodes, edges, order, degreesLookup], 'WindowProxy');
  });
};

export default {};
