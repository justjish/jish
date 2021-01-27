import type { Node } from '../app';
export const isSource = (n: Node) => n.data.is_source == true;
