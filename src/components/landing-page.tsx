'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { UndoIcon, TargetIcon, UsersIcon, SettingsIcon, ZapIcon, TrophyIcon, SmartphoneIcon, GridIcon } from 'lucide-react';
import { DartLogo, CricketIcon, DartboardIcon, ChartIcon, ZoomIcon } from './icons';

interface LandingPageProps {
  onStartGame?: () => void;
}

export function LandingPage({ onStartGame }: LandingPageProps) {
  const router = useRouter();

  const handleStartGame = () => {
    if (onStartGame) {
      onStartGame();
    } else {
      router.push('/settings');
    }
  };
  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DartLogo className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">DartScore</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="w-9 h-9" />
            <Button variant="ghost" size="sm" onClick={() => router.push('/rules')}>
              Rules
            </Button>
            <Button onClick={handleStartGame} size="sm">
              Start Playing
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Track every</span>
                  <br />
                  <span className="text-foreground">throw.</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-md">
                  The ultimate dart scoring app for you and your friends.
                  X01, Cricket, teams, and more. Free forever.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleStartGame}
                  size="lg"
                  className="text-lg h-14 px-8"
                >
                  <DartLogo className="w-5 h-5 mr-2" />
                  Start Game
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg h-14 px-8"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>

              {/* Game Modes */}
              {/* <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-card/50 rounded-xl px-4 py-3 border border-border/50">
                  <div className="text-2xl font-bold text-primary">X01</div>
                  <div className="text-xs text-muted-foreground">301 / 501 / 701</div>
                </div>
                <div className="bg-card/50 rounded-xl px-4 py-3 border border-border/50">
                  <div className="text-2xl font-bold text-primary">Cricket</div>
                  <div className="text-xs text-muted-foreground">15-20 & Bull</div>
                </div>
                <div className="bg-card/50 rounded-xl px-4 py-3 border border-border/50">
                  <div className="text-2xl font-bold text-primary">Teams</div>
                  <div className="text-xs text-muted-foreground">Group Play</div>
                </div>
                <div className="bg-card/50 rounded-xl px-4 py-3 border border-border/50">
                  <div className="text-2xl font-bold text-primary">Custom</div>
                  <div className="text-xs text-muted-foreground">Any Score</div>
                </div>
              </div> */}
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />

                {/* Phone frame */}
                <div className="relative bg-card rounded-[2.5rem] p-3 shadow-2xl border border-border">
                  <div className="bg-background rounded-[2rem] overflow-hidden w-[280px] sm:w-[320px]">
                    {/* Status bar */}
                    <div className="h-8 bg-card flex items-center justify-center">
                      <div className="w-20 h-5 bg-background rounded-full" />
                    </div>

                    {/* App content preview */}
                    <div className="p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DartLogo className="w-5 h-5 text-primary" />
                          <div>
                            <div className="text-sm font-bold">501</div>
                            <div className="text-[10px] text-muted-foreground">Abhimanyu Sikarwar&apos;s turn</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                            <UndoIcon className="w-3 h-3" />
                          </div>
                        </div>
                      </div>

                      {/* Score cards preview */}
                      <div className="space-y-2">
                        <div className="bg-primary/10 rounded-xl p-3 border border-primary/30">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs">AB</div>
                              <span className="font-medium text-sm">Abhimanyu</span>
                            </div>
                            <span className="text-2xl font-bold">341</span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            <span className="text-[10px] px-1.5 py-0.5 bg-primary/20 rounded">T20</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-primary/20 rounded">T20</span>
                          </div>
                        </div>
                        <div className="bg-card rounded-xl p-3 border border-border">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs">AR</div>
                              <span className="font-medium text-sm">Arjun</span>
                            </div>
                            <span className="text-2xl font-bold">285</span>
                          </div>
                        </div>
                      </div>

                      {/* Input preview */}
                      <div className="bg-card rounded-xl p-3 space-y-2 border border-border">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-xs font-medium">T20</div>
                            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-xs font-medium">T20</div>
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-xs">-</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">120</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <div key={n} className="aspect-square bg-secondary rounded-lg flex items-center justify-center text-xs font-medium">
                              {n}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="py-1.5 bg-secondary rounded-lg text-center text-[10px] font-medium">Single</div>
                          <div className="py-1.5 bg-primary text-white rounded-lg text-center text-[10px] font-medium">Double</div>
                          <div className="py-1.5 bg-secondary rounded-lg text-center text-[10px] font-medium">Triple</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional-grade scoring with a simple, intuitive interface
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <FeatureCard
              icon={<TargetIcon />}
              title="X01 Games"
              description="Play 301, 501, 701, or set any custom starting score. Full double-in/out and master options."
            />
            <FeatureCard
              icon={<CricketIcon />}
              title="Cricket Mode"
              description="Standard Cricket with 15-20 and Bull. Track marks and points with visual indicators."
            />
            <FeatureCard
              icon={<UsersIcon />}
              title="Teams & Players"
              description="Single players or team mode. Add unlimited players and track everyone's score."
            />
            <FeatureCard
              icon={<SettingsIcon />}
              title="Match Settings"
              description="Best-of or First-to format. Configure legs, sets, and match count to your preference."
            />
            <FeatureCard
              icon={<ZapIcon />}
              title="Dual Input Modes"
              description="Switch between number grid and interactive dartboard. Choose what works best for you."
            />
            <FeatureCard
              icon={<UndoIcon />}
              title="Full Undo Support"
              description="Remove individual darts or undo entire turns. Fix mistakes without restarting."
            />
            <FeatureCard
              icon={<TrophyIcon />}
              title="Smart Win Detection"
              description="Automatic bust detection, double-out validation, and winner announcement."
            />
            <FeatureCard
              icon={<DartboardIcon />}
              title="Visual Dartboard"
              description="Tap directly on a realistic dartboard. Pinch-to-zoom for precise triple and double hits."
            />
            <FeatureCard
              icon={<ChartIcon />}
              title="Checkout Rate"
              description="Track your checkout percentage and improve your finishing game over time."
            />
            <FeatureCard
              icon={<SmartphoneIcon />}
              title="Mobile First"
              description="Designed for one-handed use. Thumb-friendly controls that work in any lighting."
            />
            <FeatureCard
              icon={<GridIcon />}
              title="Quick Grid Input"
              description="Fast number grid with multiplier buttons. Perfect for rapid score entry during matches."
            />
            <FeatureCard
              icon={<ZoomIcon />}
              title="Pinch to Zoom"
              description="Zoom into the dartboard for precise segment selection. Hit those tight doubles with ease."
            />
          </div>
        </div>
      </section>

      {/* Input Modes Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
            Ready to play?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            No sign up required. Just enter player names and start throwing.
          </p>
          <Button
            onClick={handleStartGame}
            size="lg"
            className="text-lg h-14 px-12"
          >
            <DartLogo className="w-5 h-5 mr-2" />
            Start Playing Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <DartLogo className="w-6 h-6 text-primary" />
            <span className="font-semibold">DartScore</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Built for dart lovers everywhere
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors p-0">
      <CardContent className="p-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
