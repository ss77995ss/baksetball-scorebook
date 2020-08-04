import React from 'react';
import { Row, Column } from 'react-table';
import { useSwipeable } from 'react-swipeable';
import { StyledCell } from './styles';

interface Props {
  value: number;
  row: Row;
  column: Column;
  updateData: (rowIndex: number, columnId: string, value: number) => void;
}

const StatCell: React.FC<Props> = ({ value, row: { index }, column: { id = '' }, updateData }: Props) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (value > 0) updateData(index, id, value - 1);
    },
    onSwipedRight: () => updateData(index, id, value + 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return <StyledCell {...handlers}>{value}</StyledCell>;
};

export default StatCell;
