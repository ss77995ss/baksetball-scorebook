import { PlayerResultsType, BoxType, SinglePlayerResultsType, SinglePlayerBoxType } from './types';
import { defaultPlayerResults } from './constants';
import { append } from 'ramda';

export const getSinglePlayerBoxScore = (playerResults: SinglePlayerResultsType[]): SinglePlayerBoxType[] => {
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
    } = result;
    const ppp = positions ? points / positions : 0;
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
      matchType: result.match.type || '',
      matchDate: {
        id: result.match._id,
        date: formatDate(new Date(result.match.date)),
      },
      opponentName: result.opponentTeam.name,
      ppp: ppp.toFixed(3),
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
      minutes: result.minutes.toFixed(1),
      gameScore: gameScore.toFixed(1),
      positions: result.positions,
    };
  });
};

export const getBoxScore = (playerResults: PlayerResultsType[]): BoxType[] => {
  const total = getTotal(playerResults);
  const resolvedResults = append(total, playerResults);
  return resolvedResults.map((result) => {
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
    const ppp = positions ? points / positions : 0;
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
      ppp: ppp.toFixed(3),
      positionRate: total.positions > 0 ? `${((positions / total.positions) * 100).toFixed(1)}%` : '0%',
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
      minutes: result.minutes.toFixed(1),
      gameScore: gameScore.toFixed(1),
      positions: result.positions,
    };
  });
};

export const getTotal = (playerResults: PlayerResultsType[]): PlayerResultsType => {
  return playerResults.reduce(
    (acc, cur) => {
      return {
        ...acc,
        points: acc.points + cur.points,
        positions: acc.positions + cur.positions,
        twoMades: acc.twoMades + cur.twoMades,
        twoAttempts: acc.twoAttempts + cur.twoAttempts,
        threeMades: acc.threeMades + cur.threeMades,
        threeAttempts: acc.threeAttempts + cur.threeAttempts,
        oRebounds: acc.oRebounds + cur.oRebounds,
        dRebounds: acc.dRebounds + cur.dRebounds,
        assists: acc.assists + cur.assists,
        steals: acc.steals + cur.steals,
        blocks: acc.blocks + cur.blocks,
        ftAttempts: acc.ftAttempts + cur.ftAttempts,
        ftMades: acc.ftMades + cur.ftMades,
        turnovers: acc.turnovers + cur.turnovers,
        fouls: acc.fouls + cur.fouls,
        minutes: acc.minutes + cur.minutes,
      };
    },
    {
      ...defaultPlayerResults,
      player: {
        _id: '',
        name: '',
        number: 'total',
        teamId: '',
      },
    },
  );
};

export const getSinglePlayerTotal = (playerResults: SinglePlayerResultsType[]): SinglePlayerResultsType => {
  return playerResults.reduce(
    (acc, cur) => {
      return {
        ...acc,
        points: acc.points + cur.points,
        positions: acc.positions + cur.positions,
        twoMades: acc.twoMades + cur.twoMades,
        twoAttempts: acc.twoAttempts + cur.twoAttempts,
        threeMades: acc.threeMades + cur.threeMades,
        threeAttempts: acc.threeAttempts + cur.threeAttempts,
        oRebounds: acc.oRebounds + cur.oRebounds,
        dRebounds: acc.dRebounds + cur.dRebounds,
        assists: acc.assists + cur.assists,
        steals: acc.steals + cur.steals,
        blocks: acc.blocks + cur.blocks,
        ftAttempts: acc.ftAttempts + cur.ftAttempts,
        ftMades: acc.ftMades + cur.ftMades,
        turnovers: acc.turnovers + cur.turnovers,
        fouls: acc.fouls + cur.fouls,
        minutes: acc.minutes + cur.minutes,
      };
    },
    {
      ...defaultPlayerResults,
      match: {
        _id: '',
        name: '',
        type: '',
        homeTeamId: '',
        awayTeamId: '',
        date: new Date(),
      },
      opponentTeam: {
        _id: '',
        name: '',
      },
    },
  );
};

export const getAverage = (playerResults: SinglePlayerResultsType, matchCount: number): SinglePlayerResultsType => {
  return {
    ...playerResults,
    points: playerResults.points / matchCount,
    positions: playerResults.positions / matchCount,
    twoMades: playerResults.twoMades / matchCount,
    twoAttempts: playerResults.twoAttempts / matchCount,
    threeMades: playerResults.threeMades / matchCount,
    threeAttempts: playerResults.threeAttempts / matchCount,
    oRebounds: playerResults.oRebounds / matchCount,
    dRebounds: playerResults.dRebounds / matchCount,
    assists: playerResults.assists / matchCount,
    steals: playerResults.steals / matchCount,
    blocks: playerResults.blocks / matchCount,
    ftAttempts: playerResults.ftAttempts / matchCount,
    ftMades: playerResults.ftMades / matchCount,
    turnovers: playerResults.turnovers / matchCount,
    fouls: playerResults.fouls / matchCount,
    minutes: playerResults.minutes / matchCount,
  };
};

export const formatDate = (date: Date): string => {
  const year = `${date.getFullYear()}`.slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [month, day, year].join('/');
};
