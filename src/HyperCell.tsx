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
  const pointsClickTimeout = useRef<number>();
  const countClickTimeout = useRef<number>();
  const pointsClickCount = useRef<number>(0);
  const countClickCount = useRef<number>(0);
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

  const handlePointsClick: (event: React.MouseEvent<HTMLDivElement>) => void = () => {
    if (pointsClickCount.current < 1) {
      pointsClickCount.current += 1;
      pointsClickTimeout.current = setTimeout(() => {
        updateData(index, id, { points: points + 1, count });
        pointsClickCount.current = 0;
      }, 200);
    } else {
      clearTimeout(pointsClickTimeout.current);
      if (points - 1 >= 0) updateData(index, id, { points: points - 1, count });
      pointsClickCount.current = 0;
    }
  };

  const handleCountClick: (event: React.MouseEvent<HTMLDivElement>) => void = () => {
    if (countClickCount.current < 1) {
      countClickCount.current += 1;
      countClickTimeout.current = setTimeout(() => {
        updateData(index, id, { points, count: count + 1 });
        countClickCount.current = 0;
      }, 200);
    } else {
      clearTimeout(countClickTimeout.current);
      if (count - 1 >= 0) updateData(index, id, { points, count: count - 1 });
      countClickCount.current = 0;
    }
  };

  return (
    <StyledCell {...handlers}>
      <span onClick={handlePointsClick}>{points}</span>
      <hr />
      <span onClick={handleCountClick}>{count}</span>
    </StyledCell>
  );
};

export default StatCell;
