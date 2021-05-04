import { useQuery } from 'react-query';
import { TeamType, PlayerType, MatchInfoType, PlayerResultsType } from '../types';

function useTeams(): { isLoading: boolean; error: unknown; teams: TeamType[] | undefined } {
  const { isLoading, error, data: teams } = useQuery<TeamType[]>('teams', () =>
    fetch(`http://localhost:8080/teams`).then((res) => res.json()),
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
    () => fetch(`http://localhost:8080/players/?teamId=${teamId}`).then((res) => res.json()),
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

function useMatchInfo(matchId: string): { isLoading: boolean; error: unknown; matchInfo: MatchInfoType | undefined } {
  const { isLoading, error, data: matchInfo } = useQuery<MatchInfoType[]>(
    ['matches', matchId],
    () => fetch(`http://localhost:8080/matches/?matchId=${matchId}`).then((res) => res.json()),
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
    () =>
      fetch(`http://localhost:8080/playerResults/match?matchId=${matchId}&teamId=${teamId}`).then((res) => res.json()),
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

export { useTeams, usePlayers, useMatchInfo, usePlayerResultsByTeam };
