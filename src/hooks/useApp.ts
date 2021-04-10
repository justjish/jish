import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'functions/middleware';
import { FC } from 'react';
import Introduction from 'container/Introduction';
import Playground from 'container/Playground';

type State = {
  Current: FC<{}>;
  loadIntroduction: () => void;
  loadPlayground: () => void;
};
/**
 * An app switching hook.
 *
 * We store the current application, represented as a component, in state.
 * We can switch apps by calling their respective action.
 */
const useApp = create<State>(
  devtools(
    immer((set) => ({
      Current: Introduction, //By default we load the Introduction Componenent
      loadIntroduction: () => set((state) => void (state.Current = Introduction)),
      loadPlayground: () => set((state) => void (state.Current = Playground)),
    })),
  ),
);

export default useApp;
