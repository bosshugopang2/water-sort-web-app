const EMPTY = "EMPTY";

const colorMap = {
  RED: "color-red",
  GREEN: "color-green",
  BLUE: "color-blue",
  YELLOW: "color-yellow",
  PINK: "color-pink",
  ORANGE: "color-orange",
  PURPLE: "color-purple",
  GRAY: "color-gray",
  COFFEE: "color-coffee",
  DARK_GREEN: "color-dark-green",
  DARK_BLUE: "color-dark-blue",
  LIGHT_GREEN: "color-light-green",
  BLACK: "color-black",
  WHITE: "color-white",
};

const boardEl = document.getElementById("board");
const statusText = document.getElementById("statusText");
const movesList = document.getElementById("movesList");
const movesCount = document.getElementById("movesCount");
const levelNum = document.getElementById("levelNum");
const resetBtn = document.getElementById("resetBtn");
const solveBtn = document.getElementById("solveBtn");
const completeModal = document.getElementById("completeModal");
const levelSelectModal = document.getElementById("levelSelectModal");
const solutionPanel = document.getElementById("solutionPanel");
const backBtn = document.getElementById("backBtn");
const closeSolutionBtn = document.getElementById("closeSolutionBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const retryBtn = document.getElementById("retryBtn");
const closeLevelSelectBtn = document.getElementById("closeLevelSelectBtn");

let currentLevel = 1;
let gameState = [];
let originalPuzzle = [];
let selectedBottle = null;
let movesMade = 0;

function cloneState(state) {
  return state.map((bottle) => [...bottle]);
}

function isEmptyCell(value) {
  return value === EMPTY;
}

function getTopColor(bottle) {
  for (let i = bottle.length - 1; i >= 0; i--) {
    if (!isEmptyCell(bottle[i])) return bottle[i];
  }
  return EMPTY;
}

function countSameColor(bottle, color) {
  let count = 0;
  for (let i = 0; i < bottle.length; i++) {
    if (bottle[i] === color) count++;
    else if (!isEmptyCell(bottle[i])) break;
  }
  return count;
}

function getFirstEmptyIndex(bottle) {
  for (let i = 0; i < bottle.length; i++) {
    if (isEmptyCell(bottle[i])) return i;
  }
  return -1;
}

function getTopColorIndex(bottle) {
  for (let i = bottle.length - 1; i >= 0; i--) {
    if (!isEmptyCell(bottle[i])) return i;
  }
  return -1;
}

function canPour(sourceBottle, targetBottle) {
  if (!sourceBottle || !targetBottle) return false;

  const sourceColor = getTopColor(sourceBottle);
  if (sourceColor === EMPTY) return false;

  const targetTopColor = getTopColor(targetBottle);
  if (targetTopColor !== EMPTY && targetTopColor !== sourceColor) return false;

  const sourceSameCount = countSameColor(sourceBottle, sourceColor);
  const targetEmptyCount = targetBottle.filter((v) => v === EMPTY).length;

  if (sourceSameCount > targetEmptyCount) return false;

  if (sourceColor === sourceBottle[0] && targetBottle[0] === EMPTY) return false;
  if (sourceBottle === targetBottle) return false;

  return true;
}

function performPour(sourceIndex, targetIndex) {
  const from = gameState[sourceIndex];
  const to = gameState[targetIndex];

  if (!canPour(from, to)) return false;

  const sourceColor = getTopColor(from);
  const fromIndexTop = getTopColorIndex(from);
  const targetEmptyIndex = getFirstEmptyIndex(to);

  if (fromIndexTop === -1 || targetEmptyIndex === -1) return false;

  from[fromIndexTop] = EMPTY;
  to[targetEmptyIndex] = sourceColor;
  movesMade++;
  movesCount.textContent = movesMade;
  return true;
}

function isSolved(board) {
  for (const bottle of board) {
    const nonEmpty = bottle.filter((v) => !isEmptyCell(v));
    if (nonEmpty.length === 0) continue;

    const first = nonEmpty[0];
    const allSame = nonEmpty.every((v) => v === first);
    if (!allSame) return false;
  }
  return true;
}

function renderBoard() {
  boardEl.innerHTML = "";

  gameState.forEach((bottle, index) => {
    const bottleEl = document.createElement("div");
    bottleEl.className = `bottle ${selectedBottle === index ? "selected" : ""}`;
    bottleEl.dataset.index = String(index);
    bottleEl.setAttribute("role", "button");
    bottleEl.setAttribute("tabindex", "0");

    bottle.forEach((cellValue) => {
      const cell = document.createElement("div");
      const empty = isEmptyCell(cellValue);
      cell.className = `cell ${empty ? "empty" : colorMap[cellValue] || "empty"}`;
      bottleEl.appendChild(cell);
    });

    bottleEl.addEventListener("click", () => handleBottleClick(index));
    bottleEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleBottleClick(index);
    });
    boardEl.appendChild(bottleEl);
  });
}

