import { useMedia } from 'hooks/useMedia';
import { useSpring, config, a } from 'react-spring';
import screenSizes from 'data/screenSizes';
import { h3, h3Inline } from 'styles/typography.style';

export const LearnHeading = () => {
  const mqFont = useMedia(screenSizes, ['4rem', '3.5rem', '3rem'], '1rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  return (
    <a.div css={h3} style={{ fontSize }}>
      More<div css={h3Inline}> Coming </div>Soon!
    </a.div>
  );
};
