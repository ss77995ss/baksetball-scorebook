import { Column } from 'react-table';
import { StatType } from './types';

export const STAT_TYPE = {
  COUNT_ONLY: 'COUNT_ONLY',
  POINTS_AND_COUNT: 'POINTS_AND_COUNT',
};

export const DEFAULT_TITLE = {
  POINTS: '得分',
  LOST_POINTS: '失分',
  COUNT: '次數',
};

export const DEFAULT_TEAM_NAME = {
  HOME: '台大',
  AWAY: '對手',
};

export const columns: Array<Column<StatType>> = [
  {
    Header: '項目',
    accessor: 'statInfo',
  },
  {
    Header: 'Q1',
    accessor: 'q1',
  },
  {
    Header: 'Q2',
    accessor: 'q2',
  },
  {
    Header: 'Q3',
    accessor: 'q3',
  },
  {
    Header: 'Q4',
    accessor: 'q4',
  },
  {
    Header: '總計',
    accessor: 'total',
  },
];

export const initialData: Array<StatType> = [
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '快攻',
      linkName: '快攻',
      title: {
        points: DEFAULT_TITLE.POINTS,
        count: DEFAULT_TITLE.COUNT,
      },
      isSwipeable: true,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '禁區',
      linkName: '禁區接球',
      title: {
        points: DEFAULT_TITLE.POINTS,
        count: '禁區接球',
      },
      isSwipeable: true,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '禁區',
      linkName: '切入禁區',
      title: {
        points: DEFAULT_TITLE.POINTS,
        count: '切入禁區',
      },
      isSwipeable: true,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '二波',
      linkName: '二波',
      title: {
        points: DEFAULT_TITLE.POINTS,
        count: DEFAULT_TITLE.COUNT,
      },
      isSwipeable: true,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '三分',
      linkName: '三分',
      title: {
        points: '進',
        count: '出手',
      },
      isSwipeable: false,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '製造犯規',
      linkName: '製造犯規',
      title: {
        points: DEFAULT_TITLE.POINTS,
        count: DEFAULT_TITLE.COUNT,
      },
      isSwipeable: true,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '失誤',
      linkName: '失誤',
      title: {
        points: DEFAULT_TITLE.LOST_POINTS,
        count: DEFAULT_TITLE.COUNT,
      },
      isSwipeable: true,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '被搶籃板後被快攻',
      linkName: '被搶籃板後被快攻',
      title: {
        points: DEFAULT_TITLE.LOST_POINTS,
        count: DEFAULT_TITLE.COUNT,
      },
      isSwipeable: true,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '進球後被快攻',
      linkName: '進球後被快攻',
      title: {
        points: DEFAULT_TITLE.LOST_POINTS,
        count: DEFAULT_TITLE.COUNT,
      },
      isSwipeable: true,
    },
    q1: {
      count: 0,
      points: 0,
    },
    q2: {
      count: 0,
      points: 0,
    },
    q3: {
      count: 0,
      points: 0,
    },
    q4: {
      count: 0,
      points: 0,
    },
    total: {
      count: 0,
      points: 0,
    },
  },
];
