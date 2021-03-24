import { FC, useEffect, Dispatch, SetStateAction, useRef, useCallback} from 'react';
import { a, config, SpringValue, useSpring } from 'react-spring';
import { section } from 'styles/section.style';
import { box } from 'styles/box.style';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import useBounds from 'hooks/useBounds';
import useAuth from 'hooks/useFirebase';
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

  const [{ x, scale, opacity, background }] = useSpring(
    {
      to: [{ scale: 1 }, { background: 'rgba(73, 82, 109, .75)' } ,{ opacity: 1, x:0 }],
      from: {
        scale: 1.5,
        opacity: 0,
        background: 'rgba(255, 70, 118, 1.00)',
        x: -500,
      },
      config: config.wobbly,
    },
    [],
  );

  useEffect(() => {
    setShow(true);
    useAuth.signInAnonymously().finally(async () => setShow(true));
  }, []);

  const [{ keepBound }] = useSpring({ keepBound: bounds.top+100, config: config.wobbly }, [bounds.height]);
  return (
    <div css={section} ref={mergeRefs([ref, localRef])}>

        <a.div css={box} style={{ scale, y: keepBound, background, zIndex: 2, position:'absolute' }}>
          <HelloHeading opacity={opacity} />
        </a.div>
        <HelloProfile opacity={opacity} x={x} />

    </div>
  );
};
export default Hello;
