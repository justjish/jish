import styled from 'styled-components';
export const Scroll = styled.div<{ clientH: number }>`
  position: absolute;
  height: ${(props) => `${props.clientH * 4}px`};
  width: 100%;
  background: rgba(1, 3, 49, 0.945);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: -10;
`;
export default Scroll;