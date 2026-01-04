'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GameMode } from '@/lib/types';

interface GameSetupProps {
  onStartGame: (mode: GameMode, players: string[], startingScore?: number) => void;
  onBack?: () => void;
}

export function GameSetup({ onStartGame, onBack }: GameSetupProps) {
  const [mode, setMode] = useState<GameMode>('501');
  const [players, setPlayers] = useState<string[]>(['']);

  const addPlayer = () => {
    setPlayers([...players, '']);
  };

  const removePlayer = (index: number) => {
    if (players.length > 1) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleStart = () => {
    const validPlayers = players.filter(p => p.trim() !== '');
    if (validPlayers.length < 1) {
      alert('Please enter at least 1 player name');
      return;
    }
    const startingScore = mode === '501' ? 501 : mode === '301' ? 301 : undefined;
    onStartGame(mode, validPlayers, startingScore);
  };

  const canStart = players.filter(p => p.trim() !== '').length >= 1;

  return (
    <div className="min-h-[100dvh] flex flex-col">
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
          <span className="text-xl font-bold">New Game</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 max-w-md mx-auto w-full">
        <div className="space-y-6">
          {/* Game Mode */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Game Mode</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as GameMode)}>
              <SelectTrigger className="h-12 text-base bg-card border-border">
                <SelectValue placeholder="Select game mode" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="501" className="text-base">501</SelectItem>
                <SelectItem value="301" className="text-base">301</SelectItem>
                <SelectItem value="cricket" className="text-base">Cricket</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {mode === 'cricket'
                ? 'Close 15-20 and Bull. Highest score wins.'
                : `Start at ${mode}. First to exactly 0 with a double wins.`}
            </p>
          </div>

          {/* Players */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Players</Label>
            <div className="space-y-2">
              {players.map((player, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Player ${index + 1}`}
                    value={player}
                    onChange={(e) => updatePlayer(index, e.target.value)}
                    className="h-12 text-base bg-card border-border placeholder:text-muted-foreground/50"
                  />
                  {players.length > 1 && (
                    <button
                      onClick={() => removePlayer(index)}
                      className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors border border-border"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full h-12 text-base bg-secondary/30 border-border hover:bg-secondary"
              onClick={addPlayer}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Player
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="border-t border-border p-4 safe-area-bottom">
        <Button
          className="w-full h-14 text-lg font-medium"
          onClick={handleStart}
          disabled={!canStart}
        >
          <DartLogo className="w-5 h-5 mr-2" />
          Start Game
        </Button>
      </div>
    </div>
  );
}

function DartLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131 133" fill="currentColor" className={className}>
      <path d="M65.3867 0C97.5633 0 124.439 22.4488 130.907 52.3818L103.911 57.4326C101.398 57.9016 99.0355 59.5225 97.5625 61.6084C97.7848 63.1512 97.9062 64.7356 97.9062 66.3281C97.9062 67.9429 97.7858 69.5319 97.5576 71.082L65.7207 67.4385H65.7168C64.1279 67.2532 64.1279 65.3635 65.7168 65.1826L97.5469 61.5439C95.2345 45.9336 81.7994 33.9463 65.5547 33.9463C47.6836 33.9463 33.1973 48.4371 33.1973 66.3125C33.1974 84.1878 47.6836 98.6787 65.5547 98.6787C81.8023 98.6787 95.2509 86.7544 97.5635 71.1484C99.0319 73.2842 101.422 74.9467 103.971 75.4248V75.4287L130.855 80.4629C124.306 110.292 97.4817 132.634 65.3828 132.634H1.80469C0.809934 132.634 0 131.824 0 130.829V1.80371C0.000182533 0.809111 0.810046 0 1.80469 0H65.3867Z" />
    </svg>
  );
}
