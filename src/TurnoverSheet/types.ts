export type TurnoverSubCategoriesType = {
  directTrans: number;
  deadBall: number;
  missPoints: number;
};

export type TurnoverCategoriesType = {
  playerNumber: number;
  drop: TurnoverSubCategoriesType;
  crossPass: TurnoverSubCategoriesType;
  directPass: TurnoverSubCategoriesType;
  otherPass: TurnoverSubCategoriesType;
  others: number;
  total: number;
};
