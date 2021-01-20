'use strict';
import * as R from 'ramda';

export const stringToBool = (v: string) =>
  v === 'false' || v === 'null' || v === 'NaN' || v === 'undefined' || v === '0' ? false : !!v;

export const stringToFloat = (v: string): number =>
  Number.isNaN(Number.parseFloat(v)) ? Number.parseFloat('0.0') : Number.parseFloat(v);

export const stringToInt = (v: string): number =>
  Number.isNaN(Number.parseInt(v)) ? Number.parseInt('0') : Number.parseInt(v);

export const satToBtc = (v: number): number => v / 100000000; //BTC Percision is preserved

export const DIVIDER = '|';
export const formatEdge = (e: { source: string; target: string }) => ({
  ...e,
  id: e.source + DIVIDER + e.target,
});

export const formatEntity = (v: string) => (v === '-' || v === '' ? 'unknown' : String(v));

export const formatTainted = R.pipe(stringToFloat, satToBtc);

export const formatTotalAmtReceived = R.pipe(stringToFloat, satToBtc);

export const formatBalance = R.pipe(stringToFloat, satToBtc);

export const formatNode = (o: any) => ({
  id: String(o.id),
  cluster_id: String(o.cluster_id),
  entity: formatEntity(o.entity),
  tainted: formatTainted(o.tainted),
  total_amt_received: formatTotalAmtReceived(o.total_amt_received),
  sumscore: stringToFloat(o.sumscore),
  is_source: stringToBool(o.is_source),
  is_stop_cluster: stringToBool(o.is_stop_cluster),
  clustersize: stringToInt(o.clustersize),
  entitytype: formatEntity(o.entitytype),
  balance: formatBalance(o.balance),
});

export const removeFields = (o: any) => R.omit(['size', 'x', 'y'])(o);

export const formatNodes = (nodes: any) => R.pipe(R.map(formatNode), R.map(removeFields))(nodes);
export const formatEdges = (edges: any) => R.pipe(R.map(formatEdge))(edges);
