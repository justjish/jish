import create from 'zustand';
import { combine ,devtools} from 'zustand/middleware';

const useLocations = create(devtools(combine({ hello: 0, story: 0, skills: 0, chat: 0 }, (set) => ({
  setHello: (position: number) => set({ hello: position }),
  setStory: (position: number) => set({ story: position  }),
  setSkills: (position: number) => set({ skills: position }),
  setChat: (position: number) => set({ chat: position }),
}))));

export default useLocations;
