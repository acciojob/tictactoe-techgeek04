const playerInput = document.getElementById('player-input');
const gameBoard = document.getElementById('game-board');
const submitButton = document.getElementById('submit');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1, player2, currentPlayer;
let gameActive = false;
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

submitButton.addEventListener('click', startGame);

function startGame() {
    player1 = document.getElementById('player1').value || 'Player 1';
    player2 = document.getElementById('player2').value || 'Player 2';
    currentPlayer = player1;
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    playerInput.style.display = 'none';
    gameBoard.style.display = 'block';
    updateMessage();
}

cells.forEach(cell => cell.addEventListener('click', () => handleCellClick(cell)));

function updateMessage() {
    messageDiv.textContent = `${currentPlayer}, you're up`;
}

function handleCellClick(cell) {
    const cellIndex = parseInt(cell.id) - 1;
    if (gameState[cellIndex] !== '' || !gameActive) return;

    const currentSymbol = currentPlayer === player1 ? 'X' : 'O';
    gameState[cellIndex] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWin()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        gameActive = false;
        return;
    }
    if (checkDraw()) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateMessage();
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === (currentPlayer === player1 ? 'X' : 'O');
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}
