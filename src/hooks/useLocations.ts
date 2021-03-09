import create from 'zustand';
import { combine ,devtools} from 'zustand/middleware';
const MENU_OFFSET = 150
const useLocations = create(devtools(combine({ meet: 0, work: 0, labs: 0, chat: 0 }, (set) => ({
  setHola: (position: number) => set({ meet: position }),
  setWork: (position: number) => set({ work: position - MENU_OFFSET }),
  setLabs: (position: number) => set({ labs: position - MENU_OFFSET }),
  setChat: (position: number) => set({ chat: position - MENU_OFFSET }),
}))));

export default useLocations;
