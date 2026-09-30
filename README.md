# Number Maze

A small React number memory challenge. Memorize the digits before they fade, type them back, and see how far you can go.

Built for fun and React practice — then polished to keep the same game feeling fresher.

## 🎮 Play Online

**[Play Number Maze](https://numbermaze.netlify.app/)**

## About

Number Maze shows you a randomly generated number for a short time. Once it disappears, you re-type what you remember.

Get it right and the levels climb. Miss three times and the run is over.

This started as a personal project to practice React. The recent updates focus on cleaning up branding and polishing the UI — not rebuilding the game from scratch.

## How It Works

1. A number appears on screen.
2. After a short delay, it fades into dots.
3. Type the number you remembered and submit.
4. Correct answers advance through sub-levels, then longer digit counts.
5. Three wrong answers end the run — hit **Restart** to try again.

Difficulty scales with your progress: higher main levels mean longer numbers and a bit more time to memorize them.

## Features

- Random number generation that grows longer as levels increase
- Timed fade that hides the number after a short delay
- Main / sub-level progression (three sub-levels per main level)
- Wrong-answer limit of three before game over
- Restart anytime to begin a fresh run
- Brief correct / incorrect visual feedback
- Responsive layout for desktop and smaller screens

## Tech Stack

- React 18
- Vite 5
- JavaScript (JSX)
- CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js and npm

### Setup

```bash
git clone <repository-url>
cd NumberMaze
npm install
```

### Run locally

```bash
npm run dev
```

### Other scripts

```bash
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project Structure

```text
NumberMaze/
├── public/                 # static assets
├── src/
│   ├── App.jsx             # app entry component
│   ├── main.jsx            # React mount
│   ├── index.css           # base styles
│   ├── assets/             # images / icons
│   └── Components/
│       ├── test.jsx        # active Number Maze game UI
│       ├── MemGame.jsx     # alternate game component
│       └── MemGame.css     # game styles
├── index.html
├── package.json
└── vite.config.js
```

## Why I Built It

Number Maze began as an older fun project while learning React. The goal was simple: make a tiny memory game and get comfortable with components, state, and UI.

This update keeps that original spirit. Same challenge, same flow — just a cleaner presentation and a bit more polish.
