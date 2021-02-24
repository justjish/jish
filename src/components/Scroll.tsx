import * as React from 'react';
import { animated as a, useSpring } from 'react-spring';
import styled from 'styled-components';
import { FiChevronsDown } from 'react-icons/fi';

const Down = styled(a.div)`
  font-family: acier-bat-gris, sans-serif;
  font-weight: 800;
  font-size: 2vw;
  font-style: normal;
  overflow: hidden;
  align-items: center;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: -moz-none;
  -o-user-select: none;
  user-select: none;
`;
const Text = styled.div`
font-family: tomarik-display-line, sans-serif;
font-weight: 400;
font-style: normal;
`;

const Scroll: React.FC = () => {
  const [style, set] = useSpring(
    {
      from: { translateY: 0, color: '#a00abe' },
      to: { translateY: 5, color: 'rgba(253, 223, 70, 1.00)' },
      loop: { reverse: true },
    },
    [],
  );

  return (
    <Down style={style as any}>
      <Text>Scroll</Text>
      <FiChevronsDown />
    </Down>
  );
};
export default Scroll;
