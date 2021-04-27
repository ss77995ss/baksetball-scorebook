import styled from 'styled-components';
import { StyledSubHeader } from '../../../styles';
import { REBOUND_TYPES_NAME } from '../../constants';

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

const ReboundHeader: React.FC = () => {
  const { OFFENSIVE, DEFENSIVE, TOTAL } = REBOUND_TYPES_NAME;
  return (
    <StyledHeader>
      <StyledMainHeader>籃板</StyledMainHeader>
      <StyledSubHeader>
        <li>{OFFENSIVE}</li>
        <li>{DEFENSIVE}</li>
        <li>{TOTAL}</li>
      </StyledSubHeader>
    </StyledHeader>
  );
};

export default ReboundHeader;
