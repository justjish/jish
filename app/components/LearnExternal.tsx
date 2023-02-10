import screenSizes from '~/data/screenSizes';
import useInteract from '~/hooks/useInteract';
import { useMedia } from '~/hooks/useMedia';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { useSpring, config, a } from '@react-spring/web';
import { box, h4 } from '~/styles/legacy';
import { clsx } from 'clsx';

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
      className={clsx(box, 'no-underline text-[white]')}
      style={{ ...interactStyles }}
      download={download}
      target="_blank"
      rel="noopener"
    >
      <a.div className={clsx(h4, 'no-underline text-[white]')} style={{ fontSize }}>
        <Icon className="m-auto align-middle" /> <div className={clsx(h4, 'text-[0.5em]')}>{message}</div>
      </a.div>
    </a.a>
  );
};
