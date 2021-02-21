import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Titles } from 'components/Titles';
import { FiChevronsDown } from 'react-icons/fi';
import { animated, useSpring, config } from 'react-spring';
import { useHover, useWheel } from 'react-use-gesture';
import styled from 'styled-components';
import { useWindowPosition } from 'hooks/useWindowPosition';
import useWindowSize from 'hooks/useWindowSize';
const ScrollDown: React.FC = () => {
  const style = useSpring({
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
  });
  return (
    <animated.div style={style as any}>
      <div>Scroll</div>
      <FiChevronsDown />
    </animated.div>
  );
};
const Box = styled(animated.div)`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  display: flex;
  justify-content: center;
`;
const minMax = (x: number) => (x > 100 ? 100 : x < 10 ? 10 : x);
export const Intro: React.FC = () => {
  const { height, width } = useWindowSize();
  const pos = useWindowPosition();
  const [props, set] = useSpring({
    height: `${pos > 1 ? 10 : 80}vh`,
    width: `${pos > 1 ? 80 : 100}%`,
    borderRadius: `${pos > 1 ? 20 : 0}px`,
    position: `${pos > 1 ? 'fixed' : 'absolute'}`,
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
        ...props,
      }}
    >
      <Titles />
      <ScrollDown />
    </Box>
  );
};

export default Intro;
