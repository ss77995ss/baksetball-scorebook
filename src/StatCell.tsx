import React, { useRef } from 'react';
import { Cell } from 'react-table';
import { StyledCell } from './styles';
import { useStatsDispatch } from './hooks/statData';
import { StatType } from './types';

interface Props {
  cell: Cell<StatType>;
  team: string;
}

const StatCell: React.FC<Props> = ({ cell, team }: Props) => {
  const {
    value,
    row: { index },
    column: { id = '' },
  } = cell;

  const countClickTimeout = useRef<number>();
  const countClickCount = useRef<number>(0);
  const statsDispatch = useStatsDispatch();

  const updateStats: (
    value:
      | { count: number; points: number }
      | number
      | { name: string; title: string | { points: string; count: string } },
  ) => void = value => {
    statsDispatch({
      type: 'UPDATE_CELL',
      params: {
        team,
        rowIndex: index,
        columnId: id,
        value,
      },
    });
  };

  const handleCountClick = (): void => {
    if (countClickCount.current < 1) {
      countClickCount.current += 1;
      countClickTimeout.current = setTimeout(() => {
        updateStats(value + 1);
        countClickCount.current = 0;
      }, 200);
    } else {
      clearTimeout(countClickTimeout.current);
      if (value - 1 >= 0) updateStats(value - 1);
      countClickCount.current = 0;
    }
  };

  return (
    <StyledCell>
      <div onClick={handleCountClick}>{value}</div>
    </StyledCell>
  );
};

export default StatCell;
