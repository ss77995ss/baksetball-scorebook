import { useState, Fragment } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { PlayByPlayType, PlayerType } from '../../types';
import { API_DOMAIN, statsCategories, statsNames } from '../../constants';
import DeleteButton from './DeleteButton';

interface Props {
  play: PlayByPlayType;
  players: PlayerType[];
}

const getStat = (statType: string) => {
  switch (statType) {
    case 'twoPointsMade':
    case 'twoPointsMiss':
    case 'threePointsMade':
    case 'threePointsMiss':
    case 'freeThrowMade':
    case 'freeThrowMiss':
      return {
        main: 'shot',
        sub: statType,
      };
    case 'offensiveRebound':
    case 'defensiveRebound':
      return {
        main: 'rebounds',
        sub: statType,
      };
    case 'steal':
    case 'block':
      return {
        main: 'defenses',
        sub: statType,
      };
    case 'offensiveFoul':
    case 'defensiveFoul':
      return {
        main: 'fouls',
        sub: statType,
      };
    default:
      return {
        main: statType,
        sub: '',
      };
  }
};

const getStatType = (main: string, sub: string) => {
  return main === 'assists' || main === 'turnovers' ? main : sub;
};

const EditPlay: React.FC<Props> = ({ play, players }: Props) => {
  const { main, sub } = getStat(play.statType);
  const queryClient = useQueryClient();
  const [isEditPlay, setIsEditPlay] = useState(false);
  const [selectedPlayer, setSelectedPlay] = useState(play.playerId);
  const [selectedMainStat, setSelectedMainStat] = useState(main);
  const [selectedSubStat, setSelectedSubStat] = useState(sub);
  const { isLoading, isError, mutate } = useMutation(
    (formData: { playId: string; playerId: string; statType: string }) =>
      fetch(`${API_DOMAIN}/playByPlays`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('playByPlays');
        setIsEditPlay(false);
        setSelectedMainStat(main);
        setSelectedSubStat(sub);
      },
    },
  );

  const handleSelectedPlayer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlay(event.target.value);
  };

  const handleSelectMainStat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMainStat(event.target.value);

    if (statsCategories[event.target.value].subStats) {
      setSelectedSubStat(Object.keys(statsCategories[event.target.value].subStats)[0]);
    } else {
      setSelectedSubStat('');
    }
  };

  const handleSelectSubStat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubStat(event.target.value);
  };

  const handeModeChange = (isEdit: boolean) => () => {
    setIsEditPlay(isEdit);
    setSelectedMainStat(main);
    setSelectedSubStat(sub);
  };

  const handleUpdate = () => {
    console.log({
      playId: play._id,
      playerId: selectedPlayer,
      statType: getStatType(selectedMainStat, selectedSubStat),
    });

    if (window.confirm(`更新${play.player.name} Play：${statsNames[play.statType]}？`)) {
      mutate({
        playId: play._id,
        playerId: selectedPlayer,
        statType: getStatType(selectedMainStat, selectedSubStat),
      });
    }
  };

  if (!isEditPlay)
    return (
      <tr>
        <td>{play.team.name}</td>
        <td>{play.player.name}</td>
        <td>{statsNames[play.statType]}</td>
        <td>
          <button onClick={handeModeChange(true)}>更新數據</button>
          <DeleteButton play={play} />
        </td>
      </tr>
    );

  return (
    <tr>
      <td>{play.team.name}</td>
      <td>
        <select value={selectedPlayer} onChange={handleSelectedPlayer}>
          {players
            .filter((player) => player.teamId === play.team._id)
            .map((player) => (
              <option key={`update-play-player-${player._id}`} value={player._id}>
                {player.name}
              </option>
            ))}
        </select>
      </td>
      <td>
        {Object.keys(statsCategories).map((stat, index) => {
          return (
            <>
              <input
                key={`update-play-stat-${stat}-${index}-${play._id}`}
                type="radio"
                id={`#update-play-stat-${stat}-radio-${index}-${play._id}`}
                value={stat}
                checked={selectedMainStat === stat}
                onChange={handleSelectMainStat}
              />
              <label htmlFor={`#update-play-stat-${stat}-radio-${index}-${play._id}`}>
                {statsCategories[stat].name}
              </label>
            </>
          );
        })}
        <div>
          {statsCategories[selectedMainStat].subStats &&
            Object.keys(statsCategories[selectedMainStat].subStats).map((stat, index) => {
              return (
                <Fragment key={`update-play-${selectedSubStat}-${stat}-${index}-${play._id}`}>
                  <input
                    id={`update-play-${selectedSubStat}-${stat}-${index}-${play._id}`}
                    type="radio"
                    value={stat}
                    checked={selectedSubStat === stat}
                    onChange={handleSelectSubStat}
                  />
                  <label htmlFor={`update-play-${selectedSubStat}-${stat}-${index}-${play._id}`}>
                    {statsCategories[selectedMainStat].subStats[stat]}
                  </label>
                </Fragment>
              );
            })}
        </div>
      </td>
      <td>
        <button onClick={handleUpdate} disabled={isLoading}>
          確認修改
        </button>
        <button onClick={handeModeChange(false)} disabled={isLoading}>
          取消
        </button>
        {isError && <div>Something went wrong</div>}
      </td>
    </tr>
  );
};

export default EditPlay;
