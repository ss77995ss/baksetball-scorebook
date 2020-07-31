import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.div`
  font-weight: bold;
`;

const TableCell: React.FC = () => {
  const [statValue, setStatValue] = useState(0);
  const handleClick: () => void = () => setStatValue(prev => prev + 1);
  const handleRightClick: (event: React.MouseEvent<HTMLDivElement>) => void = event => {
    event.preventDefault();
    setStatValue(prev => prev - 1);
  };

  return (
    <Button onClick={handleClick} onContextMenu={handleRightClick}>
      {statValue}
    </Button>
  );
};

export default TableCell;
