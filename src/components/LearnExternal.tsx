import screenSizes from 'data/screenSizes';
import useInteract from 'hooks/useInteract';
import { useMedia } from 'hooks/useMedia';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { useSpring, config, a } from 'react-spring';
import { box } from 'styles/box.style';
import { h4 } from 'styles/typography.style';
import { css } from '@emotion/react';

export const LearnExternal: FC<{
  Icon: IconType;
  message: string;
  link: string;
  download?: boolean;
}> = ({ Icon, message, link, download = false }) => {
  const mqFont = useMedia(screenSizes, ['3rem', '2.5rem', '2rem'], '1.5rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  const { bind, interactStyles } = useInteract({ onClick: () => ({}) });

  return (
    <a.a
      {...bind()}
      href={link}
      css={css`
        ${box};
        text-decoration: none;
        color: white;
      `}
      style={{ ...interactStyles }}
      download={download}
      target="_blank"
      rel="noopener"
    >
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
            font-size: 0.5em;
          `}
        >
          {' '}
          {message}
        </div>{' '}
      </a.div>
    </a.a>
  );
};
