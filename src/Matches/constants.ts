import { Column } from 'react-table';
import { BoxType } from './types';

export const boxScoreHeaderName = {
  assists: '助攻',
  blocks: '阻攻',
  dRebounds: '防守籃板',
  fouls: '犯規',
  ftAttempts: '罰球出手',
  ftMades: '罰球進球',
  minutes: '上場時間',
  oRebounds: '進攻籃板',
  points: '得分',
  positions: '球權',
  steals: '抄截',
  threeAttempts: '三分出手',
  threeMades: '三分進球',
  turnovers: '失誤',
  twoAttempts: '兩分出手',
  twoMades: '兩分進球',
};

export const defaultStats = {
  points: 0,
  oRebounds: 0,
  dRebounds: 0,
  assists: 0,
  turnovers: 0,
  twoMades: 0,
  twoAttempts: 0,
  threeMades: 0,
  threeAttempts: 0,
  ftMades: 0,
  ftAttempts: 0,
  steals: 0,
  blocks: 0,
  fouls: 0,
  positions: 0,
};

export const defaultPlayerResults = {
  _id: '',
  matchId: '',
  playerId: '',
  teamId: '',
  opponentTeamId: '',
  player: {
    _id: '',
    name: '',
    number: '',
    teamId: '',
  },
  minutes: 0.0,
  ...defaultStats,
};

export const REBOUND_TYPES_NAME = {
  OFFENSIVE: '攻',
  DEFENSIVE: '守',
  TOTAL: '總',
};

export const SHOOTING_RESULTS_NAME = {
  MADE: '進',
  ATTEMPT: '投',
  PERCENTAGE: '%',
};

export const columns: Array<Column<BoxType>> = [
  {
    Header: '#',
    accessor: 'playerNumber',
  },
  {
    Header: '名字',
    accessor: 'playerName',
  },
  {
    Header: 'PPP',
    accessor: 'ppp',
  },
  {
    Header: '球權％',
    accessor: 'positionRate',
  },
  {
    Header: '得分',
    accessor: 'points',
  },
  {
    Header: '籃板',
    accessor: 'rebounds',
  },
  {
    Header: '助攻',
    accessor: 'assists',
  },
  {
    Header: '失誤',
    accessor: 'turnovers',
  },
  {
    Header: 'FG',
    accessor: 'fieldGoal',
  },
  {
    Header: '3PT',
    accessor: 'threePoints',
  },
  {
    Header: 'FT',
    accessor: 'freeThrows',
  },
  {
    Header: '抄截',
    accessor: 'steals',
  },
  {
    Header: '火鍋',
    accessor: 'blocks',
  },
  {
    Header: '犯規',
    accessor: 'fouls',
  },
  {
    Header: '上場時間',
    accessor: 'minutes',
  },
  {
    Header: 'GameScore',
    accessor: 'gameScore',
  },
  {
    Header: '球權%',
    accessor: 'positions',
  },
];
