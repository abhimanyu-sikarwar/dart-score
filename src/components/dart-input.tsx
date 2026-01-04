'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DartThrow, Multiplier } from '@/lib/types';
import { createDartThrow, calculateTurnScore } from '@/lib/game-logic';
import { cn } from '@/lib/utils';

interface DartInputProps {
  currentTurn: DartThrow[];
  onAddDart: (dart: DartThrow) => void;
  onRemoveLastDart: () => void;
  onSubmitTurn: () => void;
  disabled?: boolean;
}

export function DartInput({
  currentTurn,
  onAddDart,
  onRemoveLastDart,
  onSubmitTurn,
  disabled,
}: DartInputProps) {
  const [pendingSegment, setPendingSegment] = useState<number | null>(null);

  const handleSegmentClick = (segment: number) => {
    if (currentTurn.length >= 3 || disabled) return;

    if (pendingSegment !== null) {
      onAddDart(createDartThrow(pendingSegment, 'single'));
      if (currentTurn.length >= 2) {
        setPendingSegment(null);
        return;
      }
    }

    setPendingSegment(segment);
  };

  const handleMultiplierSelect = (multiplier: Multiplier) => {
    if (pendingSegment === null || currentTurn.length >= 3 || disabled) return;

    const actualMultiplier = pendingSegment === 25 && multiplier === 'triple' ? 'double' : multiplier;
    onAddDart(createDartThrow(pendingSegment, actualMultiplier));
    setPendingSegment(null);
  };

  const handleMiss = () => {
    if (currentTurn.length >= 3 || disabled) return;

    if (pendingSegment !== null) {
      onAddDart(createDartThrow(pendingSegment, 'single'));
      setPendingSegment(null);
      if (currentTurn.length >= 2) return;
    }

    onAddDart(createDartThrow(0, 'single'));
  };

  const handleUndo = () => {
    if (pendingSegment !== null) {
      setPendingSegment(null);
    } else {
      onRemoveLastDart();
    }
  };

  const turnScore = calculateTurnScore(currentTurn);
  const pendingScore = pendingSegment !== null ? pendingSegment : 0;
  const dartsRemaining = 3 - currentTurn.length - (pendingSegment !== null ? 1 : 0);

  const segments = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
  ];

  const formatDart = (dart: DartThrow) => {
    if (dart.segment === 0) return 'Miss';
    const prefix = dart.multiplier === 'double' ? 'D' : dart.multiplier === 'triple' ? 'T' : '';
    const segment = dart.segment === 25 ? 'Bull' : dart.segment.toString();
    return `${prefix}${segment}`;
  };

  const formatPending = (segment: number) => {
    return segment === 25 ? 'Bull' : segment.toString();
  };

  return (
    <div className="bg-card p-3 sm:p-4 space-y-3 pb-[env(safe-area-inset-bottom)] border-t border-border">
      {/* Current turn display */}
      <div className="flex items-center justify-between px-1">
        <div className="flex gap-2">
          {[0, 1, 2].map((idx) => {
            const dart = currentTurn[idx];
            const isPending = !dart && idx === currentTurn.length && pendingSegment !== null;

            return (
              <div
                key={idx}
                className={cn(
                  'min-w-[55px] sm:min-w-[65px] text-center py-1.5 sm:py-2 px-2 rounded-lg text-sm sm:text-base font-medium transition-all',
                  dart && 'bg-primary/20 text-primary border border-primary/30',
                  !dart && !isPending && 'bg-secondary/50 text-muted-foreground border border-border',
                  isPending && 'bg-[#D9492C]/20 text-[#FE5735] border-2 border-[#D9492C] animate-pulse'
                )}
              >
                {dart ? formatDart(dart) : isPending ? formatPending(pendingSegment!) : `-`}
              </div>
            );
          })}
        </div>
        <div className="text-xl sm:text-2xl font-bold tabular-nums text-foreground">
          = <span className="text-primary">{turnScore + pendingScore}</span>
        </div>
      </div>

      {/* Multiplier selection - shows when a number is pending */}
      {pendingSegment !== null && (
        <div className="flex gap-2 justify-center py-2.5 bg-[#D9492C]/10 rounded-xl border border-[#D9492C]/30">
          <span className="text-[#FE5735] font-bold self-center text-base sm:text-lg mr-2">
            {formatPending(pendingSegment)}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="min-w-[60px] sm:min-w-[75px] h-10 sm:h-11 text-sm sm:text-base font-medium bg-secondary/50 hover:bg-secondary border-border"
            onClick={() => handleMultiplierSelect('single')}
          >
            Single
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="min-w-[60px] sm:min-w-[75px] h-10 sm:h-11 text-sm sm:text-base font-medium bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
            onClick={() => handleMultiplierSelect('double')}
          >
            Double
          </Button>
          {pendingSegment !== 25 && (
            <Button
              size="sm"
              variant="outline"
              className="min-w-[60px] sm:min-w-[75px] h-10 sm:h-11 text-sm sm:text-base font-medium bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
              onClick={() => handleMultiplierSelect('triple')}
            >
              Triple
            </Button>
          )}
        </div>
      )}

      {/* Number grid */}
      <div className="space-y-1.5">
        {segments.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1.5 justify-center">
            {row.map((num) => (
              <button
                key={num}
                className={cn(
                  'num-btn flex-1 max-w-[60px] h-12 sm:h-14 text-lg sm:text-xl font-semibold rounded-xl border transition-all',
                  pendingSegment === num
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                    : 'bg-secondary/50 text-foreground border-border hover:bg-secondary hover:border-muted-foreground/30',
                  (disabled || (currentTurn.length >= 3 && pendingSegment === null)) && 'opacity-50 cursor-not-allowed'
                )}
                onClick={() => handleSegmentClick(num)}
                disabled={disabled || (currentTurn.length >= 3 && pendingSegment === null)}
              >
                {num}
              </button>
            ))}
          </div>
        ))}

        {/* Bull and Miss */}
        <div className="flex gap-2 justify-center pt-1">
          <button
            className={cn(
              'num-btn flex-1 max-w-[130px] h-12 sm:h-14 text-lg sm:text-xl font-semibold rounded-xl border transition-all',
              pendingSegment === 25
                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                : 'bg-secondary/50 text-foreground border-border hover:bg-secondary hover:border-muted-foreground/30',
              (disabled || (currentTurn.length >= 3 && pendingSegment === null)) && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => handleSegmentClick(25)}
            disabled={disabled || (currentTurn.length >= 3 && pendingSegment === null)}
          >
            Bull
          </button>
          <button
            className={cn(
              'num-btn flex-1 max-w-[130px] h-12 sm:h-14 text-lg sm:text-xl font-semibold rounded-xl border transition-all',
              'bg-secondary/30 text-muted-foreground border-border hover:bg-secondary/50',
              (disabled || currentTurn.length >= 3) && 'opacity-50 cursor-not-allowed'
            )}
            onClick={handleMiss}
            disabled={disabled || currentTurn.length >= 3}
          >
            Miss
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        <Button
          variant="outline"
          className="flex-1 h-12 sm:h-14 text-base sm:text-lg font-medium bg-secondary/30 border-border hover:bg-secondary"
          onClick={handleUndo}
          disabled={disabled || (currentTurn.length === 0 && pendingSegment === null)}
        >
          Undo
        </Button>
        <Button
          className="flex-1 h-12 sm:h-14 text-base sm:text-lg font-medium"
          onClick={() => {
            if (pendingSegment !== null) {
              onAddDart(createDartThrow(pendingSegment, 'single'));
              setPendingSegment(null);
            }
            onSubmitTurn();
          }}
          disabled={disabled || (currentTurn.length === 0 && pendingSegment === null)}
        >
          Submit {dartsRemaining > 0 && dartsRemaining < 3 ? `(${dartsRemaining} left)` : ''}
        </Button>
      </div>
    </div>
  );
}
