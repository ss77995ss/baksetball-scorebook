import React, { useRef } from 'react';
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
  const timeout = useRef<number>();
  const clickCount = useRef<number>(0);
  const handlers = useSwipeable({
    onSwipedDown: () => {
      if (value - 3 >= 0) updateData(index, id, value - 3);
    },
    onSwipedUp: () => updateData(index, id, value + 3),
    onSwipedLeft: () => {
      if (value - 2 >= 0) updateData(index, id, value - 2);
    },
    onSwipedRight: () => updateData(index, id, value + 2),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleClick: (event: React.MouseEvent<HTMLDivElement>) => void = event => {
    event.preventDefault();
    if (clickCount.current < 1) {
      clickCount.current += 1;
      timeout.current = setTimeout(() => {
        updateData(index, id, value + 1);
        clickCount.current = 0;
      }, 200);
    } else {
      clearTimeout(timeout.current);
      if (value - 1 >= 0) updateData(index, id, value - 1);
      clickCount.current = 0;
    }
  };

  return (
    <StyledCell {...handlers} onClick={handleClick}>
      {value}
    </StyledCell>
  );
};

export default StatCell;
