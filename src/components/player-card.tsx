'use client';

import { Player, GameMode } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  player: Player;
  isCurrentPlayer: boolean;
  isWinner: boolean;
  mode: GameMode;
  pendingScore?: number;
}

export function PlayerCard({
  player,
  isCurrentPlayer,
  isWinner,
  mode,
  pendingScore = 0,
}: PlayerCardProps) {
  const lastTurn = player.turns[player.turns.length - 1];

  const displayScore =
    mode === 'cricket'
      ? player.score
      : isCurrentPlayer
      ? player.score - pendingScore
      : player.score;

  return (
    <div
      className={cn(
        'rounded-xl border transition-all p-4',
        isCurrentPlayer && !isWinner && 'bg-primary/10 border-primary/50 shadow-lg shadow-primary/10',
        !isCurrentPlayer && !isWinner && 'bg-card border-border',
        isWinner && 'bg-green-500/10 border-green-500/50 shadow-lg shadow-green-500/10'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Player avatar/indicator */}
          <div
            className={cn(
              'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0',
              isCurrentPlayer && !isWinner && 'bg-primary text-primary-foreground',
              !isCurrentPlayer && !isWinner && 'bg-secondary text-muted-foreground',
              isWinner && 'bg-green-500 text-white'
            )}
          >
            {player.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base sm:text-lg truncate">{player.name}</span>
              {isCurrentPlayer && !isWinner && (
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium flex-shrink-0">
                  Throwing
                </span>
              )}
              {isWinner && (
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium flex-shrink-0">
                  Winner!
                </span>
              )}
            </div>
            {lastTurn && (
              <div className="text-xs sm:text-sm text-muted-foreground">
                Last: {lastTurn.isBust ? (
                  <span className="text-red-400">BUST</span>
                ) : (
                  <span className="text-primary">{lastTurn.totalScore}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div
            className={cn(
              'text-3xl sm:text-4xl font-bold tabular-nums',
              mode !== 'cricket' && displayScore <= 50 && displayScore > 20 && 'text-yellow-400',
              mode !== 'cricket' && displayScore <= 20 && 'text-primary',
              isWinner && 'text-green-400',
              !isWinner && mode === 'cricket' && 'text-foreground',
              !isWinner && mode !== 'cricket' && displayScore > 50 && 'text-foreground'
            )}
          >
            {displayScore}
          </div>
        </div>
      </div>
    </div>
  );
}
