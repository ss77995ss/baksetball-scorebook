import React, { useContext, useReducer } from 'react';
import { isNull } from 'lodash';
import BoxContext from './context/box';
import { boxReducer } from './reducer/box';

interface propsType {
  variant: string;
  value: number;
  rowNumber: number;
}

const BoxCell: React.SFC<propsType> = ({ variant, value, rowNumber }) => {
  const box = useContext(BoxContext);
  const [boxState, boxDispatch] = useReducer(boxReducer, box);
  const currentRowData = boxState.box[rowNumber];
  //@ts-ignore
  const currentValue = currentRowData[variant];

  const handleClick = () => {
    const inputNumber = prompt('Please input player number', value.toString());

    const playerNumber = isNull(inputNumber) ? '0' : inputNumber;
    boxDispatch({ type: 'UPDATE_NUMBER', key: rowNumber, number: parseInt(playerNumber, 10) });
  };

  if (variant === 'number') return <td onClick={handleClick}>{currentValue}</td>;
  return <td>{currentValue}</td>;
};

export default BoxCell;
