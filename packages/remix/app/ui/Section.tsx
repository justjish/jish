import { useRef, useEffect, type FC, type ReactNode, forwardRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import useMeasure from 'react-use-measure';
import { useMenuState } from '~/hooks/useMenu';
import { SectionType } from '~/utils/constants';
export type SectionProps = { children: ReactNode; sectionKey: SectionType };
export const Section = forwardRef<HTMLDivElement, SectionProps>(({ children, sectionKey }, boundsRef) => {
  const [ref, bounds] = useMeasure();
  const localRef = useRef<HTMLDivElement>(null);
  const { set } = useMenuState()[sectionKey];
  useEffect(() => set({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds, set]);
  return (
    <div
      className={'box-border h-screen flex overflow-hidden items-center justify-center flex-col p-5'}
      ref={mergeRefs([ref, localRef, boundsRef])}
    >
      {children}
    </div>
  );
});
