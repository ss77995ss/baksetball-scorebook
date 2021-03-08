import { useRef } from 'react';
import { Cell } from 'react-table';
import { useSwipeable } from 'react-swipeable';
import { StyledCell } from '../styles';
import { useStatsDispatch } from './hooks/statData';
import { StatType } from './types';

interface Props {
  cell: Cell<StatType>;
  team: string;
  isSwipeable: boolean;
}

const StatCellWithCount: React.FC<Props> = ({ cell, team, isSwipeable }: Props) => {
  const {
    value,
    row: { index },
    column: { id = '' },
  } = cell;
  const { count, points } = value;

  const pointsClickTimeout = useRef<number>();
  const countClickTimeout = useRef<number>();
  const pointsClickCount = useRef<number>(0);
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

  const handlers = useSwipeable({
    onSwipedDown: ({ event }) => {
      event.stopPropagation();
      if (points - 3 >= 0) updateStats({ points: points - 3, count: count - 1 >= 0 ? count - 1 : count });
    },
    onSwipedUp: () => updateStats({ points: points + 3, count: count + 1 }),
    onSwipedLeft: () => {
      if (points - 2 >= 0) updateStats({ points: points - 2, count: count - 1 >= 0 ? count - 1 : count });
    },
    onSwipedRight: () => updateStats({ points: points + 2, count: count + 1 }),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handlePointsClick = (): void => {
    if (pointsClickCount.current < 1) {
      pointsClickCount.current += 1;
      pointsClickTimeout.current = window.setTimeout(() => {
        updateStats({ points: points + 1, count: count });
        pointsClickCount.current = 0;
      }, 200);
    } else {
      clearTimeout(pointsClickTimeout.current);
      if (points - 1 >= 0) updateStats({ points: points - 1, count });
      pointsClickCount.current = 0;
    }
  };

  const handleCountClick = (): void => {
    if (countClickCount.current < 1) {
      countClickCount.current += 1;
      countClickTimeout.current = window.setTimeout(() => {
        updateStats({ points, count: count + 1 });
        countClickCount.current = 0;
      }, 200);
    } else {
      clearTimeout(countClickTimeout.current);
      if (count - 1 >= 0) updateStats({ points, count: count - 1 });
      countClickCount.current = 0;
    }
  };

  return (
    <StyledCell {...(isSwipeable && handlers)} readOnly={false}>
      <span onClick={handlePointsClick}>{points}</span>
      <hr />
      <span onClick={handleCountClick}>{count}</span>
    </StyledCell>
  );
};

export default StatCellWithCount;
