import React, {useState} from 'react';
import { useGrow } from 'hooks/useGrow';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
const Box = styled(animated.div)`
  font-family: acier-bat-gris, sans-serif;
  font-weight: 800;
  font-style: normal;
  display: flex;
  overflow: hidden;
  align-items: center;
  text-align: center;
  color: blue;
  padding: 20px;
  margin: 20px;
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 10px );
  -webkit-backdrop-filter: blur( 10px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;
export const Navbar: React.FC = () => {
  const [grow] = useGrow(20);
  const [style, set] = useSpring({ scale: 1 }, []);
  return (
    <Box
      style={{ position: 'fixed', zIndex: 2, ...grow, ...style} as any}
      onMouseEnter={() => set({ scale: 1.1 })}
      onMouseLeave={() => set({ scale: 1 })}
    >
      Sujish Patel
    </Box>
  );
};
export default Navbar;
