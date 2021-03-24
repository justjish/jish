import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { RectReadOnly } from 'react-use-measure';
import { immer } from 'functions/middleware';

type Details = RectReadOnly & { absoluteTop: number };

type State = {
  click: number;
  hello: Details;
  story: Details;
  brain: Details;
  lives: Details;
  learn: Details;
  setClick: (to: number) => void;
  setHello: (bounds: Details) => void;
  setStory: (bounds: Details) => void;
  setBrain: (bounds: Details) => void;
  setLives: (bounds: Details) => void;
  setLearn: (bounds: Details) => void;
};
/** 
 * A globally accessible store to that holds important sizing information per component 
 * Also used by the Nav Menu to determine where to go.
*/
const useBounds = create<State>(
  devtools(
    immer((set) => ({
      click: 0,
      hello: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 0 },
      story: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 0 },
      brain: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 0 },
      lives: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 0 },
      learn: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 0 },

      setClick: (to: number) => set((state) => void (state.click = to)),
      setHello: (bounds: Details) => set((state) => void (state.hello = bounds)),
      setStory: (bounds: Details) => set((state) => void (state.story = bounds)),
      setBrain: (bounds: Details) => set((state) => void (state.brain = bounds)),
      setLives: (bounds: Details) => set((state) => void (state.lives = bounds)),
      setLearn: (bounds: Details) => set((state) => void (state.learn = bounds)),
    })),
  ),
);

export default useBounds;
