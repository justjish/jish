import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGesture, useScroll } from 'react-use-gesture';
import { animated as a, useSpring, config } from 'react-spring';
import { Section } from 'common/Section';
import { H1, H2, H3 } from 'common/Typography';
import { Item } from 'common/Item';
import { Strip } from 'common/Strip';
import { Flex } from 'common/Flex';
import { SkillList, Types } from 'data/SkillData';
import { IconType } from 'react-icons';
import randomColor from 'randomcolor';
import { clamp } from 'lodash/fp';
import { shuffle } from 'lodash';
import useLocations from 'hooks/useLocations';
const ShuffledSkills = shuffle(SkillList);

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) ) + min;
const isEven = (x: number) => (x % 2 === 0 ? true : false);
const offset = (x: number) => (isEven(x) ? 125 + Math.random() * 100 : -100 + Math.random() * -100);

const Skill: React.FC<{ Icon: IconType; idx: number; size: number; type: string }> = ({ Icon, idx, size, type }) => {
  const yOffset = offset(idx);
  const xOffset = 0; //clamp(0,window.innerWidth,offset(idx)); -> Use for truly random pos within bounds.
  const [props, set] = useSpring({ x: xOffset, y: 500 + yOffset, config: { mass: size / 15, tension: 50, friction: 26 } }, []);
  const [{ scale }, setScale] = useSpring({ scale: 1, config: config.wobbly }, []);

  const color = randomColor({ seed: type, luminosity: 'bright' });
  useScroll(({ xy: [x, y] }) => set({ y: clamp(-window.innerHeight, window.innerHeight, useLocations.getState().labs + 130 - y + yOffset) }), {
    domTarget: window,
  });
  const bind = useGesture({
    onTouchStart: ({}) => setScale({ scale: 0.5 }),
    onTouchEnd: ({}) => setScale({ scale: 1.1 }),
    onMouseDown: ({}) => setScale({ scale: 0.5 }),
    onMouseUp: ({}) => setScale({ scale: 1.1 }),
    onHover: ({ hovering }) => (hovering ? setScale({ scale: 1.1 }) : setScale({ scale: 1 })),
  });
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
      <Flex>
        <H3>Knowledgable</H3>
      </Flex>
      <Flex>
        {ShuffledSkills.map(({ key, Icon, size, type }, index) => (
          <Skill key={key} idx={index} Icon={Icon} size={size} type={type}></Skill>
        ))}
      </Flex>
    </Section>
  );
};

export default React.memo(Labs);
