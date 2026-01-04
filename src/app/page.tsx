'use client';

import { useGameState } from '@/hooks/use-game-state';
import { GameSetup } from '@/components/game-setup';
import { Scoreboard } from '@/components/scoreboard';
import { CricketBoard } from '@/components/cricket-board';
import { DartInput } from '@/components/dart-input';
import { GameControls } from '@/components/game-controls';
import { GameMode } from '@/lib/types';

export default function Home() {
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
  };

  const handleNewGame = () => {
    startNewGame('501', [], 501);
  };

  // Show setup screen if no players
  if (state.players.length === 0) {
    return (
      <main className="min-h-[100dvh] bg-background flex items-center justify-center p-4">
        <GameSetup onStartGame={handleStartGame} />
      </main>
    );
  }

  const currentPlayer = state.players[state.currentPlayerIndex];
  const canUndo = state.currentTurn.length > 0 || state.players.some(p => p.turns.length > 0);

  return (
    <main className="min-h-[100dvh] bg-background flex flex-col">
      {/* Header - compact on mobile */}
      <header className="border-b px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between bg-background sticky top-0 z-10">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold truncate">
            {state.mode === 'cricket' ? 'Cricket' : state.mode}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            {currentPlayer.name}&apos;s turn
          </p>
        </div>
        <GameControls
          onUndoTurn={undoTurn}
          onResetGame={resetGame}
          onNewGame={handleNewGame}
          canUndo={canUndo}
          isGameOver={state.isGameOver}
        />
      </header>

      {/* Scrollable content area - responsive padding for input panel */}
      <div className="flex-1 overflow-y-auto pb-[320px] sm:pb-[300px]">
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
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg safe-area-bottom">
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
