import React, { useRef } from 'react';
import { Row, Column } from 'react-table';
import { useSwipeable } from 'react-swipeable';
import { StyledCell } from './styles';

interface Props {
  value: {
    count: number;
    points: number;
  };
  row: Row;
  column: Column;
  updateData: (rowIndex: number, columnId: string, value: { count: number; points: number }) => void;
}

const StatCell: React.FC<Props> = ({ value, row: { index }, column: { id = '' }, updateData }: Props) => {
  const { count, points } = value;
  const timeout = useRef<number>();
  const clickCount = useRef<number>(0);
  const handlers = useSwipeable({
    onSwipedDown: ({ event }) => {
      event.stopPropagation();
      if (points - 3 >= 0) updateData(index, id, { points: points - 3, count: count - 1 });
    },
    onSwipedUp: () => updateData(index, id, { points: points + 3, count: count + 1 }),
    onSwipedLeft: () => {
      if (points - 2 >= 0) updateData(index, id, { points: points - 2, count: count - 1 });
    },
    onSwipedRight: () => updateData(index, id, { points: points + 2, count: count + 1 }),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleClick: (event: React.MouseEvent<HTMLDivElement>) => void = () => {
    if (clickCount.current < 1) {
      clickCount.current += 1;
      timeout.current = setTimeout(() => {
        updateData(index, id, { points: points + 1, count: count + 1 });
        clickCount.current = 0;
      }, 200);
    } else {
      clearTimeout(timeout.current);
      if (points - 1 >= 0) updateData(index, id, { points: points - 1, count: count - 1 });
      clickCount.current = 0;
    }
  };

  return (
    <StyledCell {...handlers}>
      <span onClick={handleClick}>{`${points}/${count}`}</span>
    </StyledCell>
  );
};

export default StatCell;
