import React from 'react';
import { Row, Column } from 'react-table';
import { useSwipeable } from 'react-swipeable';
import { StyledCell } from './styles';

interface Props {
  value: number;
  row: Row;
  column: Column;
  count: number;
  updateData: (rowIndex: number, columnId: string, value: number) => void;
}

const StatCell: React.FC<Props> = ({ value, row: { index }, column: { id = '' }, count, updateData }: Props) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (value - count >= 0) updateData(index, id, value - count);
    },
    onSwipedRight: () => updateData(index, id, value + count),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return <StyledCell {...handlers}>{value}</StyledCell>;
};

export default StatCell;
