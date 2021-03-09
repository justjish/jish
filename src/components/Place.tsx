import React from 'react';
import { useGesture } from 'react-use-gesture';
import { animated as a, useSpring, config } from 'react-spring';
import { Item } from 'common/Item';
import { Logo } from 'common/Logo';
import { H2 } from 'common/Typography';

export const Place: React.FC<{ logo: string; focus: string; time: string, show: boolean }> = ({ logo, focus, time, show = false }) => {
  
  const [props, set]= useSpring({ scale: show ? 1 : .001, config: config.slow },[show]);
  const bind = useGesture({
    onTouchStart: ({}) => set({ scale: 0.5 }),
    onTouchEnd: ({ }) => set({ scale: 1.1 }),
    onMouseDown: ({}) => set({ scale: 0.5 }),
    onMouseUp: ({}) => set({ scale: 1.1 }),
    onHover: ({ hovering }) => (hovering ? set({ scale: 1.1 }) : show? set({ scale: 1 }): set({scale: .001})),
  });
  return (
    <Item {...bind()} style={props}>
      <Logo src={logo} alt={'company'} />
      <H2>{focus}</H2>
      <H2>{time}</H2>
    </Item>
  );
};