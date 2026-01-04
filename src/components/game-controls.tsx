'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface GameControlsProps {
  onUndoTurn: () => void;
  onResetGame: () => void;
  onNewGame: () => void;
  canUndo: boolean;
  isGameOver: boolean;
}

export function GameControls({
  onUndoTurn,
  onResetGame,
  onNewGame,
  canUndo,
  isGameOver,
}: GameControlsProps) {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showNewGameDialog, setShowNewGameDialog] = useState(false);

  return (
    <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
      {isGameOver ? (
        <Button size="sm" className="h-8 sm:h-9 text-xs sm:text-sm font-medium" onClick={onResetGame}>
          Play Again
        </Button>
      ) : (
        <>
          <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm bg-secondary/50 border-border hover:bg-secondary"
              >
                Restart
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Restart Game?</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  This will reset all scores. Same players will continue.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex-row gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none bg-secondary/50 border-border hover:bg-secondary"
                  onClick={() => setShowResetDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 sm:flex-none"
                  onClick={() => {
                    onResetGame();
                    setShowResetDialog(false);
                  }}
                >
                  Restart
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewGameDialog} onOpenChange={setShowNewGameDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm bg-secondary/50 border-border hover:bg-secondary"
              >
                New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Start New Game?</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  This will end the current game and return to setup.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex-row gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none bg-secondary/50 border-border hover:bg-secondary"
                  onClick={() => setShowNewGameDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 sm:flex-none"
                  onClick={() => {
                    onNewGame();
                    setShowNewGameDialog(false);
                  }}
                >
                  New Game
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
