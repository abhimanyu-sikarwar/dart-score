'use client';

import { getCheckoutSuggestion, isCheckable, BOGEY_NUMBERS, MAX_CHECKOUT, CheckoutPath } from '@/lib/checkout-chart';
import { cn } from '@/lib/utils';

interface CheckoutHintProps {
  score: number;
  dartsRemaining: number;
  className?: string;
}

function formatDartDisplay(dart: string): { text: string; variant: 'single' | 'double' | 'triple' | 'bull' } {
  if (dart === 'Bull') return { text: 'Bull', variant: 'bull' };
  if (dart.startsWith('D')) return { text: dart, variant: 'double' };
  if (dart.startsWith('T')) return { text: dart, variant: 'triple' };
  return { text: dart, variant: 'single' };
}

function getDartBadgeClasses(variant: 'single' | 'double' | 'triple' | 'bull'): string {
  switch (variant) {
    case 'double':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'triple':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'bull':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-secondary text-foreground border-border';
  }
}

export function CheckoutHint({ score, dartsRemaining, className }: CheckoutHintProps) {
  // Don't show if score is too high or too low
  if (score > MAX_CHECKOUT || score < 2) return null;

  // Check if it's a bogey number
  if (BOGEY_NUMBERS.includes(score)) {
    return (
      <div className={cn('rounded-lg bg-yellow-500/10 border border-yellow-500/20 px-3 py-2', className)}>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-xs font-medium">No checkout</span>
          <span className="text-yellow-400/70 text-xs">({score} is a bogey number)</span>
        </div>
      </div>
    );
  }

  const checkout = getCheckoutSuggestion(score);
  if (!checkout) return null;

  // Check if player has enough darts to checkout
  const dartsNeeded = checkout.length;
  const canCheckout = dartsRemaining >= dartsNeeded;

  return (
    <div className={cn(
      'rounded-lg border px-3 py-2',
      canCheckout
        ? 'bg-green-500/10 border-green-500/20'
        : 'bg-muted/50 border-border',
      className
    )}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-xs font-medium',
            canCheckout ? 'text-green-400' : 'text-muted-foreground'
          )}>
            Checkout:
          </span>
          <div className="flex items-center gap-1">
            {checkout.map((dart, index) => {
              const { text, variant } = formatDartDisplay(dart);
              return (
                <span key={index} className="flex items-center gap-1">
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded border font-medium',
                    getDartBadgeClasses(variant)
                  )}>
                    {text}
                  </span>
                  {index < checkout.length - 1 && (
                    <span className="text-muted-foreground text-xs">→</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
        <span className={cn(
          'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
          canCheckout
            ? 'bg-green-500/20 text-green-400'
            : 'bg-muted text-muted-foreground'
        )}>
          {dartsNeeded} {dartsNeeded === 1 ? 'dart' : 'darts'}
        </span>
      </div>
    </div>
  );
}
