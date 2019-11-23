import React, { useContext } from 'react';
import BoxContext from './context/box';
import BoxCell from './boxCell';

const BoxContent: React.FC = () => {
  const { box } = useContext(BoxContext);
  // @ts-ignore
  const renderCells = (row: any, rowNumber: number) =>
    Object.keys(row).map((key: string) => <BoxCell value={row[key]} variant={key} rowNumber={rowNumber} />);
  const renderRows = Array.from({ length: Object.values(box).length }, (v, number) => {
    return <tr>{renderCells(box[number + 1], number + 1)}</tr>;
  });

  return <tbody>{renderRows}</tbody>;
};

export default BoxContent;
