import { createContext, useContext, useRef, type ReactNode, type FC } from 'react';
import { proxy, useSnapshot } from 'valtio';

export type StoryState = { selected: number | null } | null;
export const StoryContext = createContext<StoryState>(null);
export const StoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const state = useRef(proxy({ selected: null })).current;
  return <StoryContext.Provider value={state}>{children}</StoryContext.Provider>;
};
export const useStoryState = () => {
  const state = useContext(StoryContext);
  if (!state) throw new Error('useStory must be used within a StoryProvider');
  return state;
};
export const useStorySnapshot = () => {
  const state = useStoryState();
  return useSnapshot(state);
};

export const WithStoryProvider = (Provider:typeof StoryProvider) => <P extends {},>(Component:FC<P>) => (props:P) => (
  <Provider>
    <Component {...props} />
  </Provider>
);