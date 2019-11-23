import React, { useContext } from 'react';
import BoxContext from './context/box';

const BoxContent: React.FC = () => {
  const { box } = useContext(BoxContext);
  // @ts-ignore
  const renderCells = (row: any) => Object.values(row).map(value => <td>{value}</td>);
  const renderRows = Array.from({ length: Object.values(box).length }, (v, number) => {
    console.log(box);
    return <tr>{renderCells(box[number + 1])}</tr>;
  });

  return <tbody>{renderRows}</tbody>;
};

export default BoxContent;
