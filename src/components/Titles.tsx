import React from "react";
import { useAnimatedHover } from "hooks/useAnimatedHover";
import { animated as a, config, useTransition } from "react-spring";
import styled from "styled-components";

const DATA = [
  { title: "Full Stack Developer", color: "#91af08", next: 1, prev: 3 },
  { title: "Software Engineer", color: "#00f800", next: 2, prev: 0 },
  { title: "UI/UX Designer", color: "#bb4698", next: 3, prev: 1 },
  { title: "An Animal Lover", color: "#b1c409", next: 0, prev: 2 },
];

const StyledTitles = styled(a.div)`
  font-family: acier-bat-gris, sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 4em;
  display: inline;
  overflow: hidden;
  align-items: center;
`;
const Title: React.FC<{ title: string; color: string; onClick?: () => void}> = ({ title, color , onClick}) => {
  const transition = useTransition(title, {
    from: { translateY: 1000, color: color },
    enter: { translateY: 0},
    leave: { translateY: -1000 },
    config: config.gentle,
  });
  return (
    <>{transition((style, item) => <a.div onClick={onClick} style={{ cursor: 'pointer',...style as any}}>{item} </a.div>)}</>
  );
};


export const Titles: React.FC<{titles?: typeof DATA;}> = ({ titles = DATA}) => {
  const [item, setItem] = React.useState(titles[0]);
  const { bind, scale } = useAnimatedHover({onClick:()=>void console.log('Header Clicked')});
  return (
    <StyledTitles style={{ scale }} {...bind()}>
      <Title title={item.title} color={item.color} onClick={() => setItem(titles[item.next])}/>
    </StyledTitles>
  );
};

