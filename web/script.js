const puzzleInput = document.getElementById("puzzleInput");
const solveBtn = document.getElementById("solveBtn");
const loadExampleBtn = document.getElementById("loadExampleBtn");
const statusEl = document.getElementById("status");
const movesList = document.getElementById("movesList");

const example = {
  bottles: [
    ["GREEN", "RED", "RED", "RED"],
    ["GREEN", "GREEN", "GREEN", "RED"],
    ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]
  ]
};

loadExampleBtn.addEventListener("click", () => {
  puzzleInput.value = JSON.stringify(example, null, 2);
});

solveBtn.addEventListener("click", async () => {
  const raw = puzzleInput.value.trim();
  if (!raw) {
    statusEl.textContent = "Please enter a puzzle.";
    return;
  }

  let puzzle;
  try {
    puzzle = JSON.parse(raw);
  } catch (err) {
    statusEl.textContent = "Invalid JSON.";
    return;
  }

  if (!puzzle.bottles || !Array.isArray(puzzle.bottles)) {
    statusEl.textContent = "JSON must include a bottles array.";
    return;
  }

  statusEl.textContent = "Solving...";
  movesList.innerHTML = "";

  try {
    const res = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(puzzle)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Request failed");
    }

    if (!data.solved) {
      statusEl.textContent = "No solution found.";
      return;
    }

    statusEl.textContent = `Solved in ${data.moves.length} moves`;
    data.moves.forEach((move) => {
      const li = document.createElement("li");
      li.textContent = move;
      movesList.appendChild(li);
    });
  } catch (err) {
    statusEl.textContent = "Error: " + err.message;
  }
});
