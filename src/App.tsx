import React from 'react';
import { Column } from 'react-table';
import StatsTable from './StatsTable';
import { STAT_TYPE, DEFAULT_TITLE } from './constants';

const columns: Array<Column> = [
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

const initialData: Array<object> = [
  {
    statInfo: {
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '快攻',
      title: {
        points: DEFAULT_TITLE.POINTS,
        count: DEFAULT_TITLE.COUNT,
      },
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
      type: STAT_TYPE.COUNT_ONLY,
      name: '失誤',
      title: DEFAULT_TITLE.COUNT,
    },
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    total: 0,
  },
];

const App: React.FC = () => {
  return (
    <div>
      <StatsTable columns={columns} initialData={initialData} />
    </div>
  );
};

export default App;
