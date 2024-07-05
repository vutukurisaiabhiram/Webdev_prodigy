// script.js

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('resetButton').addEventListener('click', resetGame);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const cellIndex = parseInt(clickedCell.getAttribute('id').slice(4)); // get cell index from id (e.g., 'cell0' -> 0)
    
    if (gameState[cellIndex] !== '' || !gameActive) {
        return; // Cell already filled or game over
    }

    gameState[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    
    if (checkWin()) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => {
        return cell !== '';
    });
}

function endGame(draw) {
    if (draw) {
        statusDisplay.innerText = "It's a draw!";
    } else {
        statusDisplay.innerText = `Player ${currentPlayer} wins!`;
    }
    gameActive = false;
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = '');
}
