import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Titles } from 'components/Titles';
import { FiChevronsDown } from 'react-icons/fi';
import { animated, useTransition, config, useSpring } from 'react-spring';
import { useHover, useWheel } from 'react-use-gesture';
import styled from 'styled-components';
import { useScrollPosition } from 'hooks/useScrollPosition';
import useWindowSize from 'hooks/useWindowSize';

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
      <animated.div style={style as any}>
        <div>Scroll</div>
        <FiChevronsDown />
      </animated.div>
    </>
  );
};
const Box = styled(animated.div)`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  position: fixed;
  display: flex;
  justify-content: center;
`;

export const Intro: React.FC<{ top: SpringValue<number>;}> = ({top}) => {
  const pos = useScrollPosition();
  const [props, set] = useSpring({
    height: `${pos > 10 ? 10 : 50}vh`,
    borderRadius: `${pos > 2 ? 20 : 0}px`,
    config: config.stiff
  }, [pos]);
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        ...props,
      } as any}
    >
      <Titles />
      {pos < 1 && <ScrollDown />}
    </Box>
  );
};

export default Intro;
