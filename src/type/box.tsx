export type BoxStateType = {
  [key: number]: {
    number: number;
    twoPointMade: number;
    twoPointAttempt: number;
    threePointMade: number;
    threePointAttempt: number;
    freeThrowMade: number;
    freeThrowAttempt: number;
    offensiveRebound: number;
    defensiveRebound: number;
    totalRebound: number;
    assist: number;
    steal: number;
    block: number;
    tunrover: number;
    foul: number;
    points: number;
  };
};

export type BoxRowActionType = { type: 'ADD_NUMBER' } | { type: 'REDUCE_NUMBER' };
