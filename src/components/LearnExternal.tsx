import screenSizes from 'data/screenSizes';
import useInteract from 'hooks/useInteract';
import { useMedia } from 'hooks/useMedia';
import { FC, useCallback } from 'react';
import { IconType } from 'react-icons';
import { useSpring, config, a } from 'react-spring';
import { box } from 'styles/box.style';
import { h4 } from 'styles/typography.style';
import { css } from '@emotion/react';

export const LearnExternal: FC<{ Icon: IconType; message: string; link: string }> = ({ Icon, message, link }) => {
  const mqFont = useMedia(screenSizes, ['3rem', '2.5rem', '2rem'], '1.5rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  const onClick = useCallback(async () => window.open(link, "_blank"), []);
  const { bind, interactStyles } = useInteract({ onClick: onClick });
  return (
    <a.div {...bind()} css={box} style={{ ...interactStyles }}>
      
      <a.div
        css={css`
          ${h4};
          color: white;
        `}
        style={{ fontSize }}
      >
          <Icon
            css={css`
              vertical-align: middle;
            `}
          />{' '}
        <div
          css={css`
            ${h4};
            font-size: .5em;
          `}
        >
          {' '}
          {message}
        </div>{' '}
      </a.div>
    </a.div>
  );
};