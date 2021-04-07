import { FC } from 'react';
import { a, config, useSpring } from 'react-spring';
import { menuBox } from 'styles/menu.style';
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
    <a.div css={menuBox} style={{ width }}>
      {items.map((props, index) => (
        <MenuItem {...props} key={index} />
      ))}
    </a.div>
  );
};
