import type { WritableDraft } from 'immer/dist/types/types-external';
import type { Dictionary } from 'lodash';
import create from 'zustand';
import * as mw from 'zustand/middleware';
import { immer } from '../functions/middlewares';
import type { EdgeData, Edges, NodeData, Nodes, Node, Edge } from '../app';
import type { Chart } from 'graph';
import type firebase from 'firebase';
import { ANIMATION, COMBINE, ITEMS, LAYOUT, OPTIONS } from '../constants/Chart';
import { useDatabase, useStorage } from '../hooks/useFirebase';
import * as R from 'ramda';
import _ from 'lodash/fp';
import shallow from 'zustand/shallow';
import { formatNode, formatEdge } from '../functions/formatters';
import { convertNodeDataToNode, convertEdgeDataToEdge } from '../functions/transformers';
import { distances } from 'graph/analysis';

type db = {
  doc: firebase.firestore.DocumentData;

  nodes: Nodes;
  edges: Edges;

  ready: false;
  error: false;

  order: Dictionary<string[]>;
};

type Store = {
  store: {
    ids: [];
    data: {
      index: Dictionary<db>;
      ready: boolean;
      error: boolean;
    };
    chart: { props: Chart.Props; ready: boolean; error: boolean };
  };
  effects: {};
  actions: {
    loadDataProper: (id: string) => Promise<void>;
    loadDataIndicies: () => Promise<void>;
  };
  set: (fn: (draft: WritableDraft<Store>) => void) => void;
};

const useDatasets = create<Store>(
  mw.devtools(
    immer((set, get, api) => {
      return {
        store: {
          error: false,
          ready: false,
          ids: [],
          data: {
            index: {},
            ready: false,
            error: false,
          },
          chart: {
            props: { items: ITEMS, animation: ANIMATION, layout: LAYOUT, combine: COMBINE, options: OPTIONS },
            ready: false,
            error: false,
          },
        },
        effects: {},
        actions: {
          loadDataProper: async (id: string) => {
            const [val, set] = [get().store.data.index[id].doc.path, get().set];
            const url = await useStorage.refFromURL(val).getDownloadURL();
            const res = await fetch(url);
            const datas: { nodes: Array<NodeData>; edges: Array<EdgeData> } = await res.json();
            const nodes = _.keyBy('data.id', datas.nodes.map(formatNode).map(convertNodeDataToNode));
            const sourceIds = R.keys(R.filter((v) => v.data.is_source, nodes));
            const edges = _.keyBy('data.id', datas.edges.map(formatEdge).map(convertEdgeDataToEdge));
            if (!sourceIds.length) return;
            const items = _.merge(nodes, edges);
            const distancePromises = _.map((id) => distances(items, id as string, { direction: 'from' }), sourceIds);
            const resolvedValues = await Promise.all(distancePromises);
            const distanceLookup = resolvedValues.reduce((acc, item) => {
              Object.entries(item).forEach(([k, v]) => (acc[k] = acc[k] ? (acc[k] < v ? v : acc[k]) : v));
              return acc;
            });
            const loadOrder = _.invertBy(_.identity, distanceLookup);
            set((state) => void (state.store.data.index[id].order = loadOrder));
          },
          loadDataIndicies: async () => {
            const query = async () => (await useDatabase.collection('/datasets').orderBy('idx').get()).docs;
            const docs = await query();
            docs.map((sn) =>
              set((state) => {
                state.store.data.index[sn.id] = {
                  nodes: {},
                  edges: {},
                  ready: false,
                  error: false,
                  doc: sn.data(),
                  order: {},
                };
                state.store.data.ready = true;
              }),
            );
          },
        },
        set,
      };
    }),
  ),
);

export default useDatasets;
