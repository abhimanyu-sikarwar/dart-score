# DartScore

A modern, mobile-first dart scoring app for tracking X01 and Cricket games with friends.

**Live Demo:** [dart.abhimanyusikarwar.com](https://dart.abhimanyusikarwar.com/)

## Features

- **X01 Games** - Play 301, 501, 701, or any custom starting score
- **Cricket Mode** - Standard Cricket with 15-20 and Bull tracking
- **Flexible Match Settings**
  - Best of / First to format
  - Legs and Sets support
  - Double-in, Double-out, Master-in/out options
- **Dual Input Modes** - Quick number grid or interactive dartboard
- **Full Undo Support** - Remove individual darts or undo entire turns
- **Smart Win Detection** - Automatic bust detection and double-out validation
- **Throw History** - Expandable player rows to view all previous throws
- **Dark/Light Mode** - Toggle between themes
- **Mobile First** - Designed for one-handed use with thumb-friendly controls
- **PWA Ready** - Works offline and can be installed on mobile devices

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/anthropics/dart-score.git
cd dart-score

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── game/            # Game play screen
│   ├── rules/           # Game rules documentation
│   └── settings/        # Game setup & configuration
├── components/          # React components
│   ├── ui/              # shadcn/ui components
│   ├── scoreboard.tsx   # Player score table
│   ├── dart-input.tsx   # Score input (grid + dartboard)
│   └── ...
├── hooks/               # Custom React hooks
│   └── use-game-state.ts
└── lib/                 # Utilities and game logic
    ├── game-logic.ts    # Scoring calculations
    └── types.ts         # TypeScript types
```

## How to Play

1. **Start a Game** - Click "Start Playing" and select X01 or Cricket
2. **Add Players** - Enter player names (2+ players supported)
3. **Configure Settings** - Choose starting score, match format, and in/out rules
4. **Score Throws** - Use the number grid or dartboard to enter each dart
5. **Submit Turns** - After 3 darts (or fewer), submit to move to the next player
6. **Win** - First player to reach exactly 0 (with required checkout) wins the leg

## License

MIT

## Author

Built by [Abhimanyu Sikarwar](https://abhimanyusikarwar.com)
