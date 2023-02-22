import {type FC, useCallback } from 'react';
import { a, AnimatedComponent, useSpring } from '@react-spring/web';
import useInteract from '~/hooks/useInteract';
import { useMenuSnapshot } from '~/hooks/useMenu';
import { MenuLookupType } from './data/MenuData';
type Props = Parameters<AnimatedComponent<"svg">>[0]
export const MenuItem: FC<{
  Icon: (props:Props) => JSX.Element;
  lookup: MenuLookupType;
  alt: string;
}> = ({ Icon, lookup }) => {
  const {
    [lookup]: { bounds },
  } = useMenuSnapshot();
  const handleClick = useCallback(() => {
    window.scrollTo({ top: bounds.absoluteTop, left: 0, behavior: 'smooth' });
  }, [bounds]);
  const { height, width } = useSpring({ height: '30px', width: '30px' });
  const { bind, interactStyles } = useInteract({ onClick: handleClick });
  return (
    <a.div
      className={
        'bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border flex flex-col align-middle justify-center items-center text-center h-12 w-12 touch-none select-none m-auto rounded-2xl border-solid border-[rgba(255,255,255,0.18)]'
      }
      {...bind()}
      style={{ ...interactStyles }}
    >
      <Icon style={{ height, width }} />
    </a.div>
  );
};
