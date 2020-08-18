import { omit } from 'ramda';

export const getTotal: (rowData: object) => number = rowData => {
  const quarterStats: Array<string> = Object.values(omit(['statInfo', 'total'], rowData));
  const sum = quarterStats.reduce((acc, current) => acc + parseInt(current, 10), 0);

  return sum;
};

export const getTotalWithCount: (rowData: object) => string = rowData => {
  const quarterStats: Array<{
    count: number;
    points: number;
  }> = Object.values(omit(['statInfo', 'total'], rowData));

  const sum = quarterStats.reduce(
    ({ count: accCount, points: accPoints }, { count: currentCount, points: currentPoints }) => {
      return {
        count: accCount + currentCount,
        points: accPoints + currentPoints,
      };
    },
  );

  return `${sum.points} / ${sum.count}`;
};
