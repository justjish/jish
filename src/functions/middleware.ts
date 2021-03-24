'use strict';
import { State, StateCreator } from 'zustand';
import * as Middleware from 'zustand/middleware';
import produce, { Draft } from 'immer';

/** Just splitting this out, so that I all Middlewares for Zustand, are avilable*/

export const immer = <T extends State>(config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>): StateCreator<T> => (
  set,
  get,
  api,
) => config((fn) => set(produce<T>(fn)), get, api);

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
