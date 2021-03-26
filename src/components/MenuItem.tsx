import { FC,useCallback } from 'react';
import { a,  useSpring } from 'react-spring';
import useInteract from 'hooks/useInteract';
import { menuItem } from 'styles/menu.style';

export const MenuItem: FC<{ icon: string; to: () => number, alt: string}> = ({ icon = '', alt, to }) => {
  const handleClick = useCallback(() => window.scrollTo({ top: to(), left: 0, behavior:'smooth'}), []);
  const { height, width } = useSpring({ height: '30px', width: '30px' });
  const { bind, interactStyles } = useInteract({ onClick: handleClick });
  return (
    <a.div css={menuItem} {...bind()} style={{ ...interactStyles}}>
      <a.img height={height} width={ width} src={icon} alt={alt} draggable="false"></a.img>
    </a.div>
  );
};