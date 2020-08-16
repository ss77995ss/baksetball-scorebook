import React from 'react';
import { Row } from 'react-table';
import { getTotal } from './utils';
import { StyledCell } from './styles';

interface Props {
  row: Row;
}

const TotalCell: React.FC<Props> = ({ row }: Props) => {
  return <StyledCell>{getTotal(row.values)}</StyledCell>;
};

export default TotalCell;
