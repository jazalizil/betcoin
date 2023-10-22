type Segment = {
  rank: number | null;
  percentile: number;
  displayName: string;
  displayCategory: string;
  category: string;
  description: string | null;
  metadata: object;
  value: number;
  displayValue: string;
  displayType: string;
};

type AvailableSegment = {
  type: 'playlist';
  attributes: {
    season: number;
  };
  metadata: {
    name: string;
  };
};

export type RocketLeagueOverviewResponse = {
  type: 'overview';
  metadata: {
    name: string;
  };
  stats: {
    wins: Segment;
    goals: Segment;
    mVPs: Segment;
    saves: Segment;
    assists: Segment;
    shots: Segment;
    goalShotRatio: Segment;
    score: Segment;
    seasonRewardLevel: Segment;
    seasonRewardWins: Segment;
    tRNRating: Segment;
  };
};

export type RocketLeaguePlaylistResponse = {
  type: 'playlist';
  attributes: {
    playlistId: number;
    season: number;
  };
  metadata: {
    name: string;
  };
  stats: {
    tier: Segment;
    division: Segment;
    matchesPlayed: Segment;
    winStreak: Segment;
    rating: Segment;
    peakRating: Segment;
  };
};

export type RocketLeagueProfileResponse = {
  data: {
    platformInfo: {
      platformSlug: string;
      platformUserId: string;
      platformUserHandle: string;
      platformUserIdentifier: string;
      avatarUrl: string | null;
      additionalParameters: string | null;
    };
    userInfo: {
      userId: string | null;
      isPremium: boolean;
      isVerified: boolean;
      isInfluencer: boolean;
      isPartner: boolean;
      countryCode: string | null;
      customAvatarUrl: string | null;
      customHeroUrl: string | null;
      customAvatarFrame: string | null;
      premiumDuration: string | null;
      socialAccounts: Array<string>;
      pageviews: number;
      xpTier: string | null;
      isSuspicious: boolean | null;
    };
    segments: Array<
      RocketLeagueOverviewResponse | RocketLeaguePlaylistResponse
    >;
    availableSegments: Array<AvailableSegment>;
  };
};

export enum RocketLeaguePlatform {
  EPIC = 'epic',
  STEAM = 'steam',
}
