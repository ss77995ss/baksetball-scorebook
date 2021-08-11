import styled from 'styled-components';
import { MatchInfoType } from '../../types';
import MatchInfo from './MatchInfo';
import BoxScore from './BoxScore';
import TeamButtons from './TeamButtons';

const StyledLinks = styled.section`
  text-align: center;

  button {
    margin: 8px 4px;
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
      <TeamButtons matchInfo={matchInfo} handleSwitchTeam={handleSwitchTeam} />
      <BoxScore id={id} selectedTeam={selectedTeam} />
    </div>
  );
};

export default View;
