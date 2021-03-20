import useBounds from 'hooks/useBounds';
import brainIcon from 'assets/icons/brain.svg';
import helloIcon from 'assets/icons/hello.svg';
import extraIcon from 'assets/icons/chat.svg';
import storyIcon from 'assets/icons/bag.svg';

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
  { to: () => useBounds.getState().about.absoluteTop, icon: extraIcon },
];