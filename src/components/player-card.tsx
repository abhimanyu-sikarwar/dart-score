'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    <Card
      className={cn(
        'transition-all',
        isCurrentPlayer && 'ring-2 ring-primary',
        isWinner && 'bg-green-50 dark:bg-green-950 ring-2 ring-green-500'
      )}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
            <span className="font-semibold text-base sm:text-lg truncate">{player.name}</span>
            {isCurrentPlayer && !isWinner && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 py-0 flex-shrink-0">
                Now
              </Badge>
            )}
            {isWinner && (
              <Badge className="bg-green-500 text-white text-[10px] sm:text-xs px-1.5 py-0 flex-shrink-0">
                Winner!
              </Badge>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div
              className={cn(
                'text-2xl sm:text-3xl font-bold tabular-nums',
                mode !== 'cricket' && displayScore <= 50 && 'text-orange-500',
                mode !== 'cricket' && displayScore <= 20 && 'text-red-500'
              )}
            >
              {displayScore}
            </div>
            {lastTurn && (
              <div className="text-xs sm:text-sm text-muted-foreground">
                Last: {lastTurn.isBust ? 'BUST' : lastTurn.totalScore}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
