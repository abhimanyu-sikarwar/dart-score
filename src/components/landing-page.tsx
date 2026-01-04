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
          <Button onClick={handleStartGame} size="sm">
            Start Playing
          </Button>
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
                  Quick input, multiple game modes, instant results.
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

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">501</div>
                  <div className="text-sm text-muted-foreground">Classic Mode</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">301</div>
                  <div className="text-sm text-muted-foreground">Quick Game</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">Cricket</div>
                  <div className="text-sm text-muted-foreground">Strategy</div>
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
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">501</div>
                        <div className="text-xs text-muted-foreground">Player 1&apos;s turn</div>
                      </div>

                      {/* Score cards preview */}
                      <div className="space-y-2">
                        <div className="bg-card rounded-lg p-3 border border-primary/50">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Player 1</span>
                            <span className="text-2xl font-bold">341</span>
                          </div>
                        </div>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Player 2</span>
                            <span className="text-2xl font-bold">285</span>
                          </div>
                        </div>
                      </div>

                      {/* Input preview */}
                      <div className="bg-card rounded-lg p-3 space-y-2">
                        <div className="flex justify-center gap-2">
                          <div className="px-3 py-1 bg-primary/20 rounded text-sm">T20</div>
                          <div className="px-3 py-1 bg-primary/20 rounded text-sm">T20</div>
                          <div className="px-3 py-1 bg-muted rounded text-sm">-</div>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {[1, 2, 3, 4, 5].map(n => (
                            <div key={n} className="aspect-square bg-secondary rounded flex items-center justify-center text-sm font-medium">
                              {n}
                            </div>
                          ))}
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
              Designed for quick score entry and seamless gameplay tracking
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<TargetIcon />}
              title="Multiple Game Modes"
              description="Play 501, 301, or Cricket. Switch between modes instantly."
            />
            <FeatureCard
              icon={<UsersIcon />}
              title="Unlimited Players"
              description="Track scores for 1 or more players. Perfect for group games."
            />
            <FeatureCard
              icon={<ZapIcon />}
              title="Quick Score Entry"
              description="Tap the number, then single/double/triple. It's that simple."
            />
            <FeatureCard
              icon={<UndoIcon />}
              title="Undo Support"
              description="Made a mistake? Undo individual darts or entire turns."
            />
            <FeatureCard
              icon={<SmartphoneIcon />}
              title="Mobile First"
              description="Designed for one-handed use with thumb-friendly controls."
            />
            <FeatureCard
              icon={<TrophyIcon />}
              title="Win Detection"
              description="Automatic bust detection and double-out validation for 501/301."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

function ZapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
