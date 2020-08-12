import React, { useState } from 'react';
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
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '禁區',
      title: {
        points: DEFAULT_TITLE.POINTS,
        count: '接球次數',
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
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '二波',
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
      type: STAT_TYPE.POINTS_AND_COUNT,
      name: '三分',
      title: {
        points: '進',
        count: '出手',
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
  const [team, setTeam] = useState('台大');

  const handleCheck: (event: { target: HTMLInputElement }) => void = event => setTeam(event.target.value);

  return (
    <div>
      <div>
        <input type="radio" id="ntu" name="team" value="台大" onChange={handleCheck} defaultChecked />
        <label htmlFor="ntu">台大</label>
        <input type="radio" id="two" name="team" value="對手" onChange={handleCheck} />
        <label htmlFor="opponent">對手</label>
        <p>{`Current: ${team}`}</p>
      </div>
      <div style={{ display: team === '台大' ? 'block' : 'none' }}>
        <StatsTable columns={columns} initialData={initialData} />
      </div>
      <div style={{ display: team === '台大' ? 'none' : 'block' }}>
        <StatsTable columns={columns} initialData={initialData} />
      </div>
    </div>
  );
};

export default App;
