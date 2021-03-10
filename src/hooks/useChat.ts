import create from 'zustand';
import { combine ,devtools} from 'zustand/middleware';
const useChat = create(devtools(combine({ name: '', option: '', content: '' 
}, (set) => ({
  setName: (name: string) => set({ name: name }),
  setOption: (selection: string) => set({ option: selection }),
  setContent: (msg: string) => set({ content: msg }),
}))));

export default useChat;
