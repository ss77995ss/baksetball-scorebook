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
  LOST_POINTS: 'lostPoints',
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
  lostPoints: '失分',
};

export const columns: Array<Column<TurnoverCategoriesType>> = [
  {
    Header: '名字',
    accessor: 'playerName',
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
    Header: '總計次數',
    accessor: 'totalTurnovers',
  },
  {
    Header: '總失分',
    accessor: 'totalLostPoints',
  },
];

export const defaultPlayers = [
  '許致銓',
  '徐子惇',
  '王奕中',
  '吳天友',
  '楊喬宇',
  '連潔琳',
  '陳威樺',
  '謝長霖',
  '王允忠',
  '張健爾',
  '王致善',
  '游柏仁',
  '李方暐',
  '張恩豪',
  '蔡秉杰',
  '郭尚睿',
  '蘇恩沛',
  '陳喆',
  '林睦容',
  '歐崇愷',
  '吳東霖',
  '廖弘傑',
  '林聖翔',
  '白宗民',
  '廖柏誠',
];

export const defaultPlayersList = [
  {
    name: 'default',
    value: defaultPlayers,
  },
];

export const initialSingleData = {
  playerName: 'Total',
  drop: {
    directTrans: 0,
    deadBall: 0,
    lostPoints: 0,
  },
  nonOffensivePass: {
    directTrans: 0,
    deadBall: 0,
    lostPoints: 0,
  },
  offensivePass: {
    directTrans: 0,
    deadBall: 0,
    lostPoints: 0,
  },
  paintPass: {
    directTrans: 0,
    deadBall: 0,
    lostPoints: 0,
  },
  others: 0,
  totalTurnovers: 0,
  totalLostPoints: 0,
};

export const initialTurnoverData: Array<TurnoverCategoriesType> = defaultPlayers.map(playerName => {
  return {
    ...initialSingleData,
    playerName,
  };
});
