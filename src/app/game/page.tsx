'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/use-game-state';
import { Scoreboard } from '@/components/scoreboard';
import { CricketBoard } from '@/components/cricket-board';
import { DartInput } from '@/components/dart-input';
import { GameControls } from '@/components/game-controls';
import { GameMode, GameSettings } from '@/lib/types';

interface GameConfig {
  mode: GameMode;
  players: string[];
  startingScore: number;
  settings: GameSettings;
}

function DartLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M85 5L95 15L60 50L95 85L85 95L50 60L15 95L5 85L40 50L5 15L15 5L50 40L85 5Z" fillOpacity="0.3" />
      <path d="M62 35C62 29 57 25 50 25C43 25 38 29 38 35C38 41 43 44 50 46C57 48 62 51 62 57C62 63 57 67 50 67C43 67 38 63 38 57M50 20V25M50 67V72" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GamePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const {
    state,
    addDart,
    removeLastDart,
    submitTurn,
    undoTurn,
    startNewGame,
    resetGame,
  } = useGameState();

  useEffect(() => {
    // Load game config from localStorage
    const storedConfig = localStorage.getItem('dartGameConfig');
    if (storedConfig) {
      const config: GameConfig = JSON.parse(storedConfig);
      startNewGame(config.mode, config.players, config.startingScore);
    } else {
      // No config found, redirect to settings
      router.push('/settings');
      return;
    }
    setIsLoading(false);
  }, []);

  const handleNewGame = () => {
    router.push('/settings');
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2">
          <DartLogo className="w-8 h-8 text-primary" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

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
      <div className="flex-1 overflow-y-auto pb-[480px] sm:pb-[420px]">
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
