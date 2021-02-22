import * as React from "react";
import { animated, config, Spring, useSpring, useTransition } from "react-spring";
import { useHover } from "react-use-gesture";
import styled from "styled-components";

const DATA = [
  { title: "Full Stack Developer", color: "#91af08", next: 1, prev: 3 },
  { title: "Software Engineer", color: "#00f800", next: 2, prev: 0 },
  { title: "UI/UX Designer", color: "#bb4698", next: 3, prev: 1 },
  { title: "An Animal Lover", color: "#b1c409", next: 0, prev: 2 },
];

const StyledTitles = styled.div`
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

const StyledTitle = styled(animated.div)`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: -moz-none;
  -o-user-select: none;
  user-select: none;
`;

const Title: React.FC<{ title: string; color: string; onClick?: () => void}> = ({ title, color , onClick}) => {
  const transition = useTransition(title, {
    from: { fontSize: "0vw", color: color },
    enter: { fontSize: "6vw", },
    leave: { fontSize: "0vw" },
    config: config.stiff,
  });
  return (
    <>{transition((style, item) => <StyledTitle onClick={onClick} style={{ cursor: 'pointer',...style as any}}>{item} </StyledTitle>)}</>
  );
};

export const Titles: React.FC<{titles?: typeof DATA;}> = ({ titles = DATA}) => {
  const [item, setItem] = React.useState(titles[0]);
  return (
    <StyledTitles>
      <Title title={item.title} color={item.color} onClick={() => setItem(titles[item.next])}/>
    </StyledTitles>
  );
};

