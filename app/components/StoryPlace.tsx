import { type FC, useRef, useState, useEffect, useMemo } from 'react';
import { a, config, SpringValue, useResize, useSpring } from '@react-spring/web';
import useInteract from 'hooks/useInteract';
import { useMeasurementCapture } from 'hooks/useMeasurementCapture';
import { h2, box } from 'styles/legacy';
import { clsx } from 'clsx';

import { useCallback } from 'react';
import { useStorySnapshot, useStoryState } from 'hooks/useStory';
export const StoryPlace: FC<{
  offset: SpringValue<number>;
  id: number;
  logo: string;
  focus: string;
  time: string;
  color: string;
  speed: number;
  includePlus?: boolean;
}> = ({ id, offset, logo, focus, time, speed }) => {
  const state = useStoryState();
  const snap = useStorySnapshot();
  const onSelect = useCallback(
    async (id: number) => {
      switch (snap.selected) {
        case id: // The same one is selected, so deselect it
          state.selected = null;
          return;
        default: // Either null or a different one is selected, so update selection to itself.
          state.selected = id;
          return;
      }
    },
    [state, snap],
  );
  const {
    bind,
    interactStyles: { scale },
  } = useInteract({ onClick: () => onSelect(id) });

  const [ref, { originalHeight, originalWidth, isReady }] = useMeasurementCapture({
    preventCapture: [() => scale.get() !== 1, [scale]],
  });

  const [{ x }] = useSpring(() => ({
    x: offset.to([1, 0], [0, 1000]),
    config: { mass: 50 / 15, tension: 100 - 15 * speed, friction: 26 },
  }));

  const { skewX } = useSpring({
    skewX: x.to([0, 100], [0, 1]),
    config: config.molasses,
    immediate: true,
  });

  const original = useMemo(
    () =>
      isReady
        ? {
            height: originalHeight!,
            width: originalWidth!,
            zIndex: 1,
            config: config.slow,
            x: x,
            y: 0,
            display: 'block',
            scale: scale,
            skewX,
            opacity: 1,
          }
        : {},
    [isReady, originalHeight, originalWidth, x, scale, skewX],
  );
  const expanded = useMemo(() => {
    if (!isReady) return {};
    return {
      height: window.innerHeight * 0.75,
      width: window.innerWidth * 0.75,
      opacity: 1,
      zIndex: 999,
      config: config.slow,
      scale: scale,
      display: 'block',
      skewX,
    };
  }, [originalWidth, originalHeight, isReady, skewX, scale]);

  const removed = useMemo(
    () => ({
      opacity: 0,
      scale: 0,
      y: 0,
    }),
    [],
  );
  const [card, api] = useSpring(() => original, [original]);
  useEffect(() => {
    // We must wait for the initial height and width to be set before we can do anything.
    if (!isReady) return;
    switch (snap.selected) {
      case null: // None are selected
        api.start(original);
        return;
      case id: // This one is selected
        api.start(expanded);
        return;
      default: // Another one is selected
        api.start(removed);
        card.display.set('none');
        return;
    }
  }, [originalHeight, originalWidth, snap, id, x, api, scale, card]);

  return (
    <a.div ref={ref} className={clsx(box, 'm-3')} {...bind()} style={{ ...card }}>
      <img className="object-contain h-[50px] m-auto" src={logo} alt={'company'} />
      <div className={h2}>{focus}</div>
      <div className={h2}>{time}</div>
    </a.div>
  );
};
