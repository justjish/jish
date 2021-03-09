import styled from 'styled-components';
import { animated as a } from 'react-spring';
export const Item = styled(a.div)`
  /** Background Blur Boiler **/
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;