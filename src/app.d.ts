import { Node as BlankNode, Link as BlankLink } from 'graph';
import type { Dictionary } from 'lodash';
// These values should just be marked as required... to ensure API data is accurate...
export declare type NodeData = {
  id: string;
  cluster_id: string;
  entity: string;
  tainted: number;
  total_amt_received: number;
  sumscore: number;
  is_source: boolean;
  is_stop_cluster: boolean;
  clustersize: number;
  entitytype: string;
  balance: number;
  // Add custom fields for analysis. Labeled APP_[FEAT]_[label]:enum [string, number, boolean, etc...]
  // Add custom fields for usernotes: Labeled USER_[label]:
};
export declare type EdgeData = {
  id: string;
  source: string;
  target: string;
};
export declare type Node = BlankNode<NodeData>;
export declare type Edge = BlankLink<EdgeData>;
export declare type Nodes = Dictionary<Node>;
export declare type Edges = Dictionary<Edge>;
export declare type Item = Node | Edge;
export declare type Items = Dictionary<Item>;
