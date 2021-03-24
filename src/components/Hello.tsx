import { FC, useEffect, Dispatch, SetStateAction, useRef, useCallback, useMemo, useState } from 'react';
import { a, config, SpringValue, useSpring } from 'react-spring';
import { section } from 'styles/section.style';

import { box } from 'styles/box.style';
import { useAuth } from 'hooks/useFirebase';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import useBounds from 'hooks/useBounds';
import { HelloHeading } from 'components/HelloHeading';
import { HelloProfile } from 'components/HelloProfile';

/**
 * Hello
 *
 * The introductory component.
 * It also is the loading indicator for 'signInAnonymously'.
 *
 * Since this site is static, and the use of firebase is mainly for future goals
 * I won't be wrapping the subsequent components inside anything to prevent the
 * race condition I have created.
 *
 * Notes:
 * The ios problem with intro image:
 * https://medium.com/@susiekim9/how-to-compensate-for-the-ios-viewport-unit-bug-46e78d54af0d
 *
 */

export const Hello: FC<{ offset: SpringValue<number>; setShow: Dispatch<SetStateAction<boolean>> }> = ({
  offset,
  setShow,
}) => {
  const [ref, bounds] = useMeasure();
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useCallback(
    useBounds((state) => state.setLearn),
    [],
  );

  useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds, updateBounds]);

  const [{ scale, opacity }, springRef] = useSpring(
    {
      to: [
        { scale: 1 },
        { background: 'rgba(255, 255, 255, 0.25)' },
        { opacity: 1},
      ],
      from: {
        scale: 1.5,
        opacity: 0,
        height: '50vh',
        width: '90vw',
        background: '#4659ff',
        x:0,
      },
      delay: 50,
      config: config.default,
    },
    [],
  );

  useEffect(() => {
    useAuth.signInAnonymously().finally(async () => setShow(true));
  }, []);

  const [{ keepBound }] = useSpring({ keepBound: bounds.height - 200, config: config.wobbly }, [bounds.height]);
  return (
    <div css={section} ref={mergeRefs([ref, localRef])}>
      <a.div css={box} style={{ scale, y: keepBound, background: 'rgba(39, 39, 39, 0.75)', zIndex: 1}}>
        <HelloHeading opacity={opacity}  />
      </a.div>
      <HelloProfile opacity={opacity} />
    </div>
  );
};
export default Hello;
