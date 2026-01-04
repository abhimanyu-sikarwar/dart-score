'use client';

import { useState } from 'react';
import { GameMode, GameVariant, GameSettings, InOption, OutOption, MatchType, MatchUnit } from '@/lib/types';
import { UsersIcon, UserIcon, SettingsIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { DartLogo, TuneIcon, QuestionIcon } from './icons';

interface GameSetupProps {
  variant: GameVariant;
  onStartGame: (mode: GameMode, players: string[], startingScore?: number, settings?: GameSettings) => void;
  onBack?: () => void;
}

const DEFAULT_SETTINGS: GameSettings = {
  variant: 'x01',
  startingScore: 501,
  inOption: 'straight',
  outOption: 'double',
  matchType: 'first-to',
  matchCount: 3,
  matchUnit: 'sets',
  checkoutRate: false,
  vsDartbot: false,
  teamMode: false,
};

export function GameSetup({ variant, onStartGame, onBack }: GameSetupProps) {
  const [players, setPlayers] = useState<string[]>(['Player 1']);
  const [settings, setSettings] = useState<GameSettings>({
    ...DEFAULT_SETTINGS,
    variant,
    startingScore: variant === 'cricket' ? 0 : 501,
  });
  const [customScore, setCustomScore] = useState(170);

  const updateSetting = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addPlayer = () => {
    setPlayers([...players, `Player ${players.length + 1}`]);
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
      alert('Please add at least 1 player');
      return;
    }

    let mode: GameMode;
    let startingScore: number | undefined;

    if (variant === 'cricket') {
      mode = 'cricket';
    } else {
      mode = settings.startingScore === 301 ? '301' :
             settings.startingScore === 501 ? '501' :
             settings.startingScore === 701 ? '701' : '501';
      startingScore = settings.startingScore === 0 ? customScore : settings.startingScore;
    }

    onStartGame(mode, validPlayers, startingScore, settings);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-4 flex items-center gap-4 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
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
          <span className="text-xl font-bold">
            {variant === 'cricket' ? 'Cricket' : 'X01'} Setup
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-2xl mx-auto w-full p-4 space-y-4">

          {/* Player Details Card */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-card to-card/80">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-border/30">
              <div className="w-6 h-6 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-wide">Player details</h2>
            </div>

            <div className="p-4 space-y-4">
              {/* vs Dartbot toggle */}
              {/* <div className="flex items-center justify-between">
                <span className="font-medium">vs. Dartbot</span>
                <ToggleSwitch
                  checked={settings.vsDartbot}
                  onChange={(checked) => updateSetting('vsDartbot', checked)}
                />
              </div> */}

              {/* Single/Teams toggle */}
              <div className="bg-secondary/30 rounded-2xl p-1">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateSetting('teamMode', false)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      !settings.teamMode
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Single players
                  </button>
                  <button
                    onClick={() => updateSetting('teamMode', true)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      settings.teamMode
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Teams
                  </button>
                </div>
              </div>

              {/* Players List */}
              <div className="flex items-center justify-center gap-4 py-4 flex-wrap">
                {players.map((player, index) => (
                  <div key={index} className="flex flex-col items-center relative">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-secondary border-2 border-border flex items-center justify-center overflow-hidden">
                        <UserIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <button
                        onClick={() => removePlayer(index)}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors"
                      >
                        <SettingsIcon className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={player}
                      onChange={(e) => updatePlayer(index, e.target.value)}
                      className="mt-2 text-sm font-medium text-center bg-transparent border-none outline-none w-20 truncate"
                      placeholder="Name"
                    />
                  </div>
                ))}

                {/* Add Player Button */}
                <button
                  onClick={addPlayer}
                  className="w-14 h-14 rounded-full border-2 border-dashed border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
                >
                  <PlusIcon className="w-6 h-6 text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Game Settings Card */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-card to-card/80">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-border/30">
              <div className="w-6 h-6 flex items-center justify-center">
                <TuneIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-wide">Game settings</h2>
            </div>

            <div className="p-4 space-y-4">
              {/* Match Type Row */}
              <div className="flex items-stretch gap-2 bg-secondary/30 rounded-2xl p-2">
                {/* Best of / First to */}
                <div className="flex flex-col gap-1 flex-1">
                  <button
                    onClick={() => updateSetting('matchType', 'best-of')}
                    className={`py-2.5 px-3 rounded-xl font-medium text-sm transition-all ${
                      settings.matchType === 'best-of'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Best of
                  </button>
                  <button
                    onClick={() => updateSetting('matchType', 'first-to')}
                    className={`py-2.5 px-3 rounded-xl font-medium text-sm transition-all ${
                      settings.matchType === 'first-to'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    First to
                  </button>
                </div>

                {/* Number Stepper */}
                <div className="bg-primary rounded-2xl flex flex-col items-center justify-between py-2 px-4 min-w-[60px]">
                  <button
                    onClick={() => updateSetting('matchCount', Math.min(settings.matchCount + 1, 99))}
                    className="text-white/80 hover:text-white transition-colors p-1"
                  >
                    <ChevronUpIcon className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold text-white">{settings.matchCount}</span>
                  <button
                    onClick={() => updateSetting('matchCount', Math.max(settings.matchCount - 1, 1))}
                    className="text-white/80 hover:text-white transition-colors p-1"
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Legs / Sets */}
                <div className="flex flex-col gap-1 flex-1">
                  <button
                    onClick={() => updateSetting('matchUnit', 'legs')}
                    className={`py-2.5 px-3 rounded-xl font-medium text-sm transition-all ${
                      settings.matchUnit === 'legs'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Legs
                  </button>
                  <button
                    onClick={() => updateSetting('matchUnit', 'sets')}
                    className={`py-2.5 px-3 rounded-xl font-medium text-sm transition-all ${
                      settings.matchUnit === 'sets'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Sets
                  </button>
                </div>
              </div>

              {/* Starting Score (X01 only) */}
              {variant === 'x01' && (
                <>
                  <div className="bg-secondary/30 rounded-2xl p-1">
                    <div className="grid grid-cols-4 gap-1">
                      {[301, 501, 701, 0].map((score) => (
                        <button
                          key={score}
                          onClick={() => updateSetting('startingScore', score)}
                          className={`py-3 px-2 rounded-xl font-medium transition-all ${
                            settings.startingScore === score
                              ? 'bg-card text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {score === 0 ? (
                            <div className="flex flex-col items-center">
                              <span className="text-xs text-muted-foreground">Custom</span>
                              <span>{customScore}</span>
                            </div>
                          ) : (
                            score
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Score Input */}
                  {settings.startingScore === 0 && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-muted-foreground">Custom score:</label>
                      <input
                        type="number"
                        value={customScore}
                        onChange={(e) => setCustomScore(Math.max(2, parseInt(e.target.value) || 2))}
                        className="flex-1 bg-secondary/30 rounded-xl px-4 py-2 text-center font-medium border-none outline-none focus:ring-2 focus:ring-primary"
                        min={2}
                      />
                    </div>
                  )}

                  {/* In Options */}
                  <div className="bg-secondary/30 rounded-2xl p-1">
                    <div className="grid grid-cols-3 gap-1">
                      {(['straight', 'double', 'master'] as InOption[]).map((option) => (
                        <button
                          key={option}
                          onClick={() => updateSetting('inOption', option)}
                          className={`py-3 px-3 rounded-xl font-medium text-sm transition-all capitalize ${
                            settings.inOption === option
                              ? 'bg-card text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {option === 'straight' ? 'Straight in' : option === 'double' ? 'Double in' : 'Master in'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Out Options */}
                  <div className="bg-secondary/30 rounded-2xl p-1">
                    <div className="grid grid-cols-3 gap-1">
                      {(['double', 'master', 'straight'] as OutOption[]).map((option) => (
                        <button
                          key={option}
                          onClick={() => updateSetting('outOption', option)}
                          className={`py-3 px-3 rounded-xl font-medium text-sm transition-all capitalize ${
                            settings.outOption === option
                              ? 'bg-card text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {option === 'double' ? 'Double out' : option === 'master' ? 'Master out' : 'Straight out'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Checkout Rate Toggle */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Checkout rate</span>
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <QuestionIcon className="w-3 h-3 text-primary" />
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings.checkoutRate}
                  onChange={(checked) => updateSetting('checkoutRate', checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Start Button */}
      <div className="fixed bottom-4 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border safe-area-bottom">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-semibold text-lg rounded-full transition-all shadow-lg shadow-primary/25"
          >
            Start game
          </button>
        </div>
      </div>
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? 'bg-green-500' : 'bg-secondary'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
