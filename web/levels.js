// 100 Water Sort Puzzle Levels
const LEVELS = [
  // Level 1 - Easy
  [["GREEN", "RED", "RED", "RED"], ["GREEN", "GREEN", "GREEN", "RED"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 2 - Easy
  [["BLUE", "BLUE", "BLUE", "RED"], ["RED", "RED", "RED", "BLUE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 3 - Easy
  [["YELLOW", "YELLOW", "BLUE", "BLUE"], ["BLUE", "BLUE", "YELLOW", "YELLOW"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 4 - Easy
  [["PINK", "PINK", "GREEN", "GREEN"], ["GREEN", "GREEN", "PINK", "PINK"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 5 - Easy
  [["ORANGE", "ORANGE", "PURPLE", "PURPLE"], ["PURPLE", "PURPLE", "ORANGE", "ORANGE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 6 - Medium
  [["RED", "BLUE", "RED", "BLUE"], ["RED", "BLUE", "RED", "BLUE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 7 - Medium
  [["GREEN", "YELLOW", "GREEN", "YELLOW"], ["GREEN", "YELLOW", "GREEN", "YELLOW"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 8 - Medium
  [["PINK", "ORANGE", "PINK", "ORANGE"], ["PINK", "ORANGE", "PINK", "ORANGE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 9 - Medium
  [["PURPLE", "GRAY", "PURPLE", "GRAY"], ["PURPLE", "GRAY", "PURPLE", "GRAY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 10 - Medium
  [["RED", "GREEN", "BLUE", "RED"], ["GREEN", "BLUE", "RED", "GREEN"], ["BLUE", "RED", "GREEN", "BLUE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 11 - Medium
  [["YELLOW", "PINK", "ORANGE", "YELLOW"], ["PINK", "ORANGE", "YELLOW", "PINK"], ["ORANGE", "YELLOW", "PINK", "ORANGE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 12 - Medium
  [["PURPLE", "GRAY", "RED", "PURPLE"], ["GRAY", "RED", "PURPLE", "GRAY"], ["RED", "PURPLE", "GRAY", "RED"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 13 - Hard
  [["RED", "BLUE", "GREEN", "YELLOW", "RED"], ["BLUE", "GREEN", "YELLOW", "RED", "BLUE"], ["GREEN", "YELLOW", "RED", "BLUE", "GREEN"], ["YELLOW", "RED", "BLUE", "GREEN", "YELLOW"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 14 - Hard
  [["PINK", "ORANGE", "PURPLE", "GRAY", "PINK"], ["ORANGE", "PURPLE", "GRAY", "PINK", "ORANGE"], ["PURPLE", "GRAY", "PINK", "ORANGE", "PURPLE"], ["GRAY", "PINK", "ORANGE", "PURPLE", "GRAY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 15 - Hard
  [["DARK_BLUE", "LIGHT_GREEN", "COFFEE", "RED", "DARK_BLUE"], ["LIGHT_GREEN", "COFFEE", "RED", "DARK_BLUE", "LIGHT_GREEN"], ["COFFEE", "RED", "DARK_BLUE", "LIGHT_GREEN", "COFFEE"], ["RED", "DARK_BLUE", "LIGHT_GREEN", "COFFEE", "RED"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 16 - Medium
  [["RED", "RED", "BLUE", "BLUE"], ["BLUE", "BLUE", "RED", "RED"], ["GREEN", "GREEN", "YELLOW", "YELLOW"], ["YELLOW", "YELLOW", "GREEN", "GREEN"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 17 - Medium
  [["PINK", "PINK", "ORANGE", "ORANGE"], ["ORANGE", "ORANGE", "PINK", "PINK"], ["PURPLE", "PURPLE", "GRAY", "GRAY"], ["GRAY", "GRAY", "PURPLE", "PURPLE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 18 - Hard
  [["RED", "BLUE", "GREEN", "RED", "BLUE"], ["GREEN", "RED", "BLUE", "GREEN", "RED"], ["BLUE", "GREEN", "RED", "BLUE", "GREEN"], ["YELLOW", "PINK", "ORANGE", "YELLOW", "PINK"], ["ORANGE", "YELLOW", "PINK", "ORANGE", "YELLOW"], ["PINK", "ORANGE", "YELLOW", "PINK", "ORANGE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 19 - Hard
  [["PURPLE", "GRAY", "COFFEE", "DARK_GREEN", "PURPLE"], ["GRAY", "COFFEE", "DARK_GREEN", "PURPLE", "GRAY"], ["COFFEE", "DARK_GREEN", "PURPLE", "GRAY", "COFFEE"], ["DARK_GREEN", "PURPLE", "GRAY", "COFFEE", "DARK_GREEN"], ["LIGHT_GREEN", "PINK", "ORANGE", "LIGHT_GREEN", "PINK"], ["ORANGE", "LIGHT_GREEN", "PINK", "ORANGE", "LIGHT_GREEN"], ["PINK", "ORANGE", "LIGHT_GREEN", "PINK", "ORANGE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
  // Level 20 - Hard
  [["RED", "BLUE", "GREEN", "YELLOW", "PINK"], ["ORANGE", "PURPLE", "GRAY", "COFFEE", "DARK_BLUE"], ["LIGHT_GREEN", "DARK_GREEN", "RED", "BLUE", "GREEN"], ["YELLOW", "PINK", "ORANGE", "PURPLE", "GRAY"], ["COFFEE", "DARK_BLUE", "LIGHT_GREEN", "DARK_GREEN", "RED"], ["BLUE", "GREEN", "YELLOW", "PINK", "ORANGE"], ["PURPLE", "GRAY", "COFFEE", "DARK_BLUE", "LIGHT_GREEN"], ["DARK_GREEN", "RED", "BLUE", "GREEN", "YELLOW"], ["PINK", "ORANGE", "PURPLE", "GRAY", "COFFEE"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"], ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]],
];

// Generate remaining 80 levels programmatically
const colors = ["RED", "BLUE", "GREEN", "YELLOW", "PINK", "ORANGE", "PURPLE", "GRAY", "COFFEE", "DARK_BLUE", "LIGHT_GREEN", "DARK_GREEN"];

function generateLevel(difficulty) {
  const bottleCount = Math.floor(difficulty / 2) + 3;
  const depth = 4;
  const emptyBottles = 2;
  const usedColors = colors.slice(0, Math.min(bottleCount - emptyBottles, colors.length));
  
  let bottles = [];
  for (let i = 0; i < bottleCount - emptyBottles; i++) {
    const bottle = [];
    const selectedColor = usedColors[i % usedColors.length];
    for (let j = 0; j < depth; j++) {
      bottle.push(usedColors[Math.floor(Math.random() * usedColors.length)]);
    }
    bottles.push(bottle);
  }
  
  for (let i = 0; i < emptyBottles; i++) {
    bottles.push(["EMPTY", "EMPTY", "EMPTY", "EMPTY"]);
  }
  
  return bottles.sort(() => Math.random() - 0.5);
}

for (let i = 20; i < 100; i++) {
  const difficulty = Math.floor(i / 5);
  LEVELS.push(generateLevel(difficulty));
}

console.log(`Loaded ${LEVELS.length} puzzle levels`);
