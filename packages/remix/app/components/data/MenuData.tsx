import Hello from '~/svgs/Hello';
import Story from '~/svgs/Story';
import Brain from '~/svgs/Brain';
import Lives from '~/svgs/Lives';
import Learn from '~/svgs/Learn';
import { SectionType } from '~/utils/constants';
import { AnimatedSVGFn } from '~/svgs/AnimatedSVG.types';
export const items = [
  { lookup: 'hello' as const, Icon: Hello, alt: 'Hello' },
  { lookup: 'story' as const, Icon: Story, alt: 'History' },
  { lookup: 'brain' as const, Icon: Brain, alt: 'Skills' },
  { lookup: 'lives' as const, Icon: Lives, alt: 'Location' },
  { lookup: 'learn' as const, Icon: Learn, alt: 'Learn More' },
] as Array<{lookup: SectionType, Icon: AnimatedSVGFn, alt: string}>;
export type MenuLookupType = (typeof items)[0]['lookup'];
