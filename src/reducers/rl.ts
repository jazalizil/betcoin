import {
  RocketLeaguePlatform,
  RocketLeagueProfileResponse,
} from '../services/rocket-league.types';
import { Reducer } from 'react';
import { Action } from './typings';

type RLReducerState = {
  profile: RocketLeagueProfileResponse | null;
  platform: RocketLeaguePlatform;
};

export enum rlActions {
  SET_PROFILE = 'SET_PROFILE',
  SET_PLATFORM = 'SET_PLATFORM',
}

type RLActionHandler = {
  [rlActions.SET_PROFILE]: RocketLeagueProfileResponse;
  [rlActions.SET_PLATFORM]: RocketLeaguePlatform;
};

export const rlInitialState: RLReducerState = {
  profile: null,
  platform: RocketLeaguePlatform.EPIC,
};

export const rlReducer: Reducer<RLReducerState, Action<RLActionHandler>> = (
  state,
  action,
) => {
  switch (action.type) {
    case rlActions.SET_PROFILE:
      return {
        ...state,
        profile: action.data as RocketLeagueProfileResponse,
      };
    case rlActions.SET_PLATFORM:
      return {
        ...state,
        platform: action.data as RocketLeaguePlatform,
      };
  }
};

export const RL_STORAGE_KEY = 'rocketleague';
