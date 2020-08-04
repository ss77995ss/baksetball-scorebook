import React from 'react';
import { Row } from 'react-table';
import { omit } from 'ramda';
import { StyledCell } from './styles';

interface Props {
  row: Row;
}

const getTotal: (rowData: object) => number = rowData => {
  const quarterStats: Array<string> = Object.values(omit(['statName', 'total'], rowData));
  const sum = quarterStats.reduce((acc, current) => acc + parseInt(current, 10), 0);

  return sum;
};

const TotalCell: React.FC<Props> = ({ row }: Props) => {
  return <StyledCell>{getTotal(row.values)}</StyledCell>;
};

export default TotalCell;
