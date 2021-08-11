import { MatchInfoType } from '../../types';
import MatchInfo from '../View/MatchInfo';
import BoxScore from '../View/BoxScore';
import TeamButtons from '../View/TeamButtons';
import BackEditBtn from './BackEditBtn';

interface Props {
  id: string;
  selectedTeam: string;
  matchInfo: MatchInfoType;
  handleSwitchTeam: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Completed: React.FC<Props> = ({ id, selectedTeam, matchInfo, handleSwitchTeam }: Props) => {
  return (
    <div>
      <MatchInfo matchInfo={matchInfo} />
      <div>
        <BackEditBtn matchId={matchInfo._id} />
        <TeamButtons matchInfo={matchInfo} handleSwitchTeam={handleSwitchTeam} />
      </div>
      <BoxScore id={id} selectedTeam={selectedTeam} />
    </div>
  );
};

export default Completed;
