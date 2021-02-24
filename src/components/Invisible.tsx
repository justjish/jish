import styled from 'styled-components';
export const Invisible = styled.div<{ onReaching: number }>`
  height: 1px;
  width: 100%;
  position: absolute;
  top: ${props=>`${props.onReaching}%`};
  z-index: -100;
  opacity: 0;
`;