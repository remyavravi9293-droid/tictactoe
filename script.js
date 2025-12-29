const gameboard = document.getElementById('gameboard');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupRestartButton = document.getElementById('popup-restart');
const popupContent = document.getElementById('popup-content');

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

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());


    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} has won!`;
        showPopup(false);
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        status.textContent = `Game ended in a draw!`;
        showPopup(true);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `It's ${currentPlayer}'s turn`;
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

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
    popup.style.display = 'none';
}

function showPopup(isDraw) {
    if (isDraw) {
        popupMessage.textContent = "It's a draw!";
        popupContent.classList.remove('win');
        popupContent.classList.add('draw');
    } else {
        popupMessage.textContent = `Player ${currentPlayer} has won!`;
        popupContent.classList.remove('draw');
        popupContent.classList.add('win');
    }
    popup.style.display = 'flex';
}

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-cell-index', i);
    cell.addEventListener('click', handleCellClick);
    gameboard.appendChild(cell);
}

status.textContent = `It's ${currentPlayer}'s turn`;
restartButton.addEventListener('click', restartGame);
popupRestartButton.addEventListener('click', restartGame);
