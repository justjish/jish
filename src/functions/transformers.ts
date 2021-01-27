import type { Edge, EdgeData, Node, NodeData } from '../app';
export const convertEdgeDataToEdge = (e: EdgeData): Edge => ({
  id1: e.source,
  id2: e.target,
  end2: { arrow: true },
  data: e,
});
export const convertNodeDataToNode = (n: NodeData): Node => ({ data: n });
export const convertNodeToIndex = (o: Node): [string, Node] => [o.data.id, o];
export const convertEdgeToIndex = (o: Edge): [string, Edge] => [o.data.id, o];
export default {
  convertNodeToIndex,
  convertEdgeToIndex,
  convertNodeDataToNode,
  convertEdgeDataToEdge,
};
