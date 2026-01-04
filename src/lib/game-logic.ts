import {
  DartThrow,
  Multiplier,
  Player,
  GameState,
  CricketMarks,
  CRICKET_NUMBERS,
  INITIAL_CRICKET_MARKS,
  Turn,
} from './types';

export function calculateDartScore(segment: number, multiplier: Multiplier): number {
  if (segment === 0) return 0; // Miss
  if (segment === 25) {
    // Bull: single = 25, double = 50, triple not possible
    return multiplier === 'double' ? 50 : 25;
  }
  const multiplierValue = multiplier === 'single' ? 1 : multiplier === 'double' ? 2 : 3;
  return segment * multiplierValue;
}

export function createDartThrow(segment: number, multiplier: Multiplier): DartThrow {
  return {
    segment,
    multiplier,
    score: calculateDartScore(segment, multiplier),
  };
}

export function calculateTurnScore(darts: DartThrow[]): number {
  return darts.reduce((sum, dart) => sum + dart.score, 0);
}

// 501/301 game logic
export function checkBust(currentScore: number, turnScore: number, lastDart: DartThrow): boolean {
  const newScore = currentScore - turnScore;

  // Bust if score goes below 0
  if (newScore < 0) return true;

  // Bust if score is exactly 1 (impossible to finish - need double)
  if (newScore === 1) return true;

  // Bust if score is 0 but didn't finish on a double
  if (newScore === 0 && lastDart.multiplier !== 'double') return true;

  return false;
}

export function checkCountdownWin(currentScore: number, turnScore: number, lastDart: DartThrow): boolean {
  const newScore = currentScore - turnScore;
  return newScore === 0 && lastDart.multiplier === 'double';
}

// Cricket game logic
export function updateCricketMarks(
  marks: CricketMarks,
  dart: DartThrow,
  allPlayers: Player[],
  currentPlayerId: string
): { newMarks: CricketMarks; pointsScored: number } {
  const segment = dart.segment;

  // Only 15-20 and bull count in cricket
  if (!CRICKET_NUMBERS.includes(segment as typeof CRICKET_NUMBERS[number])) {
    return { newMarks: marks, pointsScored: 0 };
  }

  const key = segment as keyof CricketMarks;
  const hitsToAdd = dart.multiplier === 'single' ? 1 : dart.multiplier === 'double' ? 2 : 3;
  const currentMarks = marks[key];
  const newMarkCount = Math.min(currentMarks + hitsToAdd, 3); // Cap at 3 marks

  let pointsScored = 0;

  // Check if this number is closed by all other players
  const isClosedByOthers = allPlayers
    .filter(p => p.id !== currentPlayerId)
    .every(p => (p.cricketMarks?.[key] ?? 0) >= 3);

  // Only score points if we have 3+ marks AND others haven't closed
  if (currentMarks >= 3 && !isClosedByOthers) {
    // All hits count as points
    pointsScored = dart.score;
  } else if (currentMarks < 3 && currentMarks + hitsToAdd > 3 && !isClosedByOthers) {
    // Some marks close us, rest become points
    const marksUsedToClose = 3 - currentMarks;
    const hitsForPoints = hitsToAdd - marksUsedToClose;
    const pointValue = segment === 25 ? 25 : segment;
    pointsScored = pointValue * hitsForPoints;
  }

  return {
    newMarks: { ...marks, [key]: newMarkCount },
    pointsScored,
  };
}

export function checkCricketWin(players: Player[]): string | null {
  for (const player of players) {
    if (!player.cricketMarks) continue;

    // Check if player has closed all numbers
    const allClosed = CRICKET_NUMBERS.every(num => player.cricketMarks![num] >= 3);

    if (allClosed) {
      // Check if player has highest or tied highest score
      const maxScore = Math.max(...players.map(p => p.score));
      if (player.score >= maxScore) {
        return player.id;
      }
    }
  }
  return null;
}

export function createInitialPlayer(id: string, name: string, mode: string, startingScore: number): Player {
  const player: Player = {
    id,
    name,
    score: mode === 'cricket' ? 0 : startingScore,
    turns: [],
  };

  if (mode === 'cricket') {
    player.cricketMarks = { ...INITIAL_CRICKET_MARKS };
  }

  return player;
}

export function createTurn(playerId: string, darts: DartThrow[], isBust?: boolean): Turn {
  return {
    playerId,
    darts: [...darts],
    totalScore: calculateTurnScore(darts),
    isBust,
  };
}

export function getNextPlayerIndex(currentIndex: number, totalPlayers: number): number {
  return (currentIndex + 1) % totalPlayers;
}

export function generatePlayerId(): string {
  return Math.random().toString(36).substring(2, 9);
}
