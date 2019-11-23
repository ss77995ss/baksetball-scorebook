import { omit } from 'lodash';
import { BoxStateType, BoxRowActionType } from '../type/box';

export const boxReducer = (state: BoxStateType, action: BoxRowActionType): BoxStateType => {
  const currentRowNumber = Object.keys(state).length;
  const defaultRowData = {
    number: 0,
    twoPointMade: 0,
    twoPointAttempt: 0,
    threePointMade: 0,
    threePointAttempt: 0,
    freeThrowMade: 0,
    freeThrowAttempt: 0,
    offensiveRebound: 0,
    defensiveRebound: 0,
    totalRebound: 0,
    assist: 0,
    steal: 0,
    block: 0,
    tunrover: 0,
    foul: 0,
    points: 0,
  };

  switch (action.type) {
    case 'ADD_NUMBER':
      return {
        ...state,
        [currentRowNumber + 1]: defaultRowData,
      };
    case 'REDUCE_NUMBER': {
      const currentRow = currentRowNumber + 1;
      // @ts-ignore
      return omit(state, currentRow);
    }
    default:
      return state;
  }
};
