import * as React from 'react';
import { useGrow } from 'hooks/useGrow';
import { animated } from 'react-spring';
import styled from "styled-components";

const Styled = styled(animated.div)`
  color: rgba(255, 238, 149, 1);
  font-family: acier-bat-gris, sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: center;
`;
export const H1: React.FC<{ text: string; size: string }> = ({ text='', size='1vh'}) => {
  const [grow] = useGrow(size);
  return <Styled style={grow}>{text}</Styled>;
};
export default H1;
