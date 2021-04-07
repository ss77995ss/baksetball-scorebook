export type MatchType = {
  _id: string;
  type: string | null;
  name: string | null;
  homeTeamId: string | null;
  awayTeamId: string | null;
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
  assists: number;
  blocks: number;
  dRebounds: number;
  fouls: number;
  ftAttempts: number;
  ftMades: number;
  minutes: number;
  oRebounds: number;
  opponentTeamId: string;
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

export type BoxType = {
  playerNumber: string;
  playerName: {
    id: string;
    name: string;
  };
  ppp: number;
  positionRate: number;
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
  minutes: number;
  gameScore: number;
  positions: number;
};
