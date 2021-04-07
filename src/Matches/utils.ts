import { PlayerResultsType, BoxType } from './types';

export const getBoxScore = (playerResults: PlayerResultsType[]): BoxType[] => {
  return playerResults.map((result) => {
    const {
      points,
      positions,
      twoMades,
      twoAttempts,
      threeMades,
      threeAttempts,
      oRebounds,
      dRebounds,
      assists,
      steals,
      blocks,
      ftAttempts,
      ftMades,
      turnovers,
      fouls,
      player,
    } = result;
    const ppp = points / positions;
    const fgMade = twoMades + threeMades;
    const fgAttempts = twoAttempts + threeAttempts;
    const totalRebounds = oRebounds + dRebounds;
    const gameScore =
      points +
      0.7 * oRebounds +
      0.3 * dRebounds +
      0.7 * assists +
      steals +
      0.7 * blocks +
      0.4 * fgMade -
      0.7 * fgAttempts -
      0.4 * (ftAttempts - ftMades) -
      turnovers -
      0.4 * fouls;

    return {
      playerNumber: player.number,
      playerName: {
        id: player._id,
        name: player.name,
      },
      ppp: parseFloat(ppp.toFixed(3)),
      positionRate: 0,
      points,
      rebounds: {
        offensive: oRebounds,
        defensive: dRebounds,
        total: totalRebounds,
      },
      assists,
      turnovers,
      fieldGoal: {
        made: fgMade,
        attempts: fgAttempts,
        percentage: fgAttempts > 0 ? `${Math.round((fgMade / fgAttempts) * 100)}%` : '0%',
      },
      threePoints: {
        made: threeMades,
        attempts: threeAttempts,
        percentage: threeAttempts > 0 ? `${Math.round((threeMades / threeAttempts) * 100)}%` : '0%',
      },
      freeThrows: {
        made: ftMades,
        attempts: ftAttempts,
        percentage: ftAttempts > 0 ? `${Math.round((ftMades / ftAttempts) * 100)}%` : '0%',
      },
      steals,
      blocks,
      fouls,
      minutes: result.minutes,
      gameScore: parseFloat(gameScore.toFixed(1)),
      positions: result.positions,
    };
  });
};
