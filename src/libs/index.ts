import { BehaviorSubject, Observable, OperatorFunction, pipe } from 'rxjs';

export const createAction = <T>(defaultValue: T = null) => {
  return new BehaviorSubject(defaultValue);
}

export const createStore = <T, R = T>(action$: Observable<T>, ...args: OperatorFunction<T, R>[]) => {
  return pipe.apply(null, args)(action$) as Observable<R>;
}