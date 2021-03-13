import React from 'react';
import useLocations from 'hooks/useLocations';
import { animated as a, useSpring, config, useTrail } from 'react-spring';
import styled from 'styled-components';
import { H3 } from 'common/Typography';
import { Section } from 'common/Section';
import background from 'assets/background/geo.jpg';
import { Item } from 'common/Item';
import fp from 'lodash/fp';
import { Avatar } from 'components/Avatar';
import fullbody from 'assets/fullbody@0.5x.webp';
import { useScroll } from 'react-use-gesture';
//@ts-ignore
import { ReactComponent as ScrollIcon } from 'assets/scroll.svg';

const H1 = styled(a.div)`
  font-family: acier-bat-gris, sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 7em;
  line-height: 0.7;
  color: rgba(253, 223, 70, 1);
`;
const H2 = styled(a.div)`
  font-family: acier-bat-gris, sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 4em;
  line-height: 0.7;
  color: red;
`;

const DATA = [
  { title: 'Full Stack Developer', color: '#91af08', next: 1, prev: 3 },
  { title: 'Software Engineer', color: '#00f800', next: 2, prev: 0 },
  { title: 'UI/UX Designer', color: '#bb4698', next: 3, prev: 1 },
  { title: 'An Animal Lover', color: '#b1c409', next: 0, prev: 2 },
];

export const Hello: React.FC<{ data?: typeof DATA }> = ({ data = DATA }) => {
  const registerPosition = useLocations(React.useCallback((state) => state.setHello, []));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => void registerPosition(ref.current?.scrollTop ?? 0), [ref.current]);

  // Got a little lazy here...
  // Should really create seperate springs for each one
  const [{ x, y, scale, opacity, height, width, presents, color, offset, background, scaleAway }, set] = useSpring(
    {
      to: [
        { scale: 1 },
        {
          y: 200,
          x: 0,
          skewY: 0,
          height: '40vh',
          width: '80vw',
          presents: '2rem',
          color: 'rgba(214, 242, 255, 1.00)',
        },
        { opacity: 1, offset: 0, underline: '0.1rem', background: 'rgba(39, 39, 39, 0.25)' },
      ],
      from: {
        x: 0,
        y: -200,
        skewY: -15,
        scale: 0,
        opacity: 0,
        height: '0vh',
        width: '40vw',
        color: 'rgba(255, 70, 118, 1.00)',
        presents: '3rem',
        offset: 50,
        background: 'rgba(255, 70, 118, 1.00)',
        scaleAway: 1,
        radius: '0%',
      },
      config: config.slow,
    },
    [],
  );
  const { rotateX } = useSpring({
    // Works with `x` and `x.to(...)`
    rotateX: y.to([0, 100], [0, 180]),
    config: config.molasses,
    immediate: true,
  });
  // const { y: bounce } = useSpring({ to: { y: 10 }, from: { y: -10 }, config: config.stiff, loop: { reverse: true } });
  useScroll(
    ({ xy: [, y] }) =>
      set({
        y: useLocations.getState().hello - y + 200,
        scaleAway: 1 - y / window.innerHeight,
        radius: `${y / window.innerHeight}%`,
      }),
    { domTarget: window },
  );
  return (
    <Section ref={ref} style={{ overflow: 'hidden' }}>
      <a.img
        src={fullbody}
        style={
          {
            position: 'absolute',
            objectFit: 'scale-down',
            maxHeight: '100vh',
            maxWidth: '100vw',
            opacity,
            y: offset,
            scale: scaleAway,
          } as any
        }
      />
      <Item style={{ rotateX, y, x, scale, height, width, background } as any}>
        <H3 style={{ color, fontSize: presents } as any}> Jish.Dev Presents</H3>
        <H1 style={{ opacity, y: offset } as any}>Sujish Patel</H1>
        <H3 style={{ opacity, y: offset } as any}> A Full Stack Developer</H3>
        {/* <a.svg
          height="5vh"
          width="5vh"
          viewBox="0 0 100 100"
          style={
            {
              position: 'absolute',
              bottom: 10,
              maxHeight: '5vh',
              maxWidth: '5vh',
              y: bounce,
              opacity,
            } as any
          }
        >
          <path
            fill="#rgba(245, 235, 237, 1.00)"
            d="M50,5C25.2,5,5,25.2,5,50s20.2,45,45,45s45-20.2,45-45S74.8,5,50,5z M50,86c-19.9,0-36-16.1-36-36  s16.1-36,36-36s36,16.1,36,36S69.9,86,50,86z"
          ></path>
          <polygon fill="rgba(245, 235, 237, 1.00)" points="50,52.6 35.2,37.8 28.8,44.2 50,65.4 71.2,44.2 64.8,37.8 "></polygon>
        </a.svg> */}
      </Item>
    </Section>
  );
};
export default Hello;
