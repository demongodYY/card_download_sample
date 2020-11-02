import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

const useStoreState = <T>(stream$: Observable<T>, defaultValue: T = null) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    const subscription$ = stream$.subscribe(value => setValue(value));
    return subscription$.unsubscribe;
  }, []);
  return value;
};

export default useStoreState;


