'use strict';
import type { State, StateCreator } from 'zustand';
import * as Middleware from 'zustand/middleware';
import produce, { Draft } from 'immer';

export const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>,
): StateCreator<T> => (set, get, api) => config((fn) => set(produce(fn) as (state: T) => T), get, api);

export const combine = Middleware.combine;
export const devtools = Middleware.devtools;
export const persist = Middleware.persist;
export const redux = Middleware.redux;

export default {
  immer,
  devtools,
  combine,
  persist,
  redux,
};
