import {
  RocketLeaguePlatform,
  RocketLeagueProfileResponse,
} from '../services/rocket-league.types';

export type State = Record<string, any>;

export type Action<H = any> = {
  type: keyof H;
  data: H[keyof H];
};

export type RLReducerState = {
  profile: RocketLeagueProfileResponse | null;
  platform: RocketLeaguePlatform;
};
