import React, { useEffect, useCallback } from 'react';
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

  const handleContextMenu: (event: MouseEvent) => void = useCallback(
    event => {
      event.preventDefault();
      if (value - 1 >= 0) updateData(index, id, value - 1);
    },
    [index, id, value, updateData],
  );

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    return (): void => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [handleContextMenu]);

  const handleClick: (event: React.MouseEvent<HTMLDivElement>) => void = event => {
    event.preventDefault();
    updateData(index, id, value + 1);
  };

  return (
    <StyledCell {...handlers} onClick={handleClick}>
      {value}
    </StyledCell>
  );
};

export default StatCell;
