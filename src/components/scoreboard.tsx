'use client';

import { Player, GameMode, DartThrow } from '@/lib/types';
import { PlayerCard } from './player-card';
import { calculateTurnScore } from '@/lib/game-logic';

interface ScoreboardProps {
  players: Player[];
  currentPlayerIndex: number;
  winnerId?: string;
  mode: GameMode;
  currentTurn: DartThrow[];
  pendingSegment?: number | null;
}

export function Scoreboard({
  players,
  currentPlayerIndex,
  winnerId,
  mode,
  currentTurn,
  pendingSegment,
}: ScoreboardProps) {
  const pendingScore = calculateTurnScore(currentTurn) + (pendingSegment ?? 0);

  return (
    <div className="space-y-3 p-3 sm:p-4">
      {players.map((player, index) => (
        <PlayerCard
          key={player.id}
          player={player}
          isCurrentPlayer={index === currentPlayerIndex}
          isWinner={player.id === winnerId}
          mode={mode}
          pendingScore={index === currentPlayerIndex ? pendingScore : 0}
        />
      ))}
    </div>
  );
}
