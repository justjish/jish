import styled from 'styled-components';
export const Invisible = styled.div<{ reaching: number }>`
  height: 1px;
  width: 100%;
  position: absolute;
  top: ${props=>`${props.reaching}%`};
  z-index: 100;
  background: red;
  opacity: 0;
`;