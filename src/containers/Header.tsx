import React from 'react';
import { Titles } from 'components/Titles';
import { animated as a, config, useSpring } from 'react-spring';
import styled from 'styled-components';
import { SiGithub } from 'react-icons/si';
import { useHover, useScroll } from 'react-use-gesture';
import profile from 'assets/Profile@0.5x.webp';
import { useOnScreen } from 'hooks/useOnScreen';
import { Invisible } from 'components/Invisible';
import CurrentHeading from 'components/CurrentHeading';
import { FiChevronsDown } from 'react-icons/fi';

const StyledHeader = styled(a.div)`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  position: fixed;
  display: flex;
  text-align: center;
  align-items: center;
  width: 100%;
  row-gap: 10px;
  column-gap: 10px;
  z-index: 10;
`;

const Circle = styled(a.div)`
  height: 14vh;
  width: 14vh;
  border-radius: 50%;
  position:relative;
  display: inline-block;
`;

const introduction =
  "Weclome to Sujish Patel's Laboratory. This is where the mad scientist himself tests his many wacky ideas.";

const Intro: React.FC = () => <div style={{ fontSize: '2vw' }}>{introduction}</div>;

const Links: React.FC = () => {
  const [spring, animate] = useSpring({from: { scale: 1.0 },config: config.wobbly},[]);
  const bind = useHover((state) => (state.hovering ? animate({ scale: 1.2 }) : animate({ scale: 1.0 })));
  return <a.div style={spring} {...bind()}><SiGithub size="4vh" /></a.div>;
};

const Avatar: React.FC = ({}) => {
  const [props, animate] = useSpring({ from: { scale: 1.0, opacity: 0 } }, []);
  const bind = useHover((state) =>
    state.hovering ? animate({ scale: 1.2, opacity: 1 }) : animate({ scale: 1.0, opacity: 0 }),
  );
  return (
    <Circle
      style={{backgroundColor: "#bbb", scale: props.scale } as any}
      onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
      {...bind()}
    >
      <a.img src={profile} alt="image" height={'100%'} width={'100%'} style={{ borderRadius: '50%' }} />
    </Circle>
  );
};

const NavbarStyle = {
  height: '10vh',
  borderRadius: '20px',
  flexDirection: 'row',
  marginTop: '2vw',
  marginLeft: '2vw',
  marginRight: '2vw',
  paddingLeft: '1vw',
  paddingTop: '0vw',
  width: '90%',
};
const LanderStyle = {
  height: '90vh',
  borderRadius: '0px',
  flexDirection: 'column',
  marginTop: '0vw',
  marginLeft: '0vw',
  marginRight: '0vw',
  paddingLeft: '0vw',
  paddingTop: '2vw',
  width: '100%',
};


const Spacer = styled.div<{ grow: number }>`
  flex-grow: ${(props) => props.grow};
`;

const ScrollDown: React.FC = () => {
  const [style, set] = useSpring({
    from: {
      color: '#ff4677',
      position: 'absolute',
      bottom: '25px',
      fontSize: '1vw',
      textAlign: 'center',
      translateY: '0px',
      fontFamily: 'impetus-inline, sans-serif',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    to: { translateY: '5px', color: 'rgba(253, 223, 70, 1.00)' },
    loop: { reverse: true },
  }, []);
  
  return (
    <>
      <a.div style={style as any}>
        <div>Scroll</div>
        <FiChevronsDown />
      </a.div>
    </>
  );
};

/** 
 * **Developer Thoughts**
 * Sorta brute forced the styling choice on this one. I really wanted to do a complete,
 * move x pieces from point a to b, to demonstrate motion, but that would have been to
 * tediuos and time consuming.
 *  **/
const Header: React.FC = () => {
  const [triggerRef, show] = useOnScreen({ threshold: 1 });
  const style = useSpring({ to: show ? [LanderStyle] : [NavbarStyle], config: config.stiff });
  return (
    <>
      <StyledHeader style={{ ...style} as any}>
        {<Avatar />}
        {show && <Titles />}
        {show && <Intro />}
        {show && <Links />}
        {!show && <CurrentHeading/>}
        <Spacer grow={1} />
        {show && <ScrollDown />}
      </StyledHeader>
      <Invisible ref={triggerRef as any} onReaching={0.1}/>
    </>
  );
};

export default Header;
