'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/use-game-state';
import { LandingPage } from '@/components/landing-page';
import { GameSetup } from '@/components/game-setup';
import { Scoreboard } from '@/components/scoreboard';
import { CricketBoard } from '@/components/cricket-board';
import { DartInput } from '@/components/dart-input';
import { GameControls } from '@/components/game-controls';
import { GameMode } from '@/lib/types';

type AppScreen = 'landing' | 'setup' | 'game';

function DartLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131 133" fill="currentColor" className={className}>
      <path d="M65.3867 0C97.5633 0 124.439 22.4488 130.907 52.3818L103.911 57.4326C101.398 57.9016 99.0355 59.5225 97.5625 61.6084C97.7848 63.1512 97.9062 64.7356 97.9062 66.3281C97.9062 67.9429 97.7858 69.5319 97.5576 71.082L65.7207 67.4385H65.7168C64.1279 67.2532 64.1279 65.3635 65.7168 65.1826L97.5469 61.5439C95.2345 45.9336 81.7994 33.9463 65.5547 33.9463C47.6836 33.9463 33.1973 48.4371 33.1973 66.3125C33.1974 84.1878 47.6836 98.6787 65.5547 98.6787C81.8023 98.6787 95.2509 86.7544 97.5635 71.1484C99.0319 73.2842 101.422 74.9467 103.971 75.4248V75.4287L130.855 80.4629C124.306 110.292 97.4817 132.634 65.3828 132.634H1.80469C0.809934 132.634 0 131.824 0 130.829V1.80371C0.000182533 0.809111 0.810046 0 1.80469 0H65.3867Z" />
    </svg>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>('landing');
  const {
    state,
    addDart,
    removeLastDart,
    submitTurn,
    undoTurn,
    startNewGame,
    resetGame,
  } = useGameState();

  const handleStartGame = (mode: GameMode, players: string[], startingScore?: number) => {
    startNewGame(mode, players, startingScore);
    setScreen('game');
  };

  const handleNewGame = () => {
    setScreen('setup');
  };

  const handleBackToLanding = () => {
    setScreen('landing');
  };

  // Show landing page
  if (screen === 'landing') {
    return <LandingPage onStartGame={() => setScreen('setup')} />;
  }

  // Show setup screen
  if (screen === 'setup') {
    return <GameSetup onStartGame={handleStartGame} onBack={handleBackToLanding} />;
  }

  // Show game screen
  const currentPlayer = state.players[state.currentPlayerIndex];
  const canUndo = state.currentTurn.length > 0 || state.players.some(p => p.turns.length > 0);

  return (
    <main className="min-h-[100dvh] bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 sm:py-4 flex items-center justify-between bg-background sticky top-0 z-10">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            onClick={handleNewGame}
            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <DartLogo className="w-6 h-6 sm:w-7 sm:h-7 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">
                {state.mode === 'cricket' ? 'Cricket' : state.mode}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {state.isGameOver ? 'Game Over' : `${currentPlayer?.name}'s turn`}
              </p>
            </div>
          </div>
        </div>
        <GameControls
          onUndoTurn={undoTurn}
          onResetGame={resetGame}
          onNewGame={handleNewGame}
          canUndo={canUndo}
          isGameOver={state.isGameOver}
        />
      </header>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto pb-[340px] sm:pb-[320px]">
        {state.mode === 'cricket' ? (
          <CricketBoard
            players={state.players}
            currentPlayerIndex={state.currentPlayerIndex}
            winnerId={state.winnerId}
          />
        ) : (
          <Scoreboard
            players={state.players}
            currentPlayerIndex={state.currentPlayerIndex}
            winnerId={state.winnerId}
            mode={state.mode}
            currentTurn={state.currentTurn}
          />
        )}
      </div>

      {/* Fixed bottom input panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <DartInput
          currentTurn={state.currentTurn}
          onAddDart={addDart}
          onRemoveLastDart={removeLastDart}
          onSubmitTurn={submitTurn}
          disabled={state.isGameOver}
        />
      </div>
    </main>
  );
}
