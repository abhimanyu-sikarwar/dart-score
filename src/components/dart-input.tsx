'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <div className="bg-background p-2 sm:p-4 space-y-2 sm:space-y-3 pb-[env(safe-area-inset-bottom)]">
      {/* Current turn display */}
      <div className="flex items-center justify-between px-1">
        <div className="flex gap-1.5 sm:gap-2">
          {[0, 1, 2].map((idx) => {
            const dart = currentTurn[idx];
            const isPending = !dart && idx === currentTurn.length && pendingSegment !== null;

            return (
              <Badge
                key={idx}
                variant={dart ? 'default' : 'outline'}
                className={cn(
                  'min-w-[50px] sm:min-w-[60px] justify-center py-1 sm:py-1.5 text-xs sm:text-sm',
                  isPending && 'ring-2 ring-orange-400 bg-orange-50 text-orange-700'
                )}
              >
                {dart ? formatDart(dart) : isPending ? formatPending(pendingSegment!) : `-`}
              </Badge>
            );
          })}
        </div>
        <div className="text-lg sm:text-xl font-bold tabular-nums">= {turnScore + pendingScore}</div>
      </div>

      {/* Multiplier selection - shows when a number is pending */}
      {pendingSegment !== null && (
        <div className="flex gap-1.5 sm:gap-2 justify-center py-2 bg-orange-50 rounded-lg border border-orange-200">
          <span className="text-orange-700 font-medium self-center text-sm sm:text-base mr-1 sm:mr-2">
            {formatPending(pendingSegment)}:
          </span>
          <Button
            size="sm"
            variant="outline"
            className="min-w-[55px] sm:min-w-[70px] h-9 sm:h-10 text-xs sm:text-sm"
            onClick={() => handleMultiplierSelect('single')}
          >
            Single
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="min-w-[55px] sm:min-w-[70px] h-9 sm:h-10 text-xs sm:text-sm bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
            onClick={() => handleMultiplierSelect('double')}
          >
            Double
          </Button>
          {pendingSegment !== 25 && (
            <Button
              size="sm"
              variant="outline"
              className="min-w-[55px] sm:min-w-[70px] h-9 sm:h-10 text-xs sm:text-sm bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => handleMultiplierSelect('triple')}
            >
              Triple
            </Button>
          )}
        </div>
      )}

      {/* Number grid - larger touch targets on mobile */}
      <div className="space-y-1 sm:space-y-1.5">
        {segments.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 sm:gap-1.5 justify-center">
            {row.map((num) => (
              <Button
                key={num}
                variant={pendingSegment === num ? 'default' : 'outline'}
                className={cn(
                  'flex-1 max-w-[58px] sm:max-w-[52px] h-11 sm:h-12 text-base sm:text-lg font-semibold',
                  pendingSegment === num && 'bg-orange-500 hover:bg-orange-600'
                )}
                onClick={() => handleSegmentClick(num)}
                disabled={disabled || (currentTurn.length >= 3 && pendingSegment === null)}
              >
                {num}
              </Button>
            ))}
          </div>
        ))}

        {/* Bull and Miss */}
        <div className="flex gap-2 justify-center pt-0.5 sm:pt-1">
          <Button
            variant={pendingSegment === 25 ? 'default' : 'outline'}
            className={cn(
              'flex-1 max-w-[120px] h-11 sm:h-12 text-base sm:text-lg font-semibold',
              pendingSegment === 25 && 'bg-orange-500 hover:bg-orange-600'
            )}
            onClick={() => handleSegmentClick(25)}
            disabled={disabled || (currentTurn.length >= 3 && pendingSegment === null)}
          >
            Bull
          </Button>
          <Button
            variant="outline"
            className="flex-1 max-w-[120px] h-11 sm:h-12 text-base sm:text-lg font-semibold text-muted-foreground"
            onClick={handleMiss}
            disabled={disabled || currentTurn.length >= 3}
          >
            Miss
          </Button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-0.5 sm:pt-1">
        <Button
          variant="outline"
          className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
          onClick={handleUndo}
          disabled={disabled || (currentTurn.length === 0 && pendingSegment === null)}
        >
          Undo
        </Button>
        <Button
          className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
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
