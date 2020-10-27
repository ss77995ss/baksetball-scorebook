export type TurnoverSubCategoriesType = {
  directTrans: number;
  deadBall: number;
  lostPoints: number;
};

export type TurnoverCategoriesType = {
  playerName: string;
  drop: TurnoverSubCategoriesType;
  nonOffensivePass: TurnoverSubCategoriesType;
  offensivePass: TurnoverSubCategoriesType;
  paintPass: TurnoverSubCategoriesType;
  others: number;
  totalTurnovers: number;
  totalLostPoints: number;
};

export type StatHistoryType = {
  playerName: string;
  turnoverCategory: 'drop' | 'nonOffensivePass' | 'offensivePass' | 'paintPass' | 'others';
  turnoverSubCategory: 'directTrans' | 'deadBall' | 'lostPoints' | undefined;
  value: number;
};
