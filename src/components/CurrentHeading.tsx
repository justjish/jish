import * as React from 'react';
import styled from 'styled-components';
import { useTransition, config, animated as a} from "react-spring";
import useShared from 'hooks/useShared';

const StyledHeading = styled.div`
  font-family: acier-bat-gris, sans-serif;
  font-weight: 800;
  font-style: normal;
  display: flex;
  overflow: hidden;
  align-items: center;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: -moz-none;
  -o-user-select: none;
  user-select: none;
`;

const CurrentHeading: React.FC = () => {
  const heading = useShared(state => state.heading);
  const transition = useTransition(heading, {
    from: { fontSize: "0vw"},
    enter: { fontSize: "6vw", },
    leave: { fontSize: "0vw" },
    config: config.slow,
  });
  return <StyledHeading>{transition((style, item) => <a.div style={style}>{item} </a.div>)}</StyledHeading>;
};

export default CurrentHeading;