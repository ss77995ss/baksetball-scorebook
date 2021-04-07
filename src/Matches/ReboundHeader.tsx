import styled from 'styled-components';
import { StyledSubHeader, StyledHighlightHeader } from '../styles';
import { REBOUND_TYPES_NAME } from './constants';

const StyledMainHeader = styled.section`
  border-bottom: 1px solid black;
  padding: 4px 0;
  width: 220px;

  @media (max-width: 1119px) {
    font-size: 10px;
    width: 150px;
  }
`;

const ReboundHeader: React.FC = () => {
  const { OFFENSIVE, DEFENSIVE, TOTAL } = REBOUND_TYPES_NAME;
  return (
    <StyledHighlightHeader>
      <StyledMainHeader>籃板</StyledMainHeader>
      <StyledSubHeader>
        <li>{OFFENSIVE}</li>
        <li>{DEFENSIVE}</li>
        <li>{TOTAL}</li>
      </StyledSubHeader>
    </StyledHighlightHeader>
  );
};

export default ReboundHeader;
