import { useState } from 'react';
import styled from 'styled-components';
import { usePlayByPlays } from '../../hooks/useAPI';
import usePlayerResultsByPlays from '../../hooks/usePlayerResultsByPlays';
import { PlayByPlayType, PlayerType, MatchInfoType } from '../../types';
import { quarterNames } from '../../constants';
import EditPlay from './EditPlay';

const StyledTable = styled.table`
  margin: auto;
`;

const StyledButton = styled.button<{ active: boolean }>`
  border: none;
  background-color: white;

  color: ${(props): string => (props.active ? 'red' : 'black')};
  border-bottom: ${(props): string => (props.active ? '1px solid red' : 'none')};

  cursor: pointer;
  outline: none;
`;

interface Props {
  matchInfo: MatchInfoType;
  players: PlayerType[];
}

const PlayByPlaysWrapper: React.FC<Props> = ({ matchInfo, players }: Props) => {
  const { isLoading, error, playByPlays } = usePlayByPlays(matchInfo._id);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!playByPlays) return <div>目前無資料</div>;

  return <PlayByPlays matchInfo={matchInfo} playByPlays={playByPlays} players={players} />;
};

const PlayByPlays: React.FC<{ matchInfo: MatchInfoType; playByPlays: PlayByPlayType[]; players: PlayerType[] }> = ({
  matchInfo,
  playByPlays,
  players,
}: {
  matchInfo: MatchInfoType;
  playByPlays: PlayByPlayType[];
  players: PlayerType[];
}) => {
  const [selectedQuarter, setSelectedQuarter] = useState('first');
  const resolvedPlayByPlays = playByPlays.filter((play) => play.quarter === selectedQuarter);
  const { playsWithDesc } = usePlayerResultsByPlays(playByPlays);

  const handleSelectQuarter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setSelectedQuarter(event.currentTarget.value);

  return (
    <div>
      <div>
        {Object.keys(quarterNames).map((quarter) => (
          <StyledButton
            key={`update-play-quarter-selector-${quarter}`}
            value={quarter}
            onClick={handleSelectQuarter}
            active={selectedQuarter === quarter}
          >
            {quarterNames[quarter]}
          </StyledButton>
        ))}
      </div>
      <StyledTable>
        <thead>
          <tr>
            <th>{`${matchInfo.homeTeam.name}`}</th>
            <th>更新/刪除</th>
            <th>{`${matchInfo.awayTeam.name}`}</th>
          </tr>
        </thead>
        <tbody>
          {resolvedPlayByPlays.reverse().map((play) => (
            <EditPlay
              key={`play-by-play-${play._id}-view`}
              play={play}
              players={players}
              playsWithDesc={playsWithDesc}
              teamSide={play.teamId === matchInfo.homeTeam._id ? 'home' : 'away'}
            />
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default PlayByPlaysWrapper;
