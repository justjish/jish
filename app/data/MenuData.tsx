import helloIcon from '~/assets/icons/hello.svg';
import storyIcon from '~/assets/icons/bag.svg';
import brainIcon from '~/assets/icons/brain.svg';
import livesIcon from '~/assets/icons/lives.svg';
import learnIcon from '~/assets/icons/dots.svg';
export const items = [
  { lookup: 'hello' as const, icon: helloIcon, alt: 'Hello' },
  { lookup: 'story' as const, icon: storyIcon, alt: 'History' },
  { lookup: 'brain' as const, icon: brainIcon, alt: 'Skills' },
  { lookup: 'lives' as const, icon: livesIcon, alt: 'Location' },
  { lookup: 'learn' as const, icon: learnIcon, alt: 'Learn More' },
];
export type MenuLookupType = (typeof items)[0]['lookup'];
