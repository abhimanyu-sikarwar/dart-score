'use client';

import { useState } from 'react';
import { GameMode, GameVariant, GameSettings, InOption, OutOption, MatchType, MatchUnit } from '@/lib/types';

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
              <div className="flex items-center justify-between">
                <span className="font-medium">vs. Dartbot</span>
                <ToggleSwitch
                  checked={settings.vsDartbot}
                  onChange={(checked) => updateSetting('vsDartbot', checked)}
                />
              </div>

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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border safe-area-bottom">
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

// Icons
function DartLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131 133" fill="currentColor" className={className}>
      <path d="M65.3867 0C97.5633 0 124.439 22.4488 130.907 52.3818L103.911 57.4326C101.398 57.9016 99.0355 59.5225 97.5625 61.6084C97.7848 63.1512 97.9062 64.7356 97.9062 66.3281C97.9062 67.9429 97.7858 69.5319 97.5576 71.082L65.7207 67.4385H65.7168C64.1279 67.2532 64.1279 65.3635 65.7168 65.1826L97.5469 61.5439C95.2345 45.9336 81.7994 33.9463 65.5547 33.9463C47.6836 33.9463 33.1973 48.4371 33.1973 66.3125C33.1974 84.1878 47.6836 98.6787 65.5547 98.6787C81.8023 98.6787 95.2509 86.7544 97.5635 71.1484C99.0319 73.2842 101.422 74.9467 103.971 75.4248V75.4287L130.855 80.4629C124.306 110.292 97.4817 132.634 65.3828 132.634H1.80469C0.809934 132.634 0 131.824 0 130.829V1.80371C0.000182533 0.809111 0.810046 0 1.80469 0H65.3867Z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
}

function TuneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 21v-7" />
      <path d="M4 10V3" />
      <path d="M12 21v-9" />
      <path d="M12 8V3" />
      <path d="M20 21v-5" />
      <path d="M20 12V3" />
      <path d="M2 10h4" />
      <path d="M10 8h4" />
      <path d="M18 12h4" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
