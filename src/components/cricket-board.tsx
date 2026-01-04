'use client';

import { Player, CRICKET_NUMBERS, CricketMarks } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CricketBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  winnerId?: string;
}

function CricketMark({ count }: { count: number }) {
  if (count === 0) return <span className="text-muted-foreground/50">-</span>;
  if (count === 1) return <span className="text-foreground">/</span>;
  if (count === 2) return <span className="text-foreground">X</span>;
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-primary text-primary text-[10px] sm:text-xs font-bold">
      X
    </span>
  );
}

export function CricketBoard({
  players,
  currentPlayerIndex,
  winnerId,
}: CricketBoardProps) {
  const numbers = [...CRICKET_NUMBERS];

  return (
    <div className="overflow-x-auto p-3 sm:p-4">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full border-collapse text-center text-sm sm:text-base">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2 sm:p-3 text-left font-semibold sticky left-0 bg-card text-muted-foreground">#</th>
              {players.map((player, idx) => (
                <th
                  key={player.id}
                  className={cn(
                    'p-2 sm:p-3 font-semibold min-w-[70px] sm:min-w-[90px]',
                    idx === currentPlayerIndex && !winnerId && 'bg-primary/10',
                    player.id === winnerId && 'bg-green-500/10'
                  )}
                >
                  <div className={cn(
                    'truncate max-w-[70px] sm:max-w-[90px] text-xs sm:text-sm',
                    idx === currentPlayerIndex && !winnerId && 'text-primary',
                    player.id === winnerId && 'text-green-400'
                  )}>
                    {player.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {numbers.map((num) => (
              <tr key={num} className="border-b border-border/50">
                <td className="p-2 sm:p-3 text-left font-medium sticky left-0 bg-card text-muted-foreground">
                  {num === 25 ? 'Bull' : num}
                </td>
                {players.map((player, idx) => {
                  const marks = player.cricketMarks?.[num as keyof CricketMarks] ?? 0;
                  return (
                    <td
                      key={player.id}
                      className={cn(
                        'p-2 sm:p-3',
                        idx === currentPlayerIndex && !winnerId && 'bg-primary/5',
                        player.id === winnerId && 'bg-green-500/5',
                        marks >= 3 && 'text-green-400'
                      )}
                    >
                      <CricketMark count={marks} />
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="font-bold border-t-2 border-border">
              <td className="p-2 sm:p-3 text-left sticky left-0 bg-card text-muted-foreground">Pts</td>
              {players.map((player, idx) => (
                <td
                  key={player.id}
                  className={cn(
                    'p-2 sm:p-3 text-lg sm:text-xl tabular-nums',
                    idx === currentPlayerIndex && !winnerId && 'bg-primary/10 text-primary',
                    player.id === winnerId && 'bg-green-500/10 text-green-400',
                    !winnerId && idx !== currentPlayerIndex && 'text-foreground'
                  )}
                >
                  {player.score}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
