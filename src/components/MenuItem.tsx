import { FC, useCallback } from 'react';
import { a, useSpring } from '@react-spring/web';
import useInteract from 'hooks/useInteract';
import { menuItem } from 'styles/legacy';
import { useMenuSnapshot } from 'hooks/useMenu';
import { MenuLookupType } from '../data/MenuData';

export const MenuItem: FC<{ icon: string; lookup: MenuLookupType; alt: string }> = ({ icon = '', alt, lookup }) => {
  const { [lookup]: details } = useMenuSnapshot();
  const handleClick = useCallback(() => {
    window.scrollTo({ top: details['absoluteTop'], left: 0, behavior: 'smooth' });
  }, [details]);
  const { height, width } = useSpring({ height: '30px', width: '30px' });
  const { bind, interactStyles } = useInteract({ onClick: handleClick });
  return (
    <a.div className={menuItem} {...bind()} style={{ ...interactStyles }}>
      <a.img height={height} width={width} src={icon} alt={alt} draggable="false"></a.img>
    </a.div>
  );
};
