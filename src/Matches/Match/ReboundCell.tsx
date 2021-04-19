import styled from 'styled-components';
import { ReboundType } from '../types';

interface Props {
  value: ReboundType;
}

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;

  li {
    font-size: 12px;
    width: 33%;

    border-right: 1px solid black;

    :last-child {
      border-right: none;
    }
  }
`;

const TurnoverCell: React.FC<Props> = ({ value }: Props) => {
  const { offensive, defensive, total } = value;

  return (
    <>
      <StyledList>
        <li>{offensive}</li>
        <li>{defensive}</li>
        <li>{total}</li>
      </StyledList>
    </>
  );
};

export default TurnoverCell;
