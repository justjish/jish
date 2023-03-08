import { useRef, useEffect, type ReactNode, forwardRef, useTransition } from 'react';
import { mergeRefs } from 'react-merge-refs';
import useMeasure from 'react-use-measure';
import { useMenuState } from '~/contexts/menu';
import { SectionType } from '~/utils/constants';
export type SectionProps = { children: ReactNode; sectionKey: SectionType };

export const Section = forwardRef<HTMLDivElement, SectionProps>(({ children, sectionKey }, ref) => {
  const [setMeasureRef, bounds] = useMeasure();
  const _ref = useRef<HTMLDivElement>(null);
  const [_, setMenuTransition] = useTransition()
  const { set } = useMenuState()[sectionKey];
  // We set the absolute top of the section so the menu items know where to scroll to.
  // It is wrapped in a useEffect that updates whenever the window is resized.
  // We are also using a transition to allow React to defer the update to the menu, 
  // allowing the rest of the JS to run first.
  useEffect(() => setMenuTransition(()=>set({ ...bounds, absoluteTop: _ref.current?.offsetTop ?? 0 })), [bounds, set]);
  return (
    <div
      className={'static box-border h-screen flex overflow-hidden items-center justify-center flex-col p-5'}
      ref={mergeRefs([setMeasureRef, _ref, ref])}
    >
      {children}
    </div>
  );
});
