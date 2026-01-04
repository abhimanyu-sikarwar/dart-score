'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
}

export function GameSetup({ onStartGame }: GameSetupProps) {
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="text-xl sm:text-2xl text-center">Dart Score Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="mode" className="text-sm sm:text-base">Game Mode</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as GameMode)}>
            <SelectTrigger id="mode" className="h-10 sm:h-11">
              <SelectValue placeholder="Select game mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="501">501</SelectItem>
              <SelectItem value="301">301</SelectItem>
              <SelectItem value="cricket">Cricket</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {mode === 'cricket'
              ? 'Close 15-20 and Bull, highest score wins'
              : `Start at ${mode}, first to exactly 0 (double out) wins`}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <Label className="text-sm sm:text-base">Players</Label>
          {players.map((player, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Player ${index + 1}`}
                value={player}
                onChange={(e) => updatePlayer(index, e.target.value)}
                className="h-10 sm:h-11 text-base"
              />
              {players.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0"
                  onClick={() => removePlayer(index)}
                >
                  X
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" className="w-full h-10 sm:h-11" onClick={addPlayer}>
            + Add Player
          </Button>
        </div>

        <Button
          className="w-full h-11 sm:h-12 text-base sm:text-lg"
          onClick={handleStart}
          disabled={!canStart}
        >
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
}
