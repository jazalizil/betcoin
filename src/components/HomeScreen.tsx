import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  RocketLeaguePlatform,
  RocketLeagueProfileResponse,
} from '../services/rocket-league.types';
import { AjaxError } from 'rxjs/ajax';
import {
  RL_STORAGE_KEY,
  rlActions,
  rlInitialState,
  rlReducer as rlReducerState,
} from '../reducers/rl';
import { rlAPI } from '../services/rocket-league';
import { usePersistedReducer } from '../hooks/usePersistedReducer';

export const HomeScreen: React.FC = () => {
  const [rlReducer, dispatch] = usePersistedReducer<typeof rlInitialState>(
    rlReducerState,
    rlInitialState,
    RL_STORAGE_KEY,
  );
  const [error, setError] = useState<AjaxError>();
  const [username, setUsername] = useState('rocketjaza');
  const [usernameInputVisible, setUsernameInputVisible] = useState(false);

  const setProfile = useCallback(
    (data: RocketLeagueProfileResponse) =>
      dispatch({ type: rlActions.SET_PROFILE, data }),
    [dispatch],
  );
  const refreshProfile = useCallback(
    (uname: string, platform: RocketLeaguePlatform) => {
      const subscription = rlAPI
        .getInstance()
        .getProfile(uname, platform)
        .subscribe({
          next: setProfile,
          error: setError,
        });

      return () => subscription.unsubscribe();
    },
    [setProfile],
  );
  useEffect(() => {
    if (rlReducer.profile !== null) {
      return;
    }
    refreshProfile(username, rlReducer.platform);
  }, [refreshProfile, rlReducer, username]);

  return (
    <View style={{ backgroundColor: 'green', flex: 1 }}>
      <View style={{ paddingHorizontal: 42 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setUsernameInputVisible(!usernameInputVisible)}>
          <Text
            style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>
            {`Hello ${rlReducer.profile?.platformInfo.platformUserIdentifier}`}
          </Text>
        </TouchableOpacity>
        <TextInput
          onChangeText={setUsername}
          value={username}
          style={{
            display: usernameInputVisible ? 'none' : 'block',
            width: 250,
            height: 42,
            borderStyle: 'solid',
            borderRadius: 9,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        {error && (
          <Text style={{ color: 'red', fontWeight: 'bold' }}>
            {JSON.stringify(error)}
          </Text>
        )}
      </View>
    </View>
  );
};
