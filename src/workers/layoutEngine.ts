import type { NodeData, EdgeData } from '../app';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import * as R from 'ramda';
import Graph from 'graphology';
const graph = new Graph({ type: 'directed' });
const getRamdom = (max: number) => () => Math.floor(Math.random() * Math.floor(max));

onmessage = async (e) => {
  const [id, url] = e.data;
  const res = await fetch(url);
  const { nodes, edges }: { nodes: Array<NodeData>; edges: Array<EdgeData> } = await res.json();

  // Add nodes with random x and y to graph
  const upper = Math.ceil(nodes.length / 2);
  const random = getRamdom(upper);
  void R.forEach((o) => graph.addNode(o.id, { x: random(), y: random() }), nodes);
  void R.forEach((o) => graph.addEdge(o.source, o.target), edges);

  const sensibleSettings = forceAtlas2.inferSettings(graph);
  sensibleSettings.adjustSizes = true;
  sensibleSettings.barnesHutOptimize = true;

  const positions = forceAtlas2(graph, { iterations: 1000, settings: sensibleSettings });

  postMessage([id, graph, positions]);
};

export default {};
