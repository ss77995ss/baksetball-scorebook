import { Column } from 'react-table';
import { TurnoverCategoriesType } from './types';

export const columns: Array<Column<TurnoverCategoriesType>> = [
  {
    Header: '#',
    accessor: 'playerNumber',
  },
  {
    Header: 'Drop',
    accessor: 'drop',
  },
  {
    Header: '橫傳球',
    accessor: 'cross',
  },
  {
    Header: '直傳球',
    accessor: 'direct',
  },
  {
    Header: '其他傳球',
    accessor: 'other',
  },
  {
    Header: '其他失誤',
    accessor: 'otherTOs',
  },
  {
    Header: '總和',
    accessor: 'total',
  },
];

export const initialTurnoverData: Array<TurnoverCategoriesType> = [
  {
    playerNumber: 1,
    drop: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    cross: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    direct: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    other: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    otherTOs: 0,
    total: 0,
  },
];

export const TURNOVER_SUB_CATEGORIES_TYPE = {
  DIRECT_TRANSITION: '直接轉換',
  DEAD_BALL: '死球',
  MISS_POINTS: '失分',
};
