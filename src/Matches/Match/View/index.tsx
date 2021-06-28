import styled from 'styled-components';
import { MatchInfoType } from '../../types';
import MatchInfo from './MatchInfo';
import BoxScore from './BoxScore';

const StyledLinks = styled.section`
  text-align: center;

  button {
    margin: 8px 4px;
  }
`;

const StyledButtons = styled.section`
  text-align: center;

  button {
    margin: 4px;
  }
`;
interface Props {
  id: string;
  selectedTeam: string;
  matchInfo: MatchInfoType;
  handleSwitchTeam: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setMode: React.Dispatch<React.SetStateAction<'view' | 'edit'>>;
}

const View: React.FC<Props> = ({ id, selectedTeam, matchInfo, handleSwitchTeam, setMode }: Props) => {
  return (
    <div>
      <MatchInfo matchInfo={matchInfo} />
      <StyledLinks>
        <button onClick={() => setMode('edit')}>編輯</button>
      </StyledLinks>
      <StyledButtons>
        <button value={matchInfo.homeTeam._id} onClick={handleSwitchTeam}>
          {matchInfo.homeTeam.name}
        </button>
        <button value={matchInfo.awayTeam._id} onClick={handleSwitchTeam}>
          {matchInfo.awayTeam.name}
        </button>
      </StyledButtons>
      <BoxScore id={id} selectedTeam={selectedTeam} />
    </div>
  );
};

export default View;
