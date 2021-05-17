export type MatchInfoType = {
  _id: string;
  type: string | null;
  name: string | null;
  homeTeam: TeamType;
  awayTeam: TeamType;
  mode: 'basic' | 'advanced' | null;
  date: Date;
};

export type ReboundType = {
  offensive: number;
  defensive: number;
  total: number;
};

export type ShootingType = {
  made: number;
  attempts: number;
  percentage: string;
};

export type PlayerResultsType = {
  _id: string;
  matchId: string;
  playerId: string;
  teamId: string;
  opponentTeamId: string;
  assists: number;
  blocks: number;
  dRebounds: number;
  fouls: number;
  ftAttempts: number;
  ftMades: number;
  minutes: number;
  oRebounds: number;
  points: number;
  positions: number;
  steals: number;
  threeAttempts: number;
  threeMades: number;
  turnovers: number;
  twoAttempts: number;
  twoMades: number;
  player: {
    _id: string;
    name: string;
    number: string;
    teamId: string;
  };
};

export type SinglePlayerResultsType = {
  _id: string;
  matchId: string;
  playerId: string;
  teamId: string;
  opponentTeamId: string;
  assists: number;
  blocks: number;
  dRebounds: number;
  fouls: number;
  ftAttempts: number;
  ftMades: number;
  minutes: number;
  oRebounds: number;
  points: number;
  positions: number;
  steals: number;
  threeAttempts: number;
  threeMades: number;
  turnovers: number;
  twoAttempts: number;
  twoMades: number;
  match: {
    _id: string;
    name: string;
    type: string;
    homeTeamId: string;
    awayTeamId: string;
    date: Date;
  };
  opponentTeam: TeamType;
};

export type BoxType = {
  playerNumber: string;
  playerName: {
    id: string;
    name: string;
  };
  ppp: string;
  positionRate: string;
  points: number;
  rebounds: ReboundType;
  assists: number;
  turnovers: number;
  fieldGoal: ShootingType;
  threePoints: ShootingType;
  freeThrows: ShootingType;
  steals: number;
  blocks: number;
  fouls: number;
  minutes: string;
  gameScore: string;
  positions: number;
};

export type SinglePlayerBoxType = {
  matchType: string;
  matchDate: {
    id: string;
    date: string;
  };
  opponentName: string;
  ppp: string;
  points: number;
  rebounds: ReboundType;
  assists: number;
  turnovers: number;
  fieldGoal: ShootingType;
  threePoints: ShootingType;
  freeThrows: ShootingType;
  steals: number;
  blocks: number;
  fouls: number;
  minutes: string;
  gameScore: string;
  positions: number;
};

export type TeamType = {
  _id: string;
  name: string;
};

export type PlayerType = {
  _id: string;
  name: string;
  number: string;
};

export type MatchCategoryType = {
  _id: string;
  name: string;
  type: string;
};
