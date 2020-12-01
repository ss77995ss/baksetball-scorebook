import React from 'react';
import { Row } from 'react-table';
import { StatType } from './types';
import { getTotal } from './utils';
import { StyledCell } from '../styles';

interface Props {
  row: Row<StatType>;
}

const TotalCell: React.FC<Props> = ({ row }: Props) => {
  return (
    <StyledCell readOnly>
      <span>{getTotal(row.values)}</span>
    </StyledCell>
  );
};

export default TotalCell;
