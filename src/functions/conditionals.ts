import type { Node } from '../@types/app';
export const isSource = (n: Node) => n.data.is_source == true;