function handleBottleClick(index) {
  if (selectedBottle === null) {
    selectedBottle = index;
    statusText.textContent = `Bottle ${index + 1} selected. Tap another bottle to pour.`;
    renderBoard();
    return;
  }

  if (selectedBottle === index) {
    selectedBottle = null;
    statusText.textContent = "Selection cleared.";
    renderBoard();
    return;
  }

  const success = performPour(selectedBottle, index);
  if (!success) {
    statusText.textContent = "Invalid move!";
    selectedBottle = null;
    renderBoard();
    return;
  }

  selectedBottle = null;
  statusText.textContent = `Poured bottle ${selectedBottle + 1} into bottle ${index + 1}.`;
  renderBoard();

  if (isSolved(gameState)) {
    showCompleteModal();
  }
}

function resetGame() {
  gameState = cloneState(originalPuzzle);
  selectedBottle = null;
  movesMade = 0;
  movesCount.textContent = "0";
  solutionPanel.classList.remove("visible");
  statusText.textContent = "Tap a bottle to select it";
  renderBoard();
}

function loadLevel(level) {
  if (level < 1 || level > LEVELS.length) return;
  
  currentLevel = level;
  levelNum.textContent = currentLevel;
  originalPuzzle = JSON.parse(JSON.stringify(LEVELS[currentLevel - 1]));
  resetGame();
  completeModal.classList.add("hidden");
  levelSelectModal.classList.add("hidden");
}

function showCompleteModal() {
  const starsEarned = Math.max(3 - Math.floor(movesMade / 5), 1);
  document.getElementById("levelCompleteText").textContent =
    `You completed Level ${currentLevel} in ${movesMade} moves!`;
  
  // Clear stars
  for (let i = 1; i <= 3; i++) {
    const star = document.getElementById(`star${i}`);
    star.classList.remove("earned");
  }
  
  // Animate stars
  setTimeout(() => {
    for (let i = 1; i <= starsEarned; i++) {
      const star = document.getElementById(`star${i}`);
      star.classList.add("earned");
    }
  }, 200);
  
  completeModal.classList.remove("hidden");
}

function showLevelSelect() {
  const grid = document.getElementById("levelGrid");
  grid.innerHTML = "";
  
  for (let i = 1; i <= LEVELS.length; i++) {
    const btn = document.createElement("button");
    btn.className = "level-btn";
    btn.textContent = i;
    btn.addEventListener("click", () => loadLevel(i));
    grid.appendChild(btn);
  }
  
  levelSelectModal.classList.remove("hidden");
}

async function solveCurrentPuzzle() {
  const payload = { bottles: gameState };
  statusText.textContent = "Calculating solution...";
  solveBtn.disabled = true;

  try {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.solved) {
      statusText.textContent = "No solution found!";
      movesList.innerHTML = "";
      return;
    }

    movesList.innerHTML = "";
    document.getElementById("movesTotal").textContent = data.moves.length;
    data.moves.forEach((move) => {
      const li = document.createElement("li");
      li.textContent = move;
      movesList.appendChild(li);
    });

    statusText.textContent = `Solution: ${data.moves.length} moves`;
    solutionPanel.classList.add("visible");
  } catch (err) {
    statusText.textContent = "Failed to load solution.";
  } finally {
    solveBtn.disabled = false;
  }
}

resetBtn.addEventListener("click", resetGame);
solveBtn.addEventListener("click", solveCurrentPuzzle);
backBtn.addEventListener("click", showLevelSelect);
closeSolutionBtn.addEventListener("click", () => solutionPanel.classList.remove("visible"));
nextLevelBtn.addEventListener("click", () => {
  if (currentLevel < LEVELS.length) loadLevel(currentLevel + 1);
});
retryBtn.addEventListener("click", resetGame);
closeLevelSelectBtn.addEventListener("click", () => levelSelectModal.classList.add("hidden"));

loadLevel(1);
