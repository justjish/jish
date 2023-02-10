import { useMemo, type FC } from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { menuBox } from 'styles/legacy';
import { MenuItem } from 'components/MenuItem';
import { items } from '../data/MenuData';
export const Menu: FC = () => {
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
