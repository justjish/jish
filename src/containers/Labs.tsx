import React, { useEffect } from 'react';
import { useGesture, useScroll } from 'react-use-gesture';
import { animated as a, useSpring, config } from 'react-spring';
import { Section } from 'common/Section';
import { H1, H2, H3 } from 'common/Typography';
import { Item } from 'common/Item';
import { Row } from 'common/Row';
import { SkillList, Types } from 'data/SkillData';
import { IconType } from 'react-icons';
import randomColor from 'randomcolor';
import { clamp, noop } from 'lodash/fp';
import { shuffle } from 'lodash';
import useLocations from 'hooks/useLocations';
import { useHover } from 'hooks/useHover';

const ShuffledSkills = shuffle(SkillList);
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) ) + min;
const isEven = (x: number) => (x % 2 === 0 ? true : false);
const offset = (x: number) => (isEven(x) ? 125 + Math.random() * 100 : -100 + Math.random() * -100);

const Skill: React.FC<{ Icon: IconType; idx: number; size: number; type: string }> = ({ Icon, idx, size, type }) => {
  // Calculate a randon offset on the fly
  const yOffset = offset(idx);
  const xOffset = 0; //clamp(0,window.innerWidth,offset(idx)); -> Use for truly random pos within bounds.

  const [props, set] = useSpring({ x: xOffset, y: 500 + yOffset, config: { mass: size / 15, tension: 50, friction: 26 } }, []);
  useScroll(({ xy: [x, y] }) => set({ y: clamp(-window.innerHeight, window.innerHeight, useLocations.getState().labs + 130 - y + yOffset) }), {
    domTarget: window,
  });
  const { bind, scale } = useHover({ onClick: noop })
  const color = randomColor({ seed: type, luminosity: 'bright' });
  return (
    <Item {...bind()} style={{ scale: scale, ...props } as any}>
      <Icon style={{ height: size, width: size, fill: color } as any} />
    </Item>
  );
};

const Labs:React.FC = () => {
  // Boilerplate used to get the components position on mount.
  const registerPosition = useLocations(React.useCallback((state) => state.setLabs, []));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => registerPosition(ref.current?.offsetTop ?? 0), []);
  const props = useSpring({ skewY: true ? -10: 0, opacity: true? 1: 0 });
  return (
    <Section ref={ref}>
      <Row>
        <H3>Knowledgable</H3>
      </Row>
      <Row>
        {ShuffledSkills.map(({ key, Icon, size, type }, index) => (
          <Skill key={key} idx={index} Icon={Icon} size={size} type={type}></Skill>
        ))}
      </Row>
    </Section>
  );
};

export default React.memo(Labs);
