import type { WritableDraft } from 'immer/dist/types/types-external';
import type { Index } from 'graph';
import create from 'zustand';
import { immer, devtools } from '../functions/middlewares';
import type { Node, Edge, Edges, Nodes } from '../@types/app';
import type { Chart } from 'graph';
import type firebase from 'firebase';
import { ANIMATION, COMBINE, ITEMS, LAYOUT, OPTIONS } from '../constants/Chart';
import { useDatabase, useStorage, useAuth } from './useFirebase';
import * as R from 'ramda';

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
});

const query = async () => (await useDatabase.collection('/datasets').orderBy('idx').get()).docs;

const useStore = create<State>(
  devtools(
    immer(
      (set, get, api): State => {
        // Instantiate Worker
        const transformer = new Worker(new URL('../workers/transformer.js', import.meta.url), {
          name: 'processor',
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
              const [val, transformer] = [get().store.datasets[id].meta.path as string, get().workers.transformer];
              const url = (await useStorage.refFromURL(val).getDownloadURL()) as string;
              transformer.postMessage([id, url]);
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
          workers: { transformer },
          set,
        };
      },
    ),
  ),
);

useAuth.signInAnonymously().then((userCred) => {
  console.log(userCred);
  useStore.getState().set((state) => void (state.store.creds = userCred));
});

export default useStore;
