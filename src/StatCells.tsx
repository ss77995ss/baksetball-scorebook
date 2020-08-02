import React, { useState } from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

const StyledDiv = styled.div`
  font-weight: bold;
  padding: 4rem;

  @media (min-width: 600px) and (max-width: 900px) {
    padding: 2.5rem;
  }

  @media (max-width: 600px) {
    padding: 1.2rem;
  }
`;

interface Props {
  value: string;
}

const StatCell: React.FC<Props> = ({ value }: Props) => {
  const [statValue, setStatValue] = useState(parseInt(value, 10));
  const handlers = useSwipeable({
    onSwipedLeft: () => setStatValue(prev => prev - 1),
    onSwipedRight: () => setStatValue(prev => prev + 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return <StyledDiv {...handlers}>{statValue}</StyledDiv>;
};

export default StatCell;
