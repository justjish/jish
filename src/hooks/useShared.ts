import create from 'zustand';
import { combine } from 'zustand/middleware';

const useShared = create(combine({ subtitle: 'Test' }, (set) => ({ setHeading: (to: string) => set({ subtitle: to }) })));

export default useShared;
