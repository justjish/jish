import React, { useState, useCallback } from 'react';
import { animated as a, useSpring } from 'react-spring';
import styled from 'styled-components';
import Intro from 'containers/Intro';
import _ from 'lodash';

const Styled = styled(a.div)`
  position: absolute;
  height: 2000px;
  width: 100%;
  background: rgba(1, 3, 49, 0.945);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  z-index: -10;
`;

const PARALLAX_RATIO = 4;

export const App: React.FC = () => {
  const [{ pos }, set] = useSpring({ translateY: 0, pos:0 }, []);
  const onScroll = useCallback((e) => set({
    pos: e.target.scrollTop,
    translateY: e.target.scrollTop / PARALLAX_RATIO
  }), [set]);

  return (
    <>
      <Styled onScroll={onScroll}/>
      <Intro top={pos} />
    </>
  );
};
export default App;
