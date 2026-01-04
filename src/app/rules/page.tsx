'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

export default function RulesPage() {
  const router = useRouter();

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
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              Home
            </Button>
            <Button onClick={() => router.push('/settings')} size="sm">
              Start Playing
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Game Rules</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Learn about X01 dart game settings and how to configure your match
            </p>
          </div>

          {/* Starting Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="w-5 h-5 text-primary" />
                Starting Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                X01 games are countdown formats where you start with a set score and race to reach exactly zero.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="text-2xl font-bold text-primary">301</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Quick game format, ideal for beginners or fast matches. Typically takes 10-15 minutes.
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="text-2xl font-bold text-primary">501</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Standard professional format used in most tournaments. The most popular X01 variant.
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="text-2xl font-bold text-primary">701</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Extended format for longer matches. Tests endurance and consistency over more throws.
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="text-2xl font-bold text-primary">Custom</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set any starting score (e.g., 170, 1001). Great for practice or unique game formats.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Match Format */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-primary" />
                Match Format
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Best of vs First to</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                    <div className="font-semibold text-primary">Best of</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Play a fixed number of legs/sets. Winner is whoever wins the majority.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      Example: "Best of 5 legs" means first to win 3 legs wins the match.
                    </p>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                    <div className="font-semibold text-primary">First to</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Race to reach the target number of wins first.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      Example: "First to 3 legs" means match ends when someone wins 3 legs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Legs vs Sets</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                    <div className="font-semibold text-primary">Legs</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      A single game from starting score to zero. The basic unit of play in darts.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      Most casual games use legs only (e.g., "Best of 3 legs").
                    </p>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                    <div className="font-semibold text-primary">Sets</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      A collection of legs. Win a certain number of legs to win a set.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      Used in tournaments like PDC World Championship ("Best of 5 sets, each set best of 5 legs").
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Check-in Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowInIcon className="w-5 h-5 text-primary" />
                Check-in Rules (Starting)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Check-in rules determine how you can start scoring in a leg.
              </p>
              <div className="space-y-3">
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="font-semibold text-primary">Straight In</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start scoring immediately with any dart. No special requirement to begin.
                    This is the most common and beginner-friendly option.
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="font-semibold text-primary">Double In</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    You must hit a double before your score starts counting.
                    All darts before hitting a double are worth zero points.
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="font-semibold text-primary">Master In</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    You must hit a double or triple to start scoring.
                    More flexible than double-in but still requires skill.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Check-out Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowOutIcon className="w-5 h-5 text-primary" />
                Check-out Rules (Finishing)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Check-out rules determine how you must finish the leg to win.
              </p>
              <div className="space-y-3">
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="font-semibold text-primary">Double Out</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    You must finish by hitting a double (or the double bull) to reach exactly zero.
                    This is the standard rule in professional darts. The highest checkout is 170 (T20, T20, Bull).
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="font-semibold text-primary">Master Out</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    You must finish on a double or triple to reach exactly zero.
                    Slightly easier than double-out as triples count too.
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <div className="font-semibold text-primary">Straight Out</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reach exactly zero with any dart. No special requirement to finish.
                    Easiest option, great for beginners or casual play.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Win */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-primary" />
                How to Win
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Winning a Leg</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">1.</span>
                      <span>Reduce your score from the starting value (e.g., 501) to exactly zero</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">2.</span>
                      <span>Your final dart must satisfy the check-out rule (usually a double)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">3.</span>
                      <span>If you go below zero or bust, your turn ends and score resets to what it was before that turn</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Bust Rules</h3>
                  <p className="text-muted-foreground mb-2">
                    A "bust" occurs and your turn is voided if:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Your score goes below zero</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Your score reaches exactly 1 (impossible to finish on a double)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>You reach zero but your final dart wasn't the required check-out type</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Winning the Match</h3>
                  <p className="text-muted-foreground">
                    Win the required number of legs (or sets) based on your match format settings.
                    For "Best of 5 legs," win 3 legs. For "First to 3 legs," win 3 legs before your opponent.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LightbulbIcon className="w-5 h-5 text-primary" />
                Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Common Checkouts</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><span className="text-primary font-mono">170</span> - T20, T20, Bull (highest)</li>
                    <li><span className="text-primary font-mono">167</span> - T20, T19, Bull</li>
                    <li><span className="text-primary font-mono">160</span> - T20, T20, D20</li>
                    <li><span className="text-primary font-mono">100</span> - T20, D20</li>
                    <li><span className="text-primary font-mono">40</span> - D20</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Impossible Finishes (Double Out)</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><span className="text-destructive font-mono">169</span> - No 3-dart checkout</li>
                    <li><span className="text-destructive font-mono">168</span> - No 3-dart checkout</li>
                    <li><span className="text-destructive font-mono">166</span> - No 3-dart checkout</li>
                    <li><span className="text-destructive font-mono">165</span> - No 3-dart checkout</li>
                    <li><span className="text-destructive font-mono">163</span> - No 3-dart checkout</li>
                    <li><span className="text-destructive font-mono">162</span> - No 3-dart checkout</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center pt-8">
            <Button
              onClick={() => router.push('/settings')}
              size="lg"
              className="text-lg h-14 px-12"
            >
              <DartLogo className="w-5 h-5 mr-2" />
              Start Playing Now
            </Button>
          </div>
        </div>
      </main>

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

// Icons
function DartLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M85 5L95 15L60 50L95 85L85 95L50 60L15 95L5 85L40 50L5 15L15 5L50 40L85 5Z" fillOpacity="0.3" />
      <path d="M62 35C62 29 57 25 50 25C43 25 38 29 38 35C38 41 43 44 50 46C57 48 62 51 62 57C62 63 57 67 50 67C43 67 38 63 38 57M50 20V25M50 67V72" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ArrowInIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function ArrowOutIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
