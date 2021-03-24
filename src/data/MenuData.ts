import useBounds from 'hooks/useBounds';
import helloIcon from 'assets/icons/hello.svg';
import storyIcon from 'assets/icons/bag.svg';
import brainIcon from 'assets/icons/brain.svg';
import livesIcon from 'assets/icons/lives.svg';
import learnIcon from 'assets/icons/dots.svg';

/**
 * 
 * It's funny, it's call menu data, but is not 'pure' data, as the 'to' is a callback function. 
 * I guess it could be 'MenuProps'. 
 * 
 * */
export const MenuData = [
  { to: () => useBounds.getState().hello.absoluteTop, icon: helloIcon },
  { to: () => useBounds.getState().story.absoluteTop, icon: storyIcon },
  { to: () => useBounds.getState().brain.absoluteTop, icon: brainIcon },
  { to: () => useBounds.getState().lives.absoluteTop, icon: livesIcon },
  { to: () => useBounds.getState().learn.absoluteTop, icon: learnIcon },
];