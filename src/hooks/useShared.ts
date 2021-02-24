import create from 'zustand';
import { combine } from 'zustand/middleware';

const useShared = create(combine({ heading: 'Test' }, (set) => ({ setHeading: (to: string) => set({ heading: to }) })));
export default useShared;
