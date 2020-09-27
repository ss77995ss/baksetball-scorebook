import { Column } from 'react-table';
import { TurnoverCategoriesType } from './types';

export const TURNOVER_CATEGORIES = {
  DROP: 'drop',
  CROSS_PASS: 'crossPass',
  DIRECT_PASS: 'directPass',
  OTHER_PASS: 'otherPass',
  OTHERS: 'others',
};

export const TURNOVER_SUB_CATEGORIES = {
  DIRECT_TRANSITION: 'directTrans',
  DEAD_BALL: 'deadBall',
  MISS_POINTS: 'missPoints',
};

export const TURNOVER_CATEGORIES_NAME = {
  drop: 'Drop',
  crossPass: '橫傳球',
  directPass: '直傳球',
  otherPass: '其他傳球',
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
    Header: '橫傳球',
    accessor: 'crossPass',
  },
  {
    Header: '直傳球',
    accessor: 'directPass',
  },
  {
    Header: '其他傳球',
    accessor: 'otherPass',
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
    crossPass: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    directPass: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    otherPass: {
      directTrans: 0,
      deadBall: 0,
      missPoints: 0,
    },
    others: 0,
    total: 0,
  };
});
