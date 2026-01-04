'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameVariantSelection } from '@/components/game-variant-selection';
import { GameSetup } from '@/components/game-setup';
import { GameMode, GameVariant, GameSettings } from '@/lib/types';

type SettingsStep = 'variant' | 'setup';

export default function SettingsPage() {
  const router = useRouter();
  const [step, setStep] = useState<SettingsStep>('variant');
  const [selectedVariant, setSelectedVariant] = useState<GameVariant>('x01');

  const handleSelectVariant = (variant: GameVariant) => {
    setSelectedVariant(variant);
    setStep('setup');
  };

  const handleStartGame = (mode: GameMode, players: string[], startingScore?: number, settings?: GameSettings) => {
    // Store game config in localStorage
    const gameConfig = {
      mode,
      players,
      startingScore: startingScore ?? (mode === 'cricket' ? 0 : 501),
      settings,
    };
    localStorage.setItem('dartGameConfig', JSON.stringify(gameConfig));

    // Navigate to game page
    router.push('/game');
  };

  const handleBackToLanding = () => {
    router.push('/');
  };

  const handleBackToVariant = () => {
    setStep('variant');
  };

  if (step === 'variant') {
    return (
      <GameVariantSelection
        onSelectVariant={handleSelectVariant}
        onBack={handleBackToLanding}
      />
    );
  }

  return (
    <GameSetup
      variant={selectedVariant}
      onStartGame={handleStartGame}
      onBack={handleBackToVariant}
    />
  );
}
