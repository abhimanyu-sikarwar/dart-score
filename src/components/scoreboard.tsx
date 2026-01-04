'use client';

import { useState, Fragment } from 'react';
import { Player, GameMode, DartThrow } from '@/lib/types';
import { calculateTurnScore } from '@/lib/game-logic';
import { cn } from '@/lib/utils';
import { CheckoutHint } from './checkout-hint';

interface ScoreboardProps {
  players: Player[];
  currentPlayerIndex: number;
  winnerId?: string;
  mode: GameMode;
  currentTurn: DartThrow[];
  pendingSegment?: number | null;
}

function formatDart(dart: DartThrow): string {
  if (dart.segment === 0) return 'Miss';
  if (dart.segment === 25) {
    return dart.multiplier === 'double' ? 'Bull' : '25';
  }
  const prefix = dart.multiplier === 'double' ? 'D' : dart.multiplier === 'triple' ? 'T' : '';
  return `${prefix}${dart.segment}`;
}

function ChevronIcon({ expanded, className }: { expanded: boolean; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('transition-transform', expanded && 'rotate-180', className)}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Scoreboard({
  players,
  currentPlayerIndex,
  winnerId,
  mode,
  currentTurn,
  pendingSegment,
}: ScoreboardProps) {
  const [expandedPlayerId, setExpandedPlayerId] = useState<string | null>(null);
  const pendingScore = calculateTurnScore(currentTurn) + (pendingSegment ?? 0);

  const toggleExpanded = (playerId: string) => {
    setExpandedPlayerId(prev => (prev === playerId ? null : playerId));
  };

  const currentPlayer = players[currentPlayerIndex];
  const currentPlayerDisplayScore = mode === 'cricket'
    ? currentPlayer?.score
    : (currentPlayer?.score ?? 0) - pendingScore;
  const dartsRemaining = 3 - currentTurn.length;
  const isGameOver = !!winnerId;

  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Checkout Hint for X01 modes */}
      {mode !== 'cricket' && currentPlayer && !isGameOver && (
        <CheckoutHint
          score={currentPlayerDisplayScore}
          dartsRemaining={dartsRemaining}
        />
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Player
              </th>
              <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Score
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Throw
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {players.map((player, index) => {
              const isCurrentPlayer = index === currentPlayerIndex;
              const isWinner = player.id === winnerId;
              const lastTurn = player.turns[player.turns.length - 1];
              const isExpanded = expandedPlayerId === player.id;
              const hasTurns = player.turns.length > 0;

              const displayScore =
                mode === 'cricket'
                  ? player.score
                  : isCurrentPlayer
                  ? player.score - pendingScore
                  : player.score;

              return (
                <Fragment key={player.id}>
                  <tr
                    onClick={() => hasTurns && toggleExpanded(player.id)}
                    className={cn(
                      'transition-colors',
                      hasTurns && 'cursor-pointer hover:bg-muted/50',
                      isCurrentPlayer && !isWinner && 'bg-primary/10 hover:bg-primary/15',
                      isWinner && 'bg-green-500/10 hover:bg-green-500/15'
                    )}
                  >
                    {/* Player Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                            isCurrentPlayer && !isWinner && 'bg-primary text-primary-foreground',
                            !isCurrentPlayer && !isWinner && 'bg-secondary text-muted-foreground',
                            isWinner && 'bg-green-500 text-white'
                          )}
                        >
                          {player.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{player.name}</span>
                            {isCurrentPlayer && !isWinner && (
                              <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                                Throwing
                              </span>
                            )}
                            {isWinner && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
                                Winner!
                              </span>
                            )}
                          </div>
                          {hasTurns && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <ChevronIcon expanded={isExpanded} className="w-3 h-3" />
                              <span>{player.turns.length} {player.turns.length === 1 ? 'turn' : 'turns'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={cn(
                          'text-2xl sm:text-3xl font-bold tabular-nums',
                          mode !== 'cricket' && displayScore <= 50 && displayScore > 20 && 'text-yellow-400',
                          mode !== 'cricket' && displayScore <= 20 && 'text-primary',
                          isWinner && 'text-green-400',
                          !isWinner && mode === 'cricket' && 'text-foreground',
                          !isWinner && mode !== 'cricket' && displayScore > 50 && 'text-foreground'
                        )}
                      >
                        {displayScore}
                      </span>
                    </td>

                    {/* Last Throw */}
                    <td className="py-3 px-4 text-right">
                      {lastTurn ? (
                        <div className="flex flex-col items-end gap-1">
                          {lastTurn.isBust ? (
                            <span className="text-lg font-bold text-red-400">BUST</span>
                          ) : (
                            <span className="text-lg font-bold text-primary tabular-nums">
                              {lastTurn.totalScore}
                            </span>
                          )}
                          <div className="flex gap-1 justify-end flex-wrap">
                            {lastTurn.darts.map((dart, i) => (
                              <span
                                key={i}
                                className={cn(
                                  'text-[10px] px-1.5 py-0.5 rounded font-medium',
                                  dart.segment === 0 && 'bg-muted text-muted-foreground',
                                  dart.segment > 0 && dart.multiplier === 'single' && 'bg-secondary text-foreground',
                                  dart.multiplier === 'double' && 'bg-blue-500/20 text-blue-400',
                                  dart.multiplier === 'triple' && 'bg-purple-500/20 text-purple-400'
                                )}
                              >
                                {formatDart(dart)}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>

                  {/* Expanded History Row */}
                  {isExpanded && (
                    <tr key={`${player.id}-history`} className="bg-muted/20">
                      <td colSpan={3} className="px-4 py-3">
                        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                          Throw History
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {[...player.turns].reverse().map((turn, turnIndex) => {
                            const actualTurnNumber = player.turns.length - turnIndex;
                            return (
                              <div
                                key={turnIndex}
                                className="flex items-center justify-between bg-card/50 rounded-lg px-3 py-2 border border-border/50"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-muted-foreground w-6">
                                    #{actualTurnNumber}
                                  </span>
                                  <div className="flex gap-1">
                                    {turn.darts.map((dart, dartIndex) => (
                                      <span
                                        key={dartIndex}
                                        className={cn(
                                          'text-[10px] px-1.5 py-0.5 rounded font-medium',
                                          dart.segment === 0 && 'bg-muted text-muted-foreground',
                                          dart.segment > 0 && dart.multiplier === 'single' && 'bg-secondary text-foreground',
                                          dart.multiplier === 'double' && 'bg-blue-500/20 text-blue-400',
                                          dart.multiplier === 'triple' && 'bg-purple-500/20 text-purple-400'
                                        )}
                                      >
                                        {formatDart(dart)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-right">
                                  {turn.isBust ? (
                                    <span className="text-sm font-bold text-red-400">BUST</span>
                                  ) : (
                                    <span className="text-sm font-bold text-primary tabular-nums">
                                      {turn.totalScore}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
