import React from 'react';
import { Cell } from 'react-table';
import { lensProp, pick, set } from 'ramda';
import { StyledTitleCell } from './styles';
import { useStatsDispatch } from './hooks/statData';

interface Props {
  cell: Cell;
}

const StatTitleCell: React.FC<Props> = ({ cell }: Props) => {
  const {
    value,
    row: { index },
    column: { id },
  } = cell;
  const { name, title } = value;

  const statsDispatch = useStatsDispatch();

  const updateStatsName: (
    value:
      | { count: number; points: number }
      | number
      | { name: string; title: string | { points: string; count: string } },
  ) => void = value => {
    statsDispatch({
      type: 'UPDATE_STATS_NAME',
      params: {
        team: '',
        rowIndex: index,
        columnId: id,
        value,
      },
    });
  };

  const handleOnClick = (key: string) => (): void => {
    const targetValue = typeof title === 'object' && key !== 'name' ? pick([key], title)[key] : pick([key], value)[key];
    const newKeyName = prompt('輸入新的名稱', targetValue) || targetValue;
    const targetLen = lensProp(key);

    typeof title === 'object' && key !== 'name'
      ? updateStatsName({ ...value, title: set(targetLen, newKeyName, title) })
      : updateStatsName(set(targetLen, newKeyName, value));
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
