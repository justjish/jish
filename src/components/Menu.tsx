import { type FC } from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { menuBox } from 'styles/legacy';
import { MenuItem } from 'components/MenuItem';
import helloIcon from 'assets/icons/hello.svg';
import storyIcon from 'assets/icons/bag.svg';
import brainIcon from 'assets/icons/brain.svg';
import livesIcon from 'assets/icons/lives.svg';
import learnIcon from 'assets/icons/dots.svg';
import { useMenuSnapshot } from 'context/MenuContext';
export const Menu: FC = () => {
  const [{ width }] = useSpring(
    {
      from: { width: '38px' },
      to: { width: '500px' },
      config: config.stiff,
    },
    [],
  );
  const items = [
    { to: () => useMenuSnapshot().hello.absoluteTop, icon: helloIcon, alt: 'Hello' },
    { to: () => useMenuSnapshot().story.absoluteTop, icon: storyIcon, alt: 'History' },
    { to: () => useMenuSnapshot().brain.absoluteTop, icon: brainIcon, alt: 'Skills' },
    { to: () => useMenuSnapshot().lives.absoluteTop, icon: livesIcon, alt: 'Location' },
    { to: () => useMenuSnapshot().learn.absoluteTop, icon: learnIcon, alt: 'Learn More' },
  ];
  return (
    <a.div className={menuBox} style={{ width }}>
      {items.map((props, index) => (
        <MenuItem {...props} key={index} />
      ))}
    </a.div>
  );
};
export default Menu;
