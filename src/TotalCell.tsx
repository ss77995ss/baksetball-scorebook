import React from 'react';
import { Row } from 'react-table';
import { StatType } from './types';
import { getTotal } from './utils';
import { StyledCell } from './styles';

interface Props {
  row: Row<StatType>;
}

const TotalCell: React.FC<Props> = ({ row }: Props) => {
  return (
    <StyledCell>
      <div>{getTotal(row.values)}</div>
    </StyledCell>
  );
};

export default TotalCell;
