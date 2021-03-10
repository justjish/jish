import React from 'react';
import { useSpring, config } from 'react-spring';
import { useScroll } from 'react-use-gesture';
import { Strip } from 'common/Strip';
import fp from 'lodash/fp';
import { animated as a } from 'react-spring';
import useLocations from 'hooks/useLocations';

const initialColor = 'rgba(255, 238, 149, 1)';
const workColor = 'rgba(171, 255, 222, 1.00)';
export const MovingStrip: React.FC = () => {
  const [props, set] = useSpring(
    {
      from: { skewY: 0, y: 0, width: '0%', height: '80vh', background: initialColor, zIndex: -1 },
      to: [{ skewY: 15, y: 0, width: '100%' }],
      config: config.slow,
    },
    [],
  );
  const height = document.documentElement.scrollHeight * 4;
  const width = document.documentElement.scrollWidth;
  // Scroll listener for movement
  useScroll(({ xy: [x, y] }) => set({ y: fp.clamp(0, useLocations.getState().labs, y * 1.2) }), { domTarget: window });
  // Scroll listener for changing color.
  console.log(height);
  console.log(Math.min(height * 0.3));
  useScroll(
    ({ xy: [, y] }) => {
      y >= useLocations.getState().xp ?
        (set({ background: workColor})) :
        (set({ background: initialColor }));
    },
    { domTarget: window },
  );
  return (
    <Strip style={props as any}>
      <a.text x="50%" y="50%" fill="red"></a.text>
    </Strip>
  );
};
