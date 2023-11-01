import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { RocketLeagueProfileResponse } from '../services/rocket-league.types';
import { AjaxError } from 'rxjs/ajax';
import {
  RL_STORAGE_KEY,
  rlActions,
  rlInitialState,
  rlReducer,
} from '../reducers/rl';
import { rlAPI } from '../services/rocket-league';
import { usePersistedReducer } from '../hooks/usePersistedReducer';

export const HomeScreen: React.FC = () => {
  const [state, dispatch] = usePersistedReducer<typeof rlInitialState>(
    rlReducer,
    rlInitialState,
    RL_STORAGE_KEY,
  );
  const [error, setError] = useState<AjaxError>();

  const setProfile = useCallback(
    (data: RocketLeagueProfileResponse) =>
      dispatch({ type: rlActions.SET_PROFILE, data }),
    [dispatch],
  );
  useEffect(() => {
    if (state.profile) {
      return;
    }
    const getProfileObs$ = rlAPI
      .getInstance()
      .getProfile('rocketjaza', state.platform);
    const subscription = getProfileObs$.subscribe({
      next: setProfile,
      error: setError,
    });
    console.log('state=', state);

    return () => {
      subscription.unsubscribe();
    };
  }, [setProfile, state]);

  return (
    <View style={{ backgroundColor: 'green', height: 700, width: 549 }}>
      <Text style={{ height: 250 }}>Hello world</Text>
    </View>
  );
};
