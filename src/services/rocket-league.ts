import { ajax } from 'rxjs/ajax';
import { map, Observable } from 'rxjs';
import {
  RocketLeagueOverviewResponse,
  RocketLeaguePlatform,
  RocketLeaguePlaylistResponse,
  RocketLeagueProfileResponse,
} from './rocket-league.types';
import { API } from './api';

class RocketLeagueAPI extends API {
  baseURL = 'https://api.tracker.gg/api/v2/rocket-league/standard';

  private getProfileTransformer(response: RocketLeagueProfileResponse) {
    const overview = response.data.segments.find(
      segment => segment.type === 'overview',
    ) as RocketLeagueOverviewResponse;
    const playlists = response.data.segments.filter(
      segment => segment.type === 'playlist',
    ) as ReadonlyArray<RocketLeaguePlaylistResponse>;
    return {
      platformInfo: response.data.platformInfo,
      info: {
        avatar: response.data.userInfo.customAvatarUrl,
        userId: response.data.userInfo.userId,
        countryCode: response.data.userInfo.countryCode,
      },
      overview: {
        wins: overview.stats.wins.value,
        goals: overview.stats.goals.value,
        mvps: overview.stats.mVPs.value,
        saves: overview.stats.saves.value,
        assists: overview.stats.assists.value,
        shots: overview.stats.shots.value,
      },
      matches: {},
    };
  }

  getProfile(
    username: string,
    platform: RocketLeaguePlatform,
  ): Observable<RocketLeagueProfileResponse> {
    return ajax
      .getJSON(`${this.baseURL}/profile/${platform}/${username}`)
      .pipe(map(response => response as RocketLeagueProfileResponse));
  }
}

export const rlAPI = Object.freeze(new RocketLeagueAPI());
