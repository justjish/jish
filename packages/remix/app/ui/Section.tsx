import { useRef, useEffect, type ReactNode, forwardRef, useTransition } from 'react';
import { mergeRefs } from 'react-merge-refs';
import useMeasure from 'react-use-measure';
import { useMenuState } from '~/hooks/useMenu';
import { SectionType } from '~/utils/constants';
export type SectionProps = { children: ReactNode; sectionKey: SectionType };

export const Section = forwardRef<HTMLDivElement, SectionProps>(({ children, sectionKey }, ref) => {
  const [setMeasureRef, bounds] = useMeasure();
  const _ref = useRef<HTMLDivElement>(null);
  const [_, initializeMenu] = useTransition()
  const { set } = useMenuState()[sectionKey];
  useEffect(() => initializeMenu(()=>set({ ...bounds, absoluteTop: _ref.current?.offsetTop ?? 0 })), [bounds, set]);
  return (
    <div
      className={'box-border h-screen flex overflow-hidden items-center justify-center flex-col p-5'}
      ref={mergeRefs([setMeasureRef, _ref, ref])}
    >
      {children}
    </div>
  );
});
