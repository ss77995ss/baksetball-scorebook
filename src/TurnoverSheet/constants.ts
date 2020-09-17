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
  DROP: 'Drop',
  CROSS_PASS: '橫傳球',
  DIRECT_PASS: '直傳球',
  OTHER_PASS: '其他傳球',
  OTHERS: '其他失誤',
};

export const TURNOVER_SUB_CATEGORIES_NAME = {
  DIRECT_TRANSITION: '直接轉換',
  DEAD_BALL: '死球',
  MISS_POINTS: '失分',
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

export const initialTurnoverData: Array<TurnoverCategoriesType> = [
  {
    playerNumber: 1,
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
  },
];
