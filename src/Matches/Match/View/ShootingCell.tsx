import styled from 'styled-components';
import { ShootingType } from '../../types';

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

    :first-child {
      border-right: 1px solid black;
      width: 66%;

      span {
        width: 33%;
      }
    }

    :last-child {
      margin: auto;
    }
  }
`;

const StyledDivider = styled.span`
  margin: 0 8px;
`;

const ShootingCell: React.FC<Props> = ({ value }: Props) => {
  const { made, attempts, percentage } = value;

  return (
    <StyledList>
      <li>
        <span>{made}</span>
        <StyledDivider> - </StyledDivider>
        <span>{attempts}</span>
      </li>
      <li>{percentage}</li>
    </StyledList>
  );
};

export default ShootingCell;
