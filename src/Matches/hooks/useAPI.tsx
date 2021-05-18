import { useQuery } from 'react-query';
import {
  TeamType,
  PlayerType,
  MatchInfoType,
  PlayerResultsType,
  SinglePlayerResultsType,
  MatchCategoryType,
} from '../types';
import { API_DOMAIN } from '../constants';

function useTeams(): { isLoading: boolean; error: unknown; teams: TeamType[] | undefined } {
  const { isLoading, error, data: teams } = useQuery<TeamType[]>('teams', () =>
    fetch(`${API_DOMAIN}/teams`).then((res) => res.json()),
  );

  return {
    isLoading,
    error,
    teams,
  };
}

function usePlayers(teamId: string): { isLoading: boolean; error: unknown; players: PlayerType[] } {
  const { isLoading, error, data: players } = useQuery<PlayerType[]>(
    ['players', teamId],
    () => fetch(`${API_DOMAIN}/players/?teamId=${teamId}`).then((res) => res.json()),
    {
      enabled: !!teamId,
    },
  );

  return {
    isLoading,
    error,
    players: players || [],
  };
}

function usePlayerInfo(playerId: string): { isLoading: boolean; error: unknown; playerInfo: PlayerType | undefined } {
  const { isLoading, error, data: playerInfo } = useQuery<PlayerType>(
    ['playerInfo', playerId],
    () => fetch(`${API_DOMAIN}/players/?playerId=${playerId}`).then((res) => res.json()),
    {
      enabled: !!playerId,
    },
  );

  return {
    isLoading,
    error,
    playerInfo: playerInfo,
  };
}

function useMatchInfo(matchId: string): { isLoading: boolean; error: unknown; matchInfo: MatchInfoType | undefined } {
  const { isLoading, error, data: matchInfo } = useQuery<MatchInfoType[]>(
    ['matches', matchId],
    () => fetch(`${API_DOMAIN}/matches/?matchId=${matchId}`).then((res) => res.json()),
    {
      enabled: !!matchId,
    },
  );

  return {
    isLoading,
    error,
    matchInfo: matchInfo ? matchInfo[0] : undefined,
  };
}

function usePlayerResultsByTeam(
  matchId: string,
  teamId: string,
): { isLoading: boolean; error: unknown; playerResults: PlayerResultsType[] | undefined } {
  const { isLoading, error, data: playerResults } = useQuery<PlayerResultsType[]>(
    ['playerResultsByTeam', teamId],
    () => fetch(`${API_DOMAIN}/playerResults/match?matchId=${matchId}&teamId=${teamId}`).then((res) => res.json()),
    {
      enabled: !!teamId,
    },
  );

  return {
    isLoading,
    error,
    playerResults: playerResults ? playerResults : [],
  };
}

function usePlayerResultsByPlayer(
  playerId: string,
): { isLoading: boolean; error: unknown; playerResults: SinglePlayerResultsType[] | undefined } {
  const { isLoading, error, data: playerResults } = useQuery<SinglePlayerResultsType[]>(
    ['playerResultsByPlayer', playerId],
    () => fetch(`${API_DOMAIN}/playerResults/player/?playerId=${playerId}`).then((res) => res.json()),
    {
      enabled: !!playerId,
    },
  );

  return {
    isLoading,
    error,
    playerResults: playerResults ? playerResults : [],
  };
}

function useMatchTypes(): { isLoading: boolean; error: unknown; matchTypes: MatchCategoryType[] | undefined } {
  const { isLoading, error, data: matchTypes } = useQuery<MatchCategoryType[]>('matchType', () =>
    fetch(`${API_DOMAIN}/matchTypes`).then((res) => res.json()),
  );

  return {
    isLoading,
    error,
    matchTypes: matchTypes ? matchTypes : [],
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
};
