import { createContext, useContext, useRef, type ReactNode, type FC } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { type RectReadOnly } from 'react-use-measure';

type Details = RectReadOnly & { absoluteTop: number };

export type MenuState = {
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
} | null;
export const MenuContext = createContext<MenuState>(null);
export const MenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const state = useRef(
    proxy({
      click: 0,
      hello: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 0 },
      story: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 100 },
      brain: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 200 },
      lives: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 300 },
      learn: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 400 },
      setClick: (to: number) => void (state.click = to),
      setHello: (bounds: Details) => void (state.hello = bounds),
      setStory: (bounds: Details) => void (state.story = bounds),
      setBrain: (bounds: Details) => void (state.brain = bounds),
      setLives: (bounds: Details) => void (state.lives = bounds),
      setLearn: (bounds: Details) => void (state.learn = bounds),
    }),
  ).current;
  return <MenuContext.Provider value={state}>{children}</MenuContext.Provider>;
};
export const useMenuState = () => {
  const state = useContext(MenuContext);
  if (!state) throw new Error('useMenu must be used within a MenuProvider');
  return state;
};
export const useMenuSnapshot = () => {
  const state = useMenuState();
  return useSnapshot(state);
};
