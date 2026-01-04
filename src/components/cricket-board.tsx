'use client';

import { Player, CRICKET_NUMBERS, CricketMarks } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CricketBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  winnerId?: string;
}

function CricketMark({ count }: { count: number }) {
  if (count === 0) return <span className="text-muted-foreground">-</span>;
  if (count === 1) return <span>/</span>;
  if (count === 2) return <span>X</span>;
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-current text-[10px] sm:text-xs font-bold">
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
    <div className="overflow-x-auto p-2 sm:p-4">
      <table className="w-full border-collapse text-center text-sm sm:text-base">
        <thead>
          <tr className="border-b">
            <th className="p-1.5 sm:p-2 text-left font-semibold sticky left-0 bg-background">#</th>
            {players.map((player, idx) => (
              <th
                key={player.id}
                className={cn(
                  'p-1.5 sm:p-2 font-semibold min-w-[60px] sm:min-w-[80px]',
                  idx === currentPlayerIndex && 'bg-primary/10',
                  player.id === winnerId && 'bg-green-100 dark:bg-green-900'
                )}
              >
                <div className="truncate max-w-[60px] sm:max-w-[80px] text-xs sm:text-sm">{player.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {numbers.map((num) => (
            <tr key={num} className="border-b">
              <td className="p-1.5 sm:p-2 text-left font-medium sticky left-0 bg-background">
                {num === 25 ? 'Bull' : num}
              </td>
              {players.map((player, idx) => {
                const marks = player.cricketMarks?.[num as keyof CricketMarks] ?? 0;
                return (
                  <td
                    key={player.id}
                    className={cn(
                      'p-1.5 sm:p-2',
                      idx === currentPlayerIndex && 'bg-primary/10',
                      player.id === winnerId && 'bg-green-100 dark:bg-green-900',
                      marks >= 3 && 'text-green-600 dark:text-green-400'
                    )}
                  >
                    <CricketMark count={marks} />
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="font-bold border-t-2">
            <td className="p-1.5 sm:p-2 text-left sticky left-0 bg-background">Pts</td>
            {players.map((player, idx) => (
              <td
                key={player.id}
                className={cn(
                  'p-1.5 sm:p-2 text-base sm:text-lg',
                  idx === currentPlayerIndex && 'bg-primary/10',
                  player.id === winnerId && 'bg-green-100 dark:bg-green-900'
                )}
              >
                {player.score}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
