import React from 'react';
import { Strip } from 'common/Strip';
import { useSpring, config } from 'react-spring';

export const BlueStrip: React.FC<{color: string}> = ({color="rgba(4, 40, 110, 1.00)"}) => {
  const [props, set] = useSpring(
    {
      from: { skewY: -10, y: 0, width: '0%', background: color, zIndex: -9 },
      to: [{ skewY: -10,y: 20, width: '100%' }],
      config: config.slow,
    },
    [],
  );
  return <Strip style={props as any} />;
};