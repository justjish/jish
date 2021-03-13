import React, { useEffect, useRef, useState } from 'react';
import { useSpring, config, SpringTo, SpringHandle } from 'react-spring';
import { useScroll } from 'react-use-gesture';
import R from 'ramda';
import fp, { ceil, inRange } from 'lodash/fp';
import { animated as a } from 'react-spring';
import useLocations from 'hooks/useLocations';
import styled from 'styled-components';
import bubble from 'graphics/bubble.svg';

const initialColor =
  'linear-gradient(181.46deg, #48D6CA 6.68%, #48CFCB 17.7%, #49BACF 34.22%, #4B99D5 54.19%, #4E6ADD 76.87%, #512FE7 101.49%, #521CEA 108.78%)';
const workColor =
  'linear-gradient(232.74deg, #FF4994 16.24%, #F84998 25.13%, #E348A4 38.45%, #C247B7 54.57%, #9345D1 72.86%, #5843F3 92.73%, #4242FF 99.53%);';

const Container = styled(a.svg)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -5;
`;

const Circle: React.FC = () => {
  const [props, set] = useSpring({ from: { cx: 0, cy: 0, r: 10, fill: 'red' }, config: config.molasses }, []);
  // useEffect(() => void set({ cx: 0, cy: 0, r: 1000 }), []);
  useScroll(({ xy: [, y] }) => set({ r: (y + 1) * 3 }), { domTarget: window });
  return <a.circle cx={props.cx} cy={props.cy} r={props.r} />;
};

export const Focus: React.FC = () => {
  const [props, set] = useSpring(
    {
      from: { random: 0, skewY: 0, y: 150, width: '100%', height: '80vh', background: initialColor, zIndex: -1 },
      config: config.slow,
    },
    [],
  );
  // Scroll listener for movement
  useScroll(({ xy: [, y] }) => set({ y: fp.clamp(150, useLocations.getState().skills, y * 1.2), random: 10 }), {
    domTarget: window,
  });
  // Scroll listener for changing color.
  useScroll(
    ({ xy: [, y] }) => {
      if (inRange(useLocations.getState().hello, useLocations.getState().story, y)) {
        return set({ background: initialColor, skewY: 0, width: '100%' });
      }
      if (inRange(useLocations.getState().story, useLocations.getState().skills, y)) {
        return set({ background: workColor, skewY: -15, width: '50%' });
      }
    },
    {
      domTarget: window,
    },
  );

  return (
      <Container>
      </Container>
  );
};

export default Focus;