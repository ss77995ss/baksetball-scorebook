import styled from 'styled-components';
import { StyledSubHeader, StyledHighlightHeader } from '../styles';
import { SHOOTING_RESULTS_NAME } from './constants';

const StyledMainHeader = styled.section`
  border-bottom: 1px solid black;
  padding: 4px 0;
  width: 220px;

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
    <StyledHighlightHeader>
      <StyledMainHeader>{shootingType}</StyledMainHeader>
      <StyledSubHeader>
        <li>{MADE}</li>
        <li>{ATTEMPT}</li>
        <li>{PERCENTAGE}</li>
      </StyledSubHeader>
    </StyledHighlightHeader>
  );
};

export default ShootingHeader;
