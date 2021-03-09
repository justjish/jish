import React from 'react';
import { useSpring, config } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { Item } from 'common/Item';
import { H1,H2 } from 'common/Typography';

export const Years: React.FC<{ show: boolean; }> = ({ show = false }) => {
  const [props, set]= useSpring({ scale: show ? 1 : .001, config: config.slow },[show]);
  const bind = useGesture({
    onTouchStart: ({}) => set({ scale: 0.5 }),
    onTouchEnd: ({ }) => set({ scale: 1.1 }),
    onMouseDown: ({}) => set({ scale: 0.5 }),
    onMouseUp: ({}) => set({ scale: 1.1 }),
    onHover: ({ hovering }) => (hovering ? set({ scale: 1.1 }) : set({ scale: 1 })),
  });
  return <Item {...bind()}style={{ width: "350px", ...props}}><H2>Years Coding</H2><H1>10+</H1></Item>
}
