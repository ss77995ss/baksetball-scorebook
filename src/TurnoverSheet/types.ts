export type TurnoverSubCategoriesType = {
  directTrans: number;
  deadBall: number;
  missPoints: number;
};

export type TurnoverCategoriesType = {
  playerNumber: number;
  drop: TurnoverSubCategoriesType;
  cross: TurnoverSubCategoriesType;
  direct: TurnoverSubCategoriesType;
  other: TurnoverSubCategoriesType;
  otherTOs: number;
  total: number;
};
