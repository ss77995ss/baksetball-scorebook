import { useState } from 'react';
import { usePlayByPlays } from '../../hooks/useAPI';
import { quarterNames } from '../../constants';
import { PlayByPlayType, PlayerType } from '../../types';
import EditPlay from './EditPlay';

interface Props {
  matchId: string;
  players: PlayerType[];
}

const PlayByPlaysWrapper: React.FC<Props> = ({ matchId, players }: Props) => {
  const { isLoading, error, playByPlays } = usePlayByPlays(matchId);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!playByPlays) return <div>目前無資料</div>;

  return <PlayByPlays playByPlays={playByPlays} players={players} />;
};

const PlayByPlays: React.FC<{ playByPlays: PlayByPlayType[]; players: PlayerType[] }> = ({
  playByPlays,
  players,
}: {
  playByPlays: PlayByPlayType[];
  players: PlayerType[];
}) => {
  const [selectedQuarter, setSelectedQuarter] = useState('first');
  const resolvedPlayByPlays = playByPlays.filter((play) => play.quarter === selectedQuarter);

  const handleSelectQuarter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setSelectedQuarter(event.currentTarget.value);

  return (
    <div>
      <div>
        {Object.keys(quarterNames).map((quarter) => (
          <button key={`update-play-quarter-selector-${quarter}`} value={quarter} onClick={handleSelectQuarter}>
            {quarterNames[quarter]}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>隊伍</th>
            <th>球員</th>
            <th>數據</th>
            <th>更新/刪除</th>
          </tr>
        </thead>
        <tbody>
          {resolvedPlayByPlays.map((play) => (
            <EditPlay key={`play-by-play-${play._id}-view`} play={play} players={players} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayByPlaysWrapper;
