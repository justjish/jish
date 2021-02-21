import create from 'zustand';
import { devtools } from 'functions/middlewares';
export type State = {
  sections: number;
  pages: number;
  zoom: number;
  top: number;
};
const useStore = create<State>(
  devtools((set) => ({
      sections: 3,
      pages: 3,
      zoom: 75,
      top: 0,
      set,
    }),
  ),
);

export default useStore;
