import React, { useCallback } from 'react';
import { animated as a, config, SpringValue, useSpring } from 'react-spring';
import useInteract from 'hooks/useInteract';
import { MenuData } from '../data/MenuData';
import useBounds from 'hooks/useBounds';
import { menuBox, menuItem } from 'styles/menu.style';

const Item: React.FC<{ icon: string; to: () => number }> = ({ icon = '', to }) => {
  const [setClick] = useBounds(useCallback(state => [state.setClick], []));
  const handleClick = React.useCallback(() => setClick(to()), [to]);
  const { bind, scale } = useInteract({ onClick: handleClick });
  return (
    <a.div css={menuItem} {...bind()} style={{ scale }}>
      <a.img height={'30px'} width={'30px'} src={icon}></a.img>
    </a.div>
  );
};
export const Menu: React.FC<{ items?: typeof MenuData, offset: SpringValue<number>}> = ({ items=MenuData, offset }) => {
  const [{ width }] = useSpring({
    from: { width: '38px' },
    to: { width: '500px' },
    config: config.slow,
  },[]);
  return (
    <a.div css={menuBox} style={{ width }}>
      {items.map((props, index) => <Item {...props} key={index} />)}
    </a.div>
  );
};

