import { PlayerResultsType, BoxType, SinglePlayerResultsType, SinglePlayerBoxType, PlayByPlayType } from './types';
import { defaultPlayerResults, defaultStats, statsNames } from './constants';
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

export const getPlayerResultsByPlays = (
  plays: PlayByPlayType[],
  newPBP: { playId: string; team: string; desc: string }[],
): PlayerResultsType => {
  const stats = plays.reduce((acc, cur) => {
    switch (cur.statType) {
      case 'offensiveRebound':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (off: ${acc.oRebounds + 1}, def:${acc.dRebounds})`,
        });
        return {
          ...acc,
          oRebounds: acc.oRebounds + 1,
          positions: acc.positions - 1,
        };
      case 'defensiveRebound':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (off: ${acc.oRebounds}, def:${acc.dRebounds + 1})`,
        });
        return {
          ...acc,
          dRebounds: acc.dRebounds + 1,
        };
      case 'offensiveFoul':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (fouls: ${acc.fouls + 1}, turnovers: ${
            acc.turnovers + 1
          })`,
        });
        return {
          ...acc,
          fouls: acc.fouls + 1,
          turnovers: acc.turnovers + 1,
        };
      case 'defensiveFoul':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: ${acc.fouls + 1}`,
        });
        return {
          ...acc,
          fouls: acc.fouls + 1,
        };
      case 'assists':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: ${acc.assists + 1}`,
        });
        return {
          ...acc,
          assists: acc.assists + 1,
        };
      case 'turnovers':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: ${acc.turnovers + 1}`,
        });
        return {
          ...acc,
          turnovers: acc.turnovers + 1,
          positions: acc.positions + 1,
        };
      case 'twoPointsMade':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (FG: ${acc.twoMades + acc.threeMades + 1} / ${
            acc.twoAttempts + acc.threeAttempts + 1
          } Points: ${acc.points + 2})`,
        });
        return {
          ...acc,
          twoMades: acc.twoMades + 1,
          twoAttempts: acc.twoAttempts + 1,
          points: acc.points + 2,
          positions: acc.positions + 1,
        };
      case 'threePointsMade':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (3PT: ${acc.threeMades + 1} / ${
            acc.threeAttempts + 1
          } Points: ${acc.points + 3})`,
        });
        return {
          ...acc,
          threeMades: acc.threeMades + 1,
          threeAttempts: acc.threeAttempts + 1,
          points: acc.points + 3,
          positions: acc.positions + 1,
        };
      case 'freeThrowMade':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (FT: ${acc.ftMades + 1} / ${
            acc.ftAttempts + 1
          } Points: ${acc.points + 1})`,
        });
        return {
          ...acc,
          ftMades: acc.ftMades + 1,
          ftAttempts: acc.ftAttempts + 1,
          points: acc.points + 1,
        };
      case 'twoPointsMiss':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (FG: ${acc.twoMades + acc.threeMades} / ${
            acc.twoAttempts + acc.threeAttempts + 1
          })`,
        });
        return {
          ...acc,
          twoAttempts: acc.twoAttempts + 1,
          positions: acc.positions + 1,
        };
      case 'threePointsMiss':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (3PT: ${acc.threeMades} / ${acc.threeAttempts + 1})`,
        });
        return {
          ...acc,
          threeAttempts: acc.threeAttempts + 1,
          positions: acc.positions + 1,
        };
      case 'freeThrowMiss':
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: (FT: ${acc.ftMades} / ${acc.ftAttempts + 1})`,
        });
        return {
          ...acc,
          ftAttempts: acc.ftAttempts + 1,
        };
      case 'block': {
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: ${acc.blocks + 1}`,
        });
        return {
          ...acc,
          blocks: acc.blocks + 1,
        };
      }
      case 'steal': {
        newPBP.push({
          playId: cur._id,
          team: cur.team.name,
          desc: `${cur.player.name} ${statsNames[cur.statType]}: ${acc.steals + 1}`,
        });
        return {
          ...acc,
          steals: acc.steals + 1,
        };
      }
      default:
        throw new Error(`Unknown statType: ${cur.statType}`);
    }
  }, defaultStats);

  return {
    ...stats,
    _id: '',
    matchId: plays[0].matchId,
    playerId: plays[0].playerId,
    teamId: plays[0].teamId,
    opponentTeamId: plays[0].opponentTeamId,
    player: plays[0].player,
    minutes: 0,
  };
};

export const formatDate = (date: Date): string => {
  const year = `${date.getFullYear()}`.slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [month, day, year].join('/');
};
