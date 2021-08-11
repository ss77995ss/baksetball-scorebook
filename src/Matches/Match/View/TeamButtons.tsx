import styled from 'styled-components';
import { MatchInfoType } from '../../types';

const StyledButtons = styled.section`
  text-align: center;

  button {
    margin: 4px;
  }
`;

interface Props {
  matchInfo: MatchInfoType;
  handleSwitchTeam: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TeamButtons: React.FC<Props> = ({ matchInfo, handleSwitchTeam }: Props) => {
  return (
    <StyledButtons>
      <button value={matchInfo.homeTeam._id} onClick={handleSwitchTeam}>
        {matchInfo.homeTeam.name}
      </button>
      <button value={matchInfo.awayTeam._id} onClick={handleSwitchTeam}>
        {matchInfo.awayTeam.name}
      </button>
    </StyledButtons>
  );
};

export default TeamButtons;
