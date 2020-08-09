import React, { useRef } from 'react';
import { Cell } from 'react-table';
import { StyledCell } from './styles';

interface Props {
  cell: Cell;
  updateData: (rowIndex: number, columnId: string, value: number) => void;
}

const StatCell: React.FC<Props> = ({ cell, updateData }: Props) => {
  const {
    value,
    row: { index },
    column: { id = '' },
  } = cell;

  const countClickTimeout = useRef<number>();
  const countClickCount = useRef<number>(0);

  const handleCountClick: (event: React.MouseEvent<HTMLDivElement>) => void = () => {
    if (countClickCount.current < 1) {
      countClickCount.current += 1;
      countClickTimeout.current = setTimeout(() => {
        updateData(index, id, value + 1);
        countClickCount.current = 0;
      }, 200);
    } else {
      clearTimeout(countClickTimeout.current);
      if (value - 1 >= 0) updateData(index, id, value - 1);
      countClickCount.current = 0;
    }
  };

  return (
    <StyledCell>
      <span onClick={handleCountClick}>{value}</span>
    </StyledCell>
  );
};

export default StatCell;
