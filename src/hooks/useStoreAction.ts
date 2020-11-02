import { useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';

const useStoreAction = <T>(action: BehaviorSubject<T>) => {
  return useCallback((value: T) => action.next(value), [action]);
}

export default useStoreAction;