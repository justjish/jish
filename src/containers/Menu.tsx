import React from 'react';
import { animated as a, config, useSpring, to } from 'react-spring';
import styled from 'styled-components';
import useLocations from 'hooks/useLocations';
import { useHover } from 'hooks/useHover';
import brain from 'assets/menu-icons/brain.svg';
import hello from 'assets/menu-icons/hello.svg';
import chatbox from 'assets/menu-icons/chat.svg';
import bag from 'assets/menu-icons/bag.svg';

const MenuContainer = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 32em;
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: fixed; /* Take it out of the flow of the document */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // left ... leave it out for positioning
  right:20px;
  top: 0px;
  bottom: 0px;
  
  margin: auto; /* Center it */
  max-width: 90%; /* Make it fit window if under 500px */
  height: 500px;
  width: 64px;
`;

const ItemContainer = styled(a.div)`
  /** Background Blur Boiler **/
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 32em;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  height: 48px;
  width: 48px;
`;
const H2 = styled(a.div)`
  font-family: junegull, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1em;
`;

const Item: React.FC<{ icon: string; to: number }> = ({ icon = '', to = 0 }) => {
  const handleClick = React.useCallback(() => window.scrollTo({ top: to, left: 0, behavior: 'smooth' }), [to])
  const { bind, scale } = useHover({ onClick:handleClick });
  return (
    <ItemContainer {...bind()} style={{ scale }}>
      <a.img height={"30px"} width={"30px"} src={icon}></a.img>
    </ItemContainer>
  );
};

const Menu: React.FC = () => {
  const meet = useLocations(React.useCallback((state) => state.hello, []));
  const xp = useLocations(React.useCallback((state) => state.story, []));
  const idea = useLocations(React.useCallback((state) => state.skills, []));
  const chat = useLocations(React.useCallback((state) => state.chat, []));
  return (
    <MenuContainer>
      <Item icon={hello} to={meet} />
      <Item icon={bag} to={xp} />
      <Item icon={brain} to={idea} />
      <Item icon={chatbox} to={chat} />
    </MenuContainer>
  );
};

export default Menu;
