export type GameMode = '501' | '301' | 'cricket';

export type Multiplier = 'single' | 'double' | 'triple';

export interface DartThrow {
  segment: number; // 0-20, 25 for bull
  multiplier: Multiplier;
  score: number;
}

export interface Turn {
  playerId: string;
  darts: DartThrow[];
  totalScore: number;
  isBust?: boolean; // For 501/301 - went below 0 or didn't finish on double
}

export interface CricketMarks {
  15: number;
  16: number;
  17: number;
  18: number;
  19: number;
  20: number;
  25: number; // Bull
}

export interface Player {
  id: string;
  name: string;
  score: number; // For 501/301: remaining score. For Cricket: points scored
  cricketMarks?: CricketMarks;
  turns: Turn[];
}

export interface GameState {
  mode: GameMode;
  startingScore: number; // 501 or 301 for countdown modes
  players: Player[];
  currentPlayerIndex: number;
  currentTurn: DartThrow[];
  isGameOver: boolean;
  winnerId?: string;
}

export type GameAction =
  | { type: 'ADD_DART'; dart: DartThrow }
  | { type: 'REMOVE_LAST_DART' }
  | { type: 'SUBMIT_TURN' }
  | { type: 'UNDO_TURN' }
  | { type: 'NEW_GAME'; mode: GameMode; players: string[]; startingScore?: number }
  | { type: 'RESET_GAME' };

export const CRICKET_NUMBERS = [15, 16, 17, 18, 19, 20, 25] as const;

export const INITIAL_CRICKET_MARKS: CricketMarks = {
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  25: 0,
};
