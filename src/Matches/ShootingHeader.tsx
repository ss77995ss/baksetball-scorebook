import styled from 'styled-components';
import { StyledSubHeader } from '../styles';
import { SHOOTING_RESULTS_NAME } from './constants';

const StyledHeader = styled.th`
  padding: 0;
`;

const StyledMainHeader = styled.section`
  border-bottom: 1px solid black;
  padding: 4px 0;
  width: 110px;

  @media (max-width: 1119px) {
    font-size: 10px;
    width: 150px;
  }
`;

interface Props {
  shootingType: Record<string, never> | 'FG' | '3PT' | 'FT';
}

const ShootingHeader: React.FC<Props> = ({ shootingType }: Props) => {
  const { MADE, ATTEMPT, PERCENTAGE } = SHOOTING_RESULTS_NAME;
  return (
    <StyledHeader>
      <StyledMainHeader>{shootingType}</StyledMainHeader>
      <StyledSubHeader>
        <li>{MADE}</li>
        <li>{ATTEMPT}</li>
        <li>{PERCENTAGE}</li>
      </StyledSubHeader>
    </StyledHeader>
  );
};

export default ShootingHeader;
