'use client';

import { GameVariant } from '@/lib/types';

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

// Icons
function DartLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131 133" fill="currentColor" className={className}>
      <path d="M65.3867 0C97.5633 0 124.439 22.4488 130.907 52.3818L103.911 57.4326C101.398 57.9016 99.0355 59.5225 97.5625 61.6084C97.7848 63.1512 97.9062 64.7356 97.9062 66.3281C97.9062 67.9429 97.7858 69.5319 97.5576 71.082L65.7207 67.4385H65.7168C64.1279 67.2532 64.1279 65.3635 65.7168 65.1826L97.5469 61.5439C95.2345 45.9336 81.7994 33.9463 65.5547 33.9463C47.6836 33.9463 33.1973 48.4371 33.1973 66.3125C33.1974 84.1878 47.6836 98.6787 65.5547 98.6787C81.8023 98.6787 95.2509 86.7544 97.5635 71.1484C99.0319 73.2842 101.422 74.9467 103.971 75.4248V75.4287L130.855 80.4629C124.306 110.292 97.4817 132.634 65.3828 132.634H1.80469C0.809934 132.634 0 131.824 0 130.829V1.80371C0.000182533 0.809111 0.810046 0 1.80469 0H65.3867Z" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function CricketIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4l16 16" />
      <path d="M4 20L20 4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
