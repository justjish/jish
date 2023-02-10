import { type FC } from 'react';
import { SpringValue, useSpring, config, a } from '@react-spring/web';
import { useMedia } from 'hooks/useMedia';
import screenSizes from 'data/screenSizes';
import { h3, h3Inline } from 'styles/legacy';

// By adding the media query in component, then attaching it's value to the spring,
// you can get animations as the browser triggers media query breakpoints.
export const BrainHeading: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const { scale } = useSpring({ scale: offset.to([1, 2], [2, 1]), from: { scale: 1 } });
  const mqFont = useMedia(screenSizes, ['4rem', '3.5rem', '3rem'], '2rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  return (
    <a.div className={h3} style={{ scale, fontSize }}>
      an <a.div className={h3Inline}>EXPANSIVE </a.div>skillset
    </a.div>
  );
};
