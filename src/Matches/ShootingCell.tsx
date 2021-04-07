import styled from 'styled-components';
import { ShootingType } from './types';

interface Props {
  value: ShootingType;
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

const ShootingCell: React.FC<Props> = ({ value }: Props) => {
  const { made, attempts, percentage } = value;

  return (
    <>
      <StyledList>
        <li>{made}</li>
        <li>{attempts}</li>
        <li>{percentage}</li>
      </StyledList>
    </>
  );
};

export default ShootingCell;
