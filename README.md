# Shalty Number 🔢

A speed puzzle game inspired by Schulte Tables. Find all numbers in ascending order before time runs out!

![Shalty Number](public/icon.png)

## 🎮 Features

- **10 Levels** of increasing difficulty (3x3 → 8x9 grids)
- **Leaderboard** with Top 10 high scores (saved locally)
- **Smooth Animations** powered by Framer Motion
- **Mobile Ready** with PWA + Capacitor support
- **Modern UI** with glassmorphism and custom fonts

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🐳 Docker Deployment

```bash
# Using Docker Compose
docker compose up -d

# Or build manually
docker build -t shalty-number .
docker run -p 3000:3000 shalty-number
```

Access at: `http://localhost:3000`

## 📱 Mobile Development

```bash
# Sync with native platforms
npx cap sync

# Open in Android Studio
npx cap open android

# Open in Xcode (macOS only)
npx cap open ios
```

## 🎯 Level Progression

| Level | Grid | Numbers | Time |
|-------|------|---------|------|
| 1 | 3×3 | 9 | 40s |
| 2 | 4×4 | 16 | 40s |
| 3 | 5×5 | 25 | 45s |
| 4 | 5×6 | 30 | 50s |
| 5 | 6×6 | 36 | 55s |
| 6 | 6×7 | 42 | 60s |
| 7 | 7×7 | 49 | 65s |
| 8 | 7×8 | 56 | 70s |
| 9 | 8×8 | 64 | 75s |
| 10 | 8×9 | 72 | 80s |

## 🛠 Tech Stack

- React 19 + TypeScript
- Vite 7
- TailwindCSS 3
- Framer Motion
- Capacitor (iOS/Android)

## 📄 License

MIT
