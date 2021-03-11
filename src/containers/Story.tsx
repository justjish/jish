import React from 'react';
import { animated as a, config, useSpring } from 'react-spring';
import { useGesture, useScroll } from 'react-use-gesture';
import { useOnScreen } from 'hooks/useOnScreen';
import elementus from 'assets/elementus.svg';
import netsmart from 'assets/netsmart.svg';
import rutgers from 'assets/rutgers.svg';
import erre from 'assets/erre.webp';
import useLocations from 'hooks/useLocations';
import { Section } from 'common/Section';
import { Row } from 'common/Row';
import { H0, H1, H2, H3 } from 'common/Typography';
import { Item } from 'common/Item';
import { Logo } from 'common/Logo';
import { noop, clamp} from 'lodash/fp';
import { useHover } from 'hooks/useHover';

const calc = (y: number) => clamp(-window.innerHeight, window.innerHeight, useLocations.getState().story - y);

const Years: React.FC = () => {
  const [props, set] = useSpring({ x: 0, y: 0, config: { mass: 50 / 15, tension: 50, friction: 26 } }, []);
  useScroll(({ xy: [x, y] }) => set({ x: calc(y) }), {
    domTarget: window,
  });

  const { bind, scale } = useHover({ onClick: noop });
  return <Item {...bind()}style={{ width: "350px", scale, ...props}}><H2>Years Coding</H2><H1>10+</H1></Item>
}

const Place: React.FC<{ logo: string; focus: string; time: string }> = ({ logo, focus, time }) => {

  const [props, set] = useSpring({ x: 0, y: 0, config: { mass: 50 / 15, tension: 50, friction: 26 } }, []);
  useScroll(({ xy: [x, y] }) => set({ x: calc(y) }), {
    domTarget: window,
  });

  const { bind, scale } = useHover({ onClick: noop });
  return (
    <Item {...bind()} style={{scale: scale, ...props}}>
      <Logo src={logo} alt={'company'} />
      <H2>{focus}</H2>
      <H2>{time}</H2>
    </Item>
  );
};

const Story: React.FC = () => {
  const registerPosition = useLocations(React.useCallback(state => state.setStory,[]));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => registerPosition(ref.current?.offsetTop ?? 0), []);

  return (
    <Section ref={ref}>
      <Row><H3>Experienced</H3></Row>
      <Row>
        <Place logo={elementus} focus={'Full Stack Developer'} time={'2020'} />
        <H1 style={{ color: 'rgba(121, 61, 251, 1.00)'} as any}>+</H1>
        <Place logo={netsmart} focus={'Software Engineer'} time={'2016-2018'} />
        <H1 style={{ color: 'rgba(44, 79, 120, 1.00)' } as any}>+</H1>
        <Place logo={rutgers} focus={'B.A. Computer Science'} time={'2016'} />
        <H1 style={{ color: 'rgba(225, 26, 55, 1.00)' } as any}>+</H1>
        <Place logo={erre} focus={'Head of IT and Marketing'} time={'2011-2016'} />
        <H1 style={{ color: 'rgba(60, 132, 86, 1.00)' } as any} >=</H1>
        <Years/>
      </Row>
    </Section>
  )
};
export default Story;
