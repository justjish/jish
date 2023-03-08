import { createContext, useContext, useRef, type ReactNode, type FC } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { devtools } from 'valtio/utils';
import { type RectReadOnly } from 'react-use-measure';
import { SECTIONS, SectionType } from '~/utils/constants';
type Details = RectReadOnly & { absoluteTop: number };
export type MenuState = Record<SectionType,{ bounds: Details; set: (bounds: Details) => void }> | null;
export type MenuStateOld = {
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
    proxy(
      SECTIONS.reduce(
        (acc, section: SectionType) => {
          acc[section]={ bounds: {absoluteTop:0,bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}, set: (bounds: Details) => void (state[section].bounds = bounds)};
          return acc;
        },
        {} as Exclude<MenuState,null>,
      ),
    ),
  ).current;
  devtools(state, { name: 'Menu' });
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
