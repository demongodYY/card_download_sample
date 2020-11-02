import { numAction, jsonAction } from '../action'
import { createStore } from '../libs';
import { mergeMap } from 'rxjs/operators'

export const numberStore$ = createStore(numAction);

export const asyncNumberStore$ = createStore(numAction, mergeMap(value => Promise.resolve(value)));

export const jsonStore$ = createStore(jsonAction, mergeMap(async () => {
  const res = await fetch('https://api.github.com/users/github');
  return await res.json();
}));
