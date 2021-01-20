'use strict';
import type { Edge, EdgeData, Node, NodeData } from '../app';
export const convertEdgeDataToEdge = (e: EdgeData): Edge => ({
  id1: e.source,
  id2: e.target,
  end2: { arrow: true },
  data: { ...e },
});
export const convertNodeDataToNode = (n: NodeData): Node => ({ data: { ...n } });
