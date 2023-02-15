import useInteract from '~/hooks/useInteract';
import type { FC } from 'react';
import type { IconType } from 'react-icons';
import { a } from '@react-spring/web';
import { box, h4 } from '~/styles/legacy';
import { clsx } from 'clsx';

export const LearnExternal: FC<{
  Icon: IconType;
  message: string;
  link: string;
  download?: boolean;
}> = ({ Icon, message, link, download = false }) => {
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
      <a.div
        className={clsx(h4, 'no-underline text-[white] text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]')}
      >
        <Icon className="m-auto align-middle" /> <div className={clsx(h4, 'text-[0.5em]')}>{message}</div>
      </a.div>
    </a.a>
  );
};
