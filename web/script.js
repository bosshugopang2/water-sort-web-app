const EMPTY = "EMPTY";
const examplePuzzle = {
  bottles: [
    ["GREEN", "RED", "RED", "RED"],
    ["GREEN", "GREEN", "GREEN", "RED"],
    ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]
  ]
};

const boardEl = document.getElementById("board");
const statusText = document.getElementById("statusText");
const movesList = document.getElementById("movesList");
const resetBtn = document.getElementById("resetBtn");
const exampleBtn = document.getElementById("exampleBtn");
const solveBtn = document.getElementById("solveBtn");

let originalPuzzle = JSON.parse(JSON.stringify(examplePuzzle.bottles));
let gameState = cloneState(originalPuzzle);
let selectedBottle = null;

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

    bottle.forEach((cellValue, cellIndex) => {
      const cell = document.createElement("div");
      const empty = isEmptyCell(cellValue);
      cell.className = `cell ${empty ? "empty" : ""}`;
      cell.style.background = empty ? "rgba(148,163,184,0.18)" : getColor(cellValue);
      cell.textContent = empty ? "" : cellValue;
      bottleEl.appendChild(cell);
    });

    bottleEl.addEventListener("click", () => handleBottleClick(index));
    boardEl.appendChild(bottleEl);
  });
}

function getColor(value) {
  const palette = {
    RED: "#ef4444",
    GREEN: "#22c55e",
    BLUE: "#3b82f6",
    YELLOW: "#facc15",
    PINK: "#ec4899",
    ORANGE: "#f97316",
    PURPLE: "#a855f7",
    GRAY: "#94a3b8",
    COFFEE: "#a16207",
    DARK_GREEN: "#166534",
    DARK_BLUE: "#1d4ed8",
    LIGHT_GREEN: "#4ade80",
    BLACK: "#111827",
    WHITE: "#f8fafc",
    EMPTY: "#cbd5e1",
  };

  return palette[value] || "#cbd5e1";
}

function handleBottleClick(index) {
  if (selectedBottle === null) {
    selectedBottle = index;
    statusText.textContent = `Selected bottle ${index + 1}. Choose another bottle to pour into.`;
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
    statusText.textContent = "That move is not allowed.";
    selectedBottle = index;
    renderBoard();
    return;
  }

  selectedBottle = null;
  statusText.textContent = `Moved from bottle ${selectedBottle + 1} to bottle ${index + 1}.`;
  renderBoard();

  if (isSolved(gameState)) {
    statusText.textContent = "You solved the puzzle!";
  }
}

function resetGame() {
  gameState = cloneState(originalPuzzle);
  selectedBottle = null;
  movesList.innerHTML = "";
  statusText.textContent = "Puzzle reset. Select a bottle to start.";
  renderBoard();
}

function loadExample() {
  originalPuzzle = JSON.parse(JSON.stringify(examplePuzzle.bottles));
  resetGame();
}

async function solveCurrentPuzzle() {
  const payload = { bottles: gameState };
  statusText.textContent = "Calculating solution...";

  try {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!data.solved) {
      statusText.textContent = "No solution found for this puzzle.";
      movesList.innerHTML = "";
      return;
    }

    movesList.innerHTML = "";
    data.moves.forEach((move) => {
      const li = document.createElement("li");
      li.textContent = move;
      movesList.appendChild(li);
    });

    statusText.textContent = `Solved in ${data.moves.length} moves.`;
  } catch (err) {
    statusText.textContent = "Solver failed to respond.";
  }
}

resetBtn.addEventListener("click", resetGame);
exampleBtn.addEventListener("click", loadExample);
solveBtn.addEventListener("click", solveCurrentPuzzle);

renderBoard();
