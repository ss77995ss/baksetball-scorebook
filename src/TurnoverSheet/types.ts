export type TurnoverSubCategoriesType = {
  directTrans: number;
  deadBall: number;
  missPoints: number;
};

export type TurnoverCategoriesType = {
  playerNumber: number;
  drop: TurnoverSubCategoriesType;
  nonOffensivePass: TurnoverSubCategoriesType;
  offensivePass: TurnoverSubCategoriesType;
  paintPass: TurnoverSubCategoriesType;
  others: number;
  total: number;
};

export type StatHistoryType = {
  playerNumber: string;
  turnoverCategory: 'drop' | 'nonOffensivePass' | 'offensivePass' | 'paintPass' | 'others';
  turnoverSubCategory: 'directTrans' | 'deadBall' | 'missPoints' | undefined;
};
