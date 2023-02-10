import { type FC } from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { menuBox } from 'styles/legacy';
import { MenuData } from 'data/MenuData';
import { MenuItem } from 'components/MenuItem';

export const Menu: FC<{ items?: typeof MenuData }> = ({ items = MenuData }) => {
  const [{ width }] = useSpring(
    {
      from: { width: '38px' },
      to: { width: '500px' },
      config: config.stiff,
    },
    [],
  );
  return (
    <a.div className={menuBox} style={{ width }}>
      {items.map((props, index) => (
        <MenuItem {...props} key={index} />
      ))}
    </a.div>
  );
};
export default Menu;
