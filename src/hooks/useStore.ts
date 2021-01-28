import type { WritableDraft } from 'immer/dist/types/types-external';
import type { Index } from 'graph';
import create from 'zustand';
import { immer, devtools } from '../functions/middlewares';
import type { Node, Edge, Edges, Nodes } from '../@types/app';
import type { Chart } from 'graph';
import type firebase from 'firebase';
import { ANIMATION, COMBINE, ITEMS, LAYOUT, OPTIONS } from '../constants/Chart';
import { useDatabase, useStorage } from './useFirebase';
import type Graph from 'graphology-types';
import * as R from 'ramda';

export const query = async () => (await useDatabase.collection('/datasets').orderBy('idx').get()).docs;

export type Creds = firebase.auth.UserCredential;
export type Store = {
  debug: Object;
  selected: string | null;
  datasets: Index<Dataset>;
  creds: Creds;
  chart: {
    props: Chart.Props;
    event: {
      changes: Array<Chart.ChangeEvent>;
      comboLinks: Array<Chart.CombineLinksEvent<Edge>>;
      comboNodes: Array<Chart.CombineNodesEvent<Node>>;
    };
  };
};
export type Effects = {};
export type Actions = {
  loadMeta: () => Promise<void>;
  loadData: (id: string) => Promise<void>;
};
export type Workers = {
  transformer: Worker;
  layoutEngine: Worker;
};

export type State = {
  store: Store;
  effects: Effects;
  actions: Actions;
  workers: Workers;
  set: (fn: (draft: WritableDraft<State>) => void) => void;
};

export type Dataset = {
  meta: Meta;
  data: {
    nodes: Nodes;
    edges: Edges;
    coord: any;
    order: Array<string>;
    degreesLookup: Index<string[]>;
  };
  graph: Graph;
};
type Meta = firebase.firestore.DocumentData & {
  title: string;
  idx: number;
  path: string;
  description: string;
};

const defaultData = () => ({
  meta: {} as Meta,
  data: {
    nodes: {} as Nodes,
    edges: {} as Edges,
    coord: {} as any,
    order: {} as Array<string>,
    degreesLookup: {} as Index<string[]>,
  },
  graph: {} as Graph,
});

const useStore = create<State>(
  devtools(
    immer(
      (set, get, api): State => {
        // Instantiate Worker
        const transformer = new Worker(new URL('../workers/transformer.js', import.meta.url), {
          name: 'processor',
          type: 'module',
        });
        const layoutEngine = new Worker(new URL('../workers/layoutEngine.js', import.meta.url), {
          name: 'layoutEngine',
          type: 'module',
        });
        // Attach
        transformer.addEventListener('message', (ev) =>
          api.getState().set((state) => {
            const [id, nodes, edges, order, degreesLookup] = ev.data;
            state.store.selected = id;
            state.store.datasets[id].data.order = order;
            state.store.datasets[id].data.degreesLookup = degreesLookup;
            state.store.datasets[id].data.edges = edges;
            state.store.datasets[id].data.nodes = nodes;
            state.store.chart.props.items = { ...nodes, ...edges };
          }),
        );

        layoutEngine.addEventListener('message', (ev) =>
          api.getState().set((state) => {
            const [id, graph, positions] = ev.data;
            state.store.datasets[id].graph = graph;
            state.store.datasets[id].data.coord = positions;
          }),
        );
        return {
          store: {
            debug: Object,
            selected: null,
            datasets: {} as Index<Dataset>,
            chart: {
              props: {
                items: ITEMS,
                animation: ANIMATION,
                layout: LAYOUT,
                combine: COMBINE,
                options: OPTIONS,
              } as Chart.Props,
              event: {
                changes: [] as Array<Chart.ChangeEvent>,
                comboLinks: [] as Array<Chart.CombineLinksEvent<Edge>>,
                comboNodes: [] as Array<Chart.CombineNodesEvent<Node>>,
              },
            },
            creds: {} as firebase.auth.UserCredential,
          },
          effects: {},
          actions: {
            loadData: async (id: string): Promise<void> => {
              set((state) => void (state.store.selected = id));
              const [val, transformer, layoutEngine] = [
                get().store.datasets[id].meta.path as string,
                get().workers.transformer,
                get().workers.layoutEngine,
              ];
              const url = (await useStorage.refFromURL(val).getDownloadURL()) as string;
              transformer.postMessage([id, url]);
              layoutEngine.postMessage([id, url]);
            },
            loadMeta: async () => {
              R.map(
                (sn) =>
                  set((state) => {
                    state.store.datasets[sn.id] = defaultData();
                    state.store.datasets[sn.id].meta = sn.data() as Meta;
                  }),
                await query(),
              );
            },
          },
          workers: { transformer, layoutEngine },
          set,
        };
      },
    ),
  ),
);

export default useStore;
