# Water Sort Puzzle - 100 Levels Game

A polished, mobile-first water sort puzzle game with 100 levels built with Go backend solver + HTML5/CSS3/JavaScript frontend.

## Features

✨ **100 Levels** - Progressive difficulty from easy to extreme

🎮 **Playable Game** - Tap to select, tap again to pour into another bottle

🤖 **Smart Solver** - Click "Show Solution" to see optimal moves from the Go solver

📱 **Mobile Optimized** - Works perfectly on iPhone and Android

⭐ **Star Ratings** - Earn stars based on how efficiently you solve each puzzle

🎨 **Beautiful UI** - Polished gradients, smooth animations, and responsive design

## Run Locally

```bash
go run . --serve
```

Then open: `http://localhost:8080`

## How to Play

1. **Tap** a bottle to select it
2. **Tap** another bottle to pour the liquid into it
3. **Goal**: Sort all colors so each bottle has only one color
4. **Hint**: Click "Show Solution" to see the optimal move sequence
5. **Progress**: Beat all 100 levels!

## Star System

- ⭐⭐⭐ Complete in optimal moves or fewer
- ⭐⭐ Complete with a few extra moves
- ⭐ Complete with many moves

## Notes

The game uses the Go solver backend to calculate solutions, ensuring every puzzle is solvable and the solution is optimal.
