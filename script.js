// Select all game cells, reset button, new game button, result display, and winner message element
let gameCells = document.querySelectorAll(".gameCell");
let resetbutton = document.querySelector(".resetGame");
let newGame = document.querySelector("#newGame");
let gameResult = document.querySelector(".gameResult");
let winnerMsg = document.querySelector("#winnerMsg");

let turn = "X"; // Initial turn set to 'X'
let clickCounter = 0; // Counter to keep track of the number of clicks

// Array of winning patterns (indices that form a winning line)
let winningPatternArray = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game state
const resetGame = () => {
  enableCells(); // Enable all cells
  turn = "X"; // Reset turn to 'X'
  clickCounter = 0; // Reset click counter
  gameResult.classList.add("hide"); // Hide the result message
  document.querySelector(".playerTurn").innerText = "Player X turn"; // Reset player turn display
};

// Function to disable all cells (prevent further clicks)
const disableCells = () => {
  for (let cell of gameCells) {
    cell.disabled = true; // Disable each cell
  }
};

// Function to enable and reset all cells for a new game
const enableCells = () => {
  for (let cell of gameCells) {
    cell.disabled = false; // Enable each cell
    cell.innerText = ""; // Clear cell content
    cell.style.backgroundColor = "#fff5e1"; // Reset background color
  }
};

// Function to change the turn between 'X' and 'O'
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Function to display the winner and highlight the winning pattern
const displayWinner = (winner, pattern) => {
  // Highlight the cells in the winning pattern
  for (let index of pattern) {
    gameCells[index].style.backgroundColor = "rgba(75, 61, 51, 0.907)"; // Change color of winning cells
  }
  winnerMsg.innerText = `Congratulations! Winner is ${winner}`; // Display winner message
  gameResult.classList.remove("hide"); // Show the result message
  disableCells(); // Disable further moves
};

// Function to check for a winner by iterating through winning patterns
const checkWinner = () => {
  for (let pattern of winningPatternArray) {
    let pos1Value = gameCells[pattern[0]].innerText;
    let pos2Value = gameCells[pattern[1]].innerText;
    let pos3Value = gameCells[pattern[2]].innerText;

    // Check if all three positions in the pattern are equal and not empty
    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        displayWinner(pos1Value, pattern); // Display the winner and highlight the pattern
        return true;
      }
    }
  }
  return false;
};

// Function to check if the game is a draw
const checkDraw = () => {
  winnerMsg.innerText = `Draw!`; // Display draw message
  gameResult.classList.remove("hide"); // Show the result message
  disableCells(); // Disable further moves
};

// Add click event listeners to each cell to handle player moves
gameCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.innerText === "") { // Check if the cell is empty
      cell.innerText = turn; // Place the current player's mark
      clickCounter++; // Increment the click counter

      // Update turn and display the current player's turn
      turn = changeTurn();
      document.querySelector(".playerTurn").innerText = "Player " + turn + " turn";

      let isWinner = checkWinner(); // Check for a win after each move

      // If all cells are filled and there's no winner, declare a draw
      if (clickCounter === 9 && !isWinner) {
        checkDraw();
      }
    }
  });
});

// Add event listeners to reset and new game buttons
resetbutton.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
