import styled from 'styled-components';
import { TurnoverSubCategoriesType } from './types';

interface Props {
  value: TurnoverSubCategoriesType;
}

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;

  li {
    font-size: 12px;
    width: 25%;

    border-right: 1px solid black;

    :last-child {
      border-right: none;
    }
  }
`;

const GrayList = styled.li`
  background-color: #ccc;
`;

const TurnoverCell: React.FC<Props> = ({ value }: Props) => {
  const { directTrans, deadBall, lostPoints } = value;

  return (
    <>
      <StyledList>
        <li>{directTrans}</li>
        <li>{deadBall}</li>
        <GrayList>{directTrans + deadBall}</GrayList>
        <GrayList>{lostPoints}</GrayList>
      </StyledList>
    </>
  );
};

export default TurnoverCell;
