import React from 'react';
import { Cell } from 'react-table';
import { lensProp, pick, set } from 'ramda';
import { StyledTitleCell } from './styles';

interface Props {
  cell: Cell;
  updateData: (
    rowIndex: number,
    columnId: string,
    value: { name: string; title: string | { points: string; count: string } },
  ) => void;
}

const StatTitleCell: React.FC<Props> = ({ cell, updateData }: Props) => {
  const {
    value,
    row: { index },
    column: { id },
  } = cell;
  const { name, title } = value;

  const handleOnClick = (key: string) => (): void => {
    const targetValue = typeof title === 'object' && key !== 'name' ? pick([key], title)[key] : pick([key], value)[key];
    const newKeyName = prompt('輸入新的名稱', targetValue) || targetValue;
    const targetLen = lensProp(key);

    typeof title === 'object' && key !== 'name'
      ? updateData(index, id, { ...value, title: set(targetLen, newKeyName, title) })
      : updateData(index, id, set(targetLen, newKeyName, value));
  };

  return (
    <StyledTitleCell>
      <div onClick={handleOnClick('name')}>{name}</div>
      {typeof title === 'string' ? (
        <div onClick={handleOnClick('title')}>{title}</div>
      ) : (
        <div>
          <span onClick={handleOnClick('points')}>{title.points}</span>
          <span>/</span>
          <span onClick={handleOnClick('count')}>{title.count}</span>
        </div>
      )}
    </StyledTitleCell>
  );
};

export default StatTitleCell;
