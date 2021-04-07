import { Column } from 'react-table';
import { BoxType } from './types';

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
    Header: '球權',
    accessor: 'positions',
  },
];
