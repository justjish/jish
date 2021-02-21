import React, { useState } from 'react';
import Navbar from 'containers/Navbar';
import { animated as a } from 'react-spring';
import styled from 'styled-components';
import Intro from 'containers/Intro';
import { useWindowPosition } from 'hooks/useWindowPosition';
const FrameStyle = styled(a.div)`
  position: absolute;
  height: 200vh;
  width: 100%;
  background: rgba(38, 40, 110, 0.247);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
`;

const Page: React.FC = () => {
  return <FrameStyle/>
};
export const App: React.FC = () => {

  return (
    <>
      <Page/>
      <Intro />
    </>)
};
export default App;
