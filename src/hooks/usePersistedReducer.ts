import { Reducer, useEffect, useReducer } from 'react';
import { useMMKVStorage } from 'react-native-mmkv-storage/dist/src/hooks/useMMKV';
import equal from 'fast-deep-equal';
import { Action, State } from '../reducers/typings';
import { storage } from '../services/storage';

export const usePersistedReducer = <S extends State>(
  reducer: Reducer<S, Action>,
  initialState: S,
  storageKey: string,
): ReturnType<typeof useReducer> => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [storageState, setStorageState] = useMMKVStorage<S>(
    `${storageKey}_reducer`,
    storage.getInstance(),
  );

  useEffect(() => {
    const isEqual = equal(storageState, state);
    if (!isEqual) {
      setStorageState(state);
    }
  }, [storageState, state, setStorageState]);

  return [state, dispatch];
};
