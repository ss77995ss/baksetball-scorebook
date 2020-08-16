import React from 'react';
import { Row } from 'react-table';
import { getTotalWithCount } from './utils';
import { StyledCell } from './styles';

interface Props {
  row: Row;
}

type StatWithCountType = {
  count: number;
  points: number;
};

const TotalCellWithCount: React.FC<Props> = ({ row }: Props) => {
  return <StyledCell>{getTotalWithCount(row.values)}</StyledCell>;
};

export default TotalCellWithCount;
