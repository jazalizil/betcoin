import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  RocketLeaguePlatform,
  RocketLeagueProfile,
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
  const [error, setError] = useState<AjaxError | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('rocketjaza');
  const [usernameInputVisible, setUsernameInputVisible] = useState(false);
  const apiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setProfile = useCallback(
    (data: RocketLeagueProfile) =>
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
          complete: () => setLoading(false),
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
  }, []);

  useEffect(() => {
    if (apiTimer.current) {
      clearTimeout(apiTimer.current);
      apiTimer.current = null;
    }
    apiTimer.current = setTimeout(() => {
      setError(null);
      setLoading(true);
      refreshProfile(username, rlReducer.platform);
    }, 2500);
  }, [refreshProfile, rlReducer.platform, username]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ paddingHorizontal: 42 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setUsernameInputVisible(!usernameInputVisible)}>
          <Text
            style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>
            {`Hello ${
              rlReducer.profile?.platformInfo?.platformUserIdentifier || ''
            }`}
          </Text>
        </TouchableOpacity>
        <TextInput
          onChangeText={setUsername}
          value={username}
          style={{
            display: usernameInputVisible ? 'none' : 'flex',
            width: 250,
            height: 42,
            borderStyle: 'solid',
            borderRadius: 9,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        {loading && (
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue' }}>
            Loading...
          </Text>
        )}
        {error && (
          <Text style={{ color: 'red', fontWeight: 'bold' }}>
            {JSON.stringify(error)}
          </Text>
        )}
      </View>
    </View>
  );
};
