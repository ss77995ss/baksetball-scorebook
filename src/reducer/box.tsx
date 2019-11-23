import { omit } from 'lodash';
import { BoxStateType, BoxRowActionType } from '../type/box';

export const boxReducer = (state: BoxStateType, action: BoxRowActionType): BoxStateType => {
  const currentRowNumber = Object.keys(state.box).length;
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
        box: {
          [currentRowNumber + 1]: defaultRowData,
          ...state.box,
        },
      };
    case 'REDUCE_NUMBER': {
      const currentRow = currentRowNumber + 1;
      // @ts-ignore
      return omit(state, currentRow);
    }
    case 'UPDATE_NUMBER': {
      const currentRowData = state.box[action.key];
      currentRowData.number = action.number;

      return {
        ...state,
        box: {
          [action.key]: currentRowData,
        },
      };
    }
    default:
      return state;
  }
};
