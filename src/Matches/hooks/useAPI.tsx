import { useQuery } from 'react-query';
import {
  TeamType,
  PlayerType,
  MatchInfoType,
  PlayerResultsType,
  SinglePlayerResultsType,
  MatchCategoryType,
  PlayByPlayType,
} from '../types';
import { API_DOMAIN } from '../constants';

function useTeams(): { isLoading: boolean; isFetching: boolean; error: unknown; teams: TeamType[] | undefined } {
  const { isLoading, isFetching, error, data: teams } = useQuery<TeamType[]>('teams', () =>
    fetch(`${API_DOMAIN}/teams`).then((res) => res.json()),
  );

  return {
    isLoading,
    isFetching,
    error,
    teams,
  };
}

function usePlayers(
  teamId: string,
): { isLoading: boolean; isFetching: boolean; error: unknown; players: PlayerType[] } {
  const { isLoading, isFetching, error, data: players } = useQuery<PlayerType[]>(
    ['players', teamId],
    () => fetch(`${API_DOMAIN}/players/?teamId=${teamId}`).then((res) => res.json()),
    {
      enabled: !!teamId,
    },
  );

  return {
    isLoading,
    isFetching,
    error,
    players: players || [],
  };
}

function usePlayerInfo(
  playerId: string,
): { isLoading: boolean; isFetching: boolean; error: unknown; playerInfo: PlayerType | undefined } {
  const { isLoading, isFetching, error, data: playerInfo } = useQuery<PlayerType>(
    ['playerInfo', playerId],
    () => fetch(`${API_DOMAIN}/players/?playerId=${playerId}`).then((res) => res.json()),
    {
      enabled: !!playerId,
    },
  );

  return {
    isLoading,
    isFetching,
    error,
    playerInfo: playerInfo,
  };
}

function useMatchInfo(
  matchId: string,
): { isLoading: boolean; isFetching: boolean; error: unknown; matchInfo: MatchInfoType | undefined } {
  const { isLoading, isFetching, error, data: matchInfo } = useQuery<MatchInfoType[]>(
    ['matches', matchId],
    () => fetch(`${API_DOMAIN}/matches/?matchId=${matchId}`).then((res) => res.json()),
    {
      enabled: !!matchId,
    },
  );

  return {
    isLoading,
    isFetching,
    error,
    matchInfo: matchInfo ? matchInfo[0] : undefined,
  };
}

function usePlayerResultsByTeam(
  matchId: string,
  teamId: string,
): { isLoading: boolean; isFetching: boolean; error: unknown; playerResults: PlayerResultsType[] | undefined } {
  const { isLoading, isFetching, error, data: playerResults } = useQuery<PlayerResultsType[]>(
    ['playerResultsByTeam', teamId],
    () => fetch(`${API_DOMAIN}/playerResults/match?matchId=${matchId}&teamId=${teamId}`).then((res) => res.json()),
    {
      enabled: !!teamId,
    },
  );

  return {
    isLoading,
    isFetching,
    error,
    playerResults: playerResults ? playerResults : [],
  };
}

function usePlayerResultsByPlayer(
  playerId: string,
): { isLoading: boolean; isFetching: boolean; error: unknown; playerResults: SinglePlayerResultsType[] | undefined } {
  const { isLoading, isFetching, error, data: playerResults } = useQuery<SinglePlayerResultsType[]>(
    ['playerResultsByPlayer', playerId],
    () => fetch(`${API_DOMAIN}/playerResults/player?playerId=${playerId}`).then((res) => res.json()),
    {
      enabled: !!playerId,
    },
  );

  return {
    isLoading,
    isFetching,
    error,
    playerResults: playerResults ? playerResults : [],
  };
}

function useMatchTypes(): {
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  matchTypes: MatchCategoryType[] | undefined;
} {
  const { isLoading, isFetching, error, data: matchTypes } = useQuery<MatchCategoryType[]>('matchType', () =>
    fetch(`${API_DOMAIN}/matchTypes`).then((res) => res.json()),
  );

  return {
    isLoading,
    isFetching,
    error,
    matchTypes: matchTypes ? matchTypes : [],
  };
}

function usePlayByPlays(
  matchId: string,
): { isLoading: boolean; isFetching: boolean; error: unknown; playByPlays: PlayByPlayType[] | undefined } {
  const { isLoading, isFetching, error, data: playByPlays } = useQuery<PlayByPlayType[]>(['playByPlays', matchId], () =>
    fetch(`${API_DOMAIN}/playByPlays?matchId=${matchId}`).then((res) => res.json()),
  );
  return {
    isLoading,
    isFetching,
    error,
    playByPlays: playByPlays ? playByPlays : [],
  };
}

function usePlayersByTeams(
  home: string,
  away: string,
): { isLoading: boolean; isFetching: boolean; error: unknown; players: PlayerType[] } {
  const { isLoading, isFetching, error, data: players } = useQuery<PlayerType[]>(
    ['players', home, away],
    () => fetch(`${API_DOMAIN}/players/?home=${home}&away=${away}`).then((res) => res.json()),
    {
      enabled: !!home && !!away,
    },
  );

  return {
    isLoading,
    isFetching,
    error,
    players: players || [],
  };
}

export {
  useTeams,
  usePlayers,
  usePlayerInfo,
  useMatchInfo,
  usePlayerResultsByTeam,
  usePlayerResultsByPlayer,
  useMatchTypes,
  usePlayByPlays,
  usePlayersByTeams,
};
