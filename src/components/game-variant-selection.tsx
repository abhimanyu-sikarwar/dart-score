'use client';

import { GameVariant } from '@/lib/types';
import { TargetIcon, ChevronRightIcon } from 'lucide-react';
import { DartLogo, CricketIcon } from './icons';

interface GameVariantSelectionProps {
  onSelectVariant: (variant: GameVariant) => void;
  onBack?: () => void;
}

export function GameVariantSelection({ onSelectVariant, onBack }: GameVariantSelectionProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-4 flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        <div className="flex items-center gap-2">
          <DartLogo className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold">Select Game</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 max-w-md mx-auto w-full">
        <div className="space-y-4">
          <p className="text-muted-foreground text-center mb-6">
            Choose your game type to get started
          </p>

          {/* X01 Option */}
          <button
            onClick={() => onSelectVariant('x01')}
            className="w-full group"
          >
            <div className="bg-gradient-to-r from-card to-card/80 rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TargetIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold mb-1">X01</h3>
                  <p className="text-sm text-muted-foreground">
                    Classic countdown games - 301, 501, 701
                  </p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">301</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">501</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">701</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground">Custom</span>
              </div>
            </div>
          </button>

          {/* Cricket Option */}
          <button
            onClick={() => onSelectVariant('cricket')}
            className="w-full group"
          >
            <div className="bg-gradient-to-r from-card to-card/80 rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CricketIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold mb-1">Cricket</h3>
                  <p className="text-sm text-muted-foreground">
                    Close 15-20 and Bull. Highest score wins.
                  </p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">15</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">16</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">17</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">...</span>
                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">Bull</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

