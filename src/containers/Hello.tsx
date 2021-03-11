import React from 'react';
import useLocations from 'hooks/useLocations';
import { animated as a} from 'react-spring';
import styled from 'styled-components';
import {H3 } from 'common/Typography';
import { Section } from 'common/Section';

const Center = styled(a.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:rgba(4, 40, 110, 1.00);
`;

const H1 = styled(a.div)`
  font-family: acier-bat-gris, sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 7em;
  line-height: .7;
`;
const H2 = styled(a.div)`
  font-family: acier-bat-gris, sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 4em;
  line-height: .7;
`;

const DATA = [
  { title: "Full Stack Developer", color: "#91af08", next: 1, prev: 3 },
  { title: "Software Engineer", color: "#00f800", next: 2, prev: 0 },
  { title: "UI/UX Designer", color: "#bb4698", next: 3, prev: 1 },
  { title: "An Animal Lover", color: "#b1c409", next: 0, prev: 2 },
];

export const Hello: React.FC<{ data?: typeof DATA }> = ({ data = DATA }) => {
  const registerPosition = useLocations(React.useCallback(state => state.setHello, []));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => void registerPosition(ref.current?.scrollTop ?? 0), [ref.current]);
  return <Center ref={ref}><H3>Meet</H3><H1>Sujish Patel</H1> <H3> A Full Stack Developer</H3></Center>;
};
export default Hello;
