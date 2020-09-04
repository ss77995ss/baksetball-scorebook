import React from 'react';
import { Cell } from 'react-table';
import { StyledCell } from './styles';
import { StatType } from './types';

interface Props {
  cell: Cell<StatType>;
}

const ReadOnlyCell: React.FC<Props> = ({ cell }: Props) => {
  const { value } = cell;
  return (
    <StyledCell readOnly>
      {typeof value === 'number' ? (
        <span>{value}</span>
      ) : (
        <>
          <span>{value.points}</span>
          <hr />
          <span>{value.count}</span>
        </>
      )}
    </StyledCell>
  );
};

export default ReadOnlyCell;
