import { type FC } from 'react';
import { a, config, useSpring } from '@react-spring/web';
import { MenuItem } from '~/components/MenuItem';
import { items } from '../data/MenuData';
export const Menu: FC = () => {
  const [{ width }] = useSpring(
    {
      from: { width: '500px' },
      to: { width: '500px' },
      config: config.stiff,
    },
    [],
  );
  return (
    <a.div className={'bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border fixed flex flex-row items-start justify-between max-w-[90%] h-16 w-[500px] m-auto rounded-2xl border-solid border-[rgba(255,255,255,0.18)] top-5 inset-x-0 z-50'} style={{ width }}>
      {items.map((props, index) => (
        <MenuItem {...props} key={index} />
      ))}
    </a.div>
  );
};
export default Menu;
