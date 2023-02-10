import { useMedia } from 'hooks/useMedia';
import { useSpring, config, a } from '@react-spring/web';
import screenSizes from 'data/screenSizes';
import { h3, h3Inline } from 'styles/legacy';

export const LearnHeading = () => {
  const mqFont = useMedia(screenSizes, ['4rem', '3.5rem', '3rem'], '1rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  return (
    <a.div className={h3} style={{ fontSize }}>
      More<div className={h3Inline}> Coming </div>Soon!
    </a.div>
  );
};
