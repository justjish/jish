import React from 'react';
import { animated as a, useSpring } from 'react-spring';
import styled from 'styled-components';
const ScrollContainer = styled(a.div)`
  position: absolute;
  height: 320vh;
  width: 100%;
  background: rgba(21, 16, 25, 1.00);
  z-index: -10;
`;

const Scroll: React.FC = () => <ScrollContainer/>;
export default Scroll;