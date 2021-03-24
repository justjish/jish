import React, { useCallback } from 'react';
import { animated as a, config, SpringValue, useSpring } from 'react-spring';
import useInteract from 'hooks/useInteract';
import { menuBox, menuItem } from 'styles/menu.style';
import useBounds from 'hooks/useBounds';
import { MenuData } from 'data/MenuData';

const Item: React.FC<{ icon: string; to: () => number, alt: string}> = ({ icon = '', alt, to }) => {
  const handleClick = useCallback(() => window.scrollTo({ top: to(), left: 0, behavior:'smooth'}), []);
  const { height, width } = useSpring({ height: '30px', width: '30px' });
  const { bind, scale } = useInteract({ onClick: handleClick });
  return (
    <a.div css={menuItem} {...bind()} style={{ scale }}>
      <a.img height={height} width={ width} src={icon}></a.img>
    </a.div>
  );
};

export const Menu: React.FC<{ items?: typeof MenuData}> = ({ items=MenuData}) => {
  const [{ width }] = useSpring({
    from: { width: '38px' },
    to: { width: '500px' },
    config: config.stiff
  },[]);
  return (
    <a.div css={menuBox} style={{ width }}>
      {items.map((props, index) => <Item {...props} key={index} />)}
    </a.div>
  );
};

