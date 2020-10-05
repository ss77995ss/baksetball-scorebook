import { Column } from 'react-table';
import { TurnoverCategoriesType } from './types';

export const TURNOVER_CATEGORIES = {
  DROP: 'drop',
  NONE_OFFENSIVE_PASS: 'nonOffensivePass',
  OFFENSIVE_PASS: 'offensivePass',
  PAINT_PASS: 'paintPass',
  OTHERS: 'others',
};

export const TURNOVER_SUB_CATEGORIES = {
  DIRECT_TRANSITION: 'directTrans',
  DEAD_BALL: 'deadBall',
  MISS_POINTS: 'missPoints',
};

export const TURNOVER_CATEGORIES_NAME = {
  drop: 'Drop',
  nonOffensivePass: '非攻擊性傳球',
  offensivePass: '攻擊性傳球',
  paintPass: '禁區傳球',
  others: '其他失誤',
};

export const TURNOVER_SUB_CATEGORIES_NAME = {
  directTrans: '直接轉換',
  deadBall: '死球',
  missPoints: '失分',
};

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
    Header: '非攻擊性傳球',
    accessor: 'nonOffensivePass',
  },
  {
    Header: '攻擊性傳球',
    accessor: 'offensivePass',
  },
  {
    Header: '禁區傳球',
    accessor: 'paintPass',
  },
  {
    Header: '其他失誤',
    accessor: 'others',
  },
  {
    Header: '總和',
    accessor: 'total',
  },
];

export const defaultPlayers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const initialTurnoverData: Array<TurnoverCategoriesType> = defaultPlayers.map(playerNumber => {
  return {
    playerNumber,
    drop: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    nonOffensivePass: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    offensivePass: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    paintPass: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    others: 0,
    total: 0,
  };
});
