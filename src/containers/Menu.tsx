import React from 'react';
import { animated as a, config, useSpring, to } from 'react-spring';
import styled from 'styled-components';
import profile from 'assets/Profile@0.5x.webp';
import useLocations from 'hooks/useLocations';
import { Avatar } from 'components/Avatar';
import { useHover } from 'hooks/useHover';



const MenuContainer = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 32em;
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: fixed; /* Take it out of the flow of the document */
  display: flex;
  justify-content: space-between;
  left: 0; /* Left edge at left for now */
  right: 0; /* Right edge at right for now, so full width */
  top: 48px; /* Move it down from top of window */
  width: 1200px; /* Give it the desired width */
  margin: auto; /* Center it */
  max-width: 90%; /* Make it fit window if under 500px */
  height: 64px;
  text-align: center;
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
  max-width: 12%; /* Make it fit window if under 500px */
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

const Item: React.FC<{ text: string; to: number }> = ({ text = '', to = 0 }) => {
  const handleClick = React.useCallback(() => window.scrollTo({ top: to, left: 0, behavior: 'smooth' }), [to])
  const { bind, scale } = useHover({ onClick:handleClick });
  return (
    <ItemContainer {...bind()} style={{ scale }}>
    </ItemContainer>
  );
};

const Menu: React.FC = () => {
  const meet = useLocations(React.useCallback((state) => state.meet, []));
  const xp = useLocations(React.useCallback((state) => state.xp, []));
  const idea = useLocations(React.useCallback((state) => state.labs, []));
  const chat = useLocations(React.useCallback((state) => state.chat, []));
  return (
    <MenuContainer>
      <Item text={'HI'} to={meet} />
      <Item text={'XP'} to={xp} />
      <Avatar profile={profile}/>
      <Item text={'EX'} to={idea} />
      <Item text={'DM'} to={chat} />
    </MenuContainer>
  );
};

export default Menu;
