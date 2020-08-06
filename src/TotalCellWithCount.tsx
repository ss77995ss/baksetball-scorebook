import React from 'react';
import { Row } from 'react-table';
import { omit } from 'ramda';
import { StyledCell } from './styles';

interface Props {
  row: Row;
}

type StatWithCountType = {
  count: number;
  points: number;
};

const getTotal: (rowData: object) => string = rowData => {
  const quarterStats: Array<StatWithCountType> = Object.values(omit(['statName', 'total'], rowData));

  const sum = quarterStats.reduce(
    ({ count: accCount, points: accPoints }, { count: currentCount, points: currentPoints }) => {
      return {
        count: accCount + currentCount,
        points: accPoints + currentPoints,
      };
    },
  );

  return `${sum.points}/${sum.count}`;
};

const TotalCellWithCount: React.FC<Props> = ({ row }: Props) => {
  return <StyledCell>{getTotal(row.values)}</StyledCell>;
};

export default TotalCellWithCount;
