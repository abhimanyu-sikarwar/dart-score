'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
              <div className="flex flex-wrap gap-4 pt-4">
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
              </div>
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
                            <div className="text-[10px] text-muted-foreground">Player 1&apos;s turn</div>
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
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs">P1</div>
                              <span className="font-medium text-sm">Player 1</span>
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
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs">P2</div>
                              <span className="font-medium text-sm">Player 2</span>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
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

function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function CricketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function UndoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function DartboardIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}
