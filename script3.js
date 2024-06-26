let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.id.split('-')[1]);
        
        if (!gameOver && board[index] === '') {
            board[index] = currentPlayer;
            cell.classList.add(currentPlayer === 'X' ? 'x-mark' : 'o-mark');
            cell.textContent = currentPlayer;

            if (checkWin(currentPlayer)) {
                gameOver = true; // Set gameOver to true
                alert(`Player ${currentPlayer} wins!`);
            } else if (board.every(square => square !== '')) {
                gameOver = true; // Set gameOver to true
                alert("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});


resetButton.addEventListener('click', resetGame);

function checkWin(player) {
    return winningCombos.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    gameOver = false;
}
