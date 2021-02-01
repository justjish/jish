import * as React from 'react';
import { useTrail, animated as a } from 'react-spring';
import styled from '@emotion/styled';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;

`;
const Text = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
  line-height: 110px;
  color: black;
  font-size: 8em;
  font-weight: 800;
  will-change: transform, opacity;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
`;

const Animated = ({ ready, children, ...props }: { ready: boolean; children: React.ReactNodeArray }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: ready ? 1 : 0,
    x: ready ? 0 : 20,
    height: ready ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <Flex {...props}>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index] as any} 
            className="trails-text"
            style={{ ...rest, transform: x.to((x) => `translate3d(0,${x}px,0)`) } as any}>
            {/* {items[index]} */}
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </Flex>
  )
}

const lines = ['Sujish Patel','Full Stack','Devopler'];
const Header = () => {
  return <Animated ready={true}>{lines.map(line => <Text>{line}</Text>)}</Animated>;
};


export default Header;