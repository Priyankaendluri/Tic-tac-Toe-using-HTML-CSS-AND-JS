const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.querySelector('.reset-button');
const statusMessage = document.querySelector('.status-message');

let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

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

function handleClick(e) {
    const cellIndex = [...cells].indexOf(e.target);

    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusMessage.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningConditions.some(([a, b, c]) => {
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];

    cells.forEach(cell => {
        cell.textContent = '';
    });

    statusMessage.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

