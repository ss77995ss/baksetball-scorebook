import { groupBy } from 'ramda';
import { PlayByPlayType, PlayerResultsType } from '../types';
import { getPlayerResultsByPlays } from '../utils';

const groupPlaysByPlayers = groupBy((play: PlayByPlayType) => play.playerId);

const usePlayerResultsByPlays = (
  playByPlays: PlayByPlayType[],
): {
  playerResults: PlayerResultsType[];
  playsWithDesc: {
    playId: string;
    team: string;
    desc: string;
  }[];
} => {
  const playsWithDesc: { playId: string; team: string; desc: string }[] = [];
  const playerResults = Object.values(groupPlaysByPlayers(playByPlays)).map((value) => {
    return getPlayerResultsByPlays(value, playsWithDesc);
  });

  return {
    playerResults,
    playsWithDesc,
  };
};

export default usePlayerResultsByPlays;
