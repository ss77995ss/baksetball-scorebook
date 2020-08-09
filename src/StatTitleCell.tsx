import React from 'react';
import { StyledCell } from './styles';

interface Props {
  value: {
    type: string;
    name: string;
    title:
      | {
          points: string;
          count: string;
        }
      | string;
  };
}

const StatTitleCell: React.FC<Props> = ({ value }: Props) => {
  const { name, title } = value;
  return (
    <StyledCell>
      <div>{name}</div>
      {typeof title === 'string' ? <div>{title}</div> : <div>{`${title.points}/${title.count}`}</div>}
    </StyledCell>
  );
};

export default StatTitleCell;
