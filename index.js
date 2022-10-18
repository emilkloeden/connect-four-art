let turnCount = 0;
const numRows = 6;
const numColumns = 7;
const winLength = 4;
let winState = false;
let root = document.documentElement;

let board = resetBoard()

// red, gold
const colors = ["red", "gold"]
let coinsRemaining = [21, 21];
let currentlySelected = 0;

const board = Array(42)

function placeCoin(e) {
    const { target } = e;
    if (target.hasAttribute('data-color') && target.getAttribute('data-color') == currentlySelected) {
        updateState('REMOVED', target)
    } else {
        try {
            const rowIndex = getNextCell(colIndex);
            board[rowIndex][colIndex] = turnCount++ % 2;
            reDrawBoard();
            winState = checkForWin(rowIndex, colIndex);
        } catch (e) {
            console.warn(e)
        }
    }
}



/**
 * reDrawBoard() repaints the UI based on the current board state
 * by setting a 'data-color' attribute on each element 
 * of class '.game-col' corresponding to the value of the 
 * corresponding cell in 'board'
 */
function reDrawBoard() {
    document.querySelectorAll('.game-row').forEach((row, i) => {
        row.querySelectorAll('.game-col').forEach((cell, j) => {
            if (board[i][j] === 0) {
                cell.setAttribute('data-color', '0')
            } else if (board[i][j] === 1) {
                cell.setAttribute('data-color', '1')
            }
        })
    })
}

/**
 * checkForWin(rowIndex, colIndex) returns true if last play
 * results in a win for either player
 * @param {*} rowIndex 
 * @param {*} colIndex 
 * @returns 
 */
function checkForWin(rowIndex, colIndex) {
    const horizontalWinner = checkForHorizontalWin(rowIndex, colIndex);
    if (horizontalWinner) {
        drawWin(horizontalWinner)
        return true;
    }
    const verticalWinner = checkForVerticalWin(rowIndex, colIndex);
    if (verticalWinner) {
        drawWin(verticalWinner);
        return true;
    }
    const forwardDiagonalWinner = checkForForwardDiagonalWin(rowIndex, colIndex);
    if (forwardDiagonalWinner) {
        drawWin(forwardDiagonalWinner);
        return true; // TODO, consider printing all winners. Would require a flag, and each checkFor...Winner function to return an array of slices
    }
    const backwardDiagonalWinner = checkForBackwardDiagonalWin(rowIndex, colIndex);
    if (backwardDiagonalWinner) {
        drawWin(backwardDiagonalWinner);
        return true; // TODO, consider printing all winners. Would require a flag, and each checkFor...Winner function to return an array of slices
    }
    return false;
}

/**
 * drawWin(winningSlice) draws the board UI in the event of a win
 * @param {Array<CellData>} winningSlice 
 */
function drawWin(winningSlice) {
    const winningColor = winningSlice[0].columnValue;
    colorBackgroundInWinningColor(winningColor);
    drawWinningSlice(winningSlice);
}

/**
 * colorBackgroundInWinningColor(winningColor) 
 * colors all cells with the winner's color
 * @param {*} winningColor 
 */
function colorBackgroundInWinningColor(winningColor) {
    document.querySelectorAll('.game-row').forEach(row => row.setAttribute('data-bg-color', `${winningColor}`));
}

/**
 * drawWinningSlice(winningSlice)
 * colors cells in 'winningSlice' with var(--win-color)
 * by setting the cell's 'data-color' atribute to 2
 * @param {*} winningSlice 
 */
function drawWinningSlice(winningSlice) {
    document.querySelectorAll('.game-row').forEach((row, i) => {
        row.querySelectorAll('.game-col').forEach((cell, j) => {
            winningSlice.forEach(winningCell => {
                if (winningCell.rowIndex === i && winningCell.columnIndex === j) {
                    cell.setAttribute('data-color', '2');
                }
            });
        });
    });
}

function checkForHorizontalWin(rowIndex, colIndex) {
    const row = board[rowIndex];
    const currentCellValue = board[rowIndex][colIndex]
    const slices = getRowSlices(row, rowIndex, colIndex);
    const winningSlice = slices.find(slice => slice.every(cell => cell.columnValue === currentCellValue))
    return winningSlice;
}

function getRowSlices(row, rowIndex, colIndex) {
    const slices = [];
    for (let i = winLength - 1; i >= 0; i--) {
        if (colIndex - i >= 0 && colIndex - i + winLength <= numColumns) {
            let slice = row.slice(colIndex - i, colIndex - i + winLength);
            slices.push(slice.map((columnValue, sliceIndex) => { return { rowIndex, columnIndex: colIndex - i + sliceIndex, columnValue } }))
        }
    }

    return slices;
}

function checkForVerticalWin(rowIndex, colIndex) {
    const currentCellValue = board[rowIndex][colIndex]
    const column = getColumn(colIndex)
    const slices = getColumnSlices(column, rowIndex, colIndex);
    const winningSlice = slices.find(slice => slice.every(cell => cell.columnValue === currentCellValue))
    return winningSlice;
}

function getColumnSlices(column, rowIndex, colIndex) {
    const slices = [];
    for (let i = winLength - 1; i >= 0; i--) {
        if (rowIndex - i >= 0 && rowIndex - i + winLength <= numRows) {
            let slice = column.slice(rowIndex - i, rowIndex - i + winLength);
            slices.push(slice.map((columnValue, sliceIndex) => { return { rowIndex: rowIndex - i + sliceIndex, columnIndex: colIndex, columnValue } }))
        }
    }

    return slices;
}

function checkForForwardDiagonalWin(rowIndex, colIndex) {
    const currentCellValue = board[rowIndex][colIndex];
    for (let i = 0; i < winLength; i++) {
        try {
            const slice = [
                { rowIndex: rowIndex + 3 - i, columnIndex: colIndex + i - 3, columnValue: board[rowIndex + 3 - i][colIndex + i - 3] },
                { rowIndex: rowIndex + 2 - i, columnIndex: colIndex + i - 2, columnValue: board[rowIndex + 2 - i][colIndex + i - 2] },
                { rowIndex: rowIndex + 1 - i, columnIndex: colIndex + i - 1, columnValue: board[rowIndex + 1 - i][colIndex + i - 1] },
                { rowIndex: rowIndex + 0 - i, columnIndex: colIndex + i - 0, columnValue: board[rowIndex + 0 - i][colIndex + i - 0] },
            ]
            if (slice.every(cell => cell.columnValue === currentCellValue)) {
                return slice;
            }
        } catch (e) {
            // This is going to be reached.. a lot.
        }

    }
}

function checkForBackwardDiagonalWin(rowIndex, colIndex) {
    const currentCellValue = board[rowIndex][colIndex];
    for (let i = 0; i < winLength; i++) {
        try {
            const slice = [
                { rowIndex: rowIndex - 3 - i, columnIndex: colIndex + i - 3, columnValue: board[rowIndex - 3 - i][colIndex + i - 3] },
                { rowIndex: rowIndex - 2 - i, columnIndex: colIndex + i - 2, columnValue: board[rowIndex - 2 - i][colIndex + i - 2] },
                { rowIndex: rowIndex - 1 - i, columnIndex: colIndex + i - 1, columnValue: board[rowIndex - 1 - i][colIndex + i - 1] },
                { rowIndex: rowIndex - 0 - i, columnIndex: colIndex + i - 0, columnValue: board[rowIndex - 0 - i][colIndex + i - 0] },
            ]
            if (slice.every(cell => cell.columnValue === currentCellValue)) {
                return slice;
            }
        } catch (e) {
            // This is going to be reached.. a lot.
        }

    }
}

/**
 * getNextCell(colIndex) returns the rowIndex of the 
 * next available row in column specifed by 'colIndex'
 * or throws an Error if column is full
 * @param {*} colIndex 
 * @returns int
 */
function getNextCell(colIndex) {
    const column = getColumn(colIndex)
    let lastPlacedRowIndex = column.findIndex(row => row === 0 || row === 1)
    if (lastPlacedRowIndex === 0) {
        throw new Error('Column is full.')
    }
    else if (lastPlacedRowIndex === -1) {
        lastPlacedRowIndex = numRows;
    }
    return lastPlacedRowIndex - 1

}

function placeCoinAt(columnIndex) {
    const numColumns = 7
    const max = columnIndex * numColumns
    const min = max - numColumns
    const i = min;
    while (i <= max) {
        if (board[i] === undefined) {
            board[i] = currentlySelected;
            break
        }
        i++;
    }
    updateState('PLACED', { i, currentlySelected })
    refreshCounts();
}

function refreshCounts() {
    document.getElementById('red-count').innerHTML = coinsRemaining[0];
    document.getElementById('gold-count').innerHTML = coinsRemaining[1];
}

function updateState(event, data) {
    if (event === "REMOVED") {
        coinsRemaining[currentlySelected]++;
        data.removeAttribute('data-color')
        refreshCounts()
    } else if (event === "ADDED") {
        if (coinsRemaining[currentlySelected] > 0) {
            coinsRemaining[currentlySelected]--;
            data.setAttribute('data-color', currentlySelected)

            /**
             * makeDropCoin(colIndex), used to add desired event handler
             * to placement cells
             * @param {*} colIndex 
             * @returns function dropCoin
             */
            function makeDropCoin(colIndex) {
                return function dropCoin() {
                    if (winState) {
                        reset()
                    } else {
                        displayErrorMessage();
                    }
                } else if (event === "SWITCHED") {
                    switchColor()
                } else if (event === "PLACED") {
                    const { i, currentlySelected } = data;
                    board[i] = currentlySelected;
                    coinsRemaining[currentlySelected]--;
                }
            }

            /**
             * reset()
             * resets the board, board UI and game state.
             */
            function reset() {
                setTimeout(() => {
                    document.querySelectorAll('.game-row').forEach(row => row.removeAttribute('data-bg-color'))
                    document.querySelectorAll('.game-col').forEach(el => el.removeAttribute('data-color'))
                    board = resetBoard()
                    reDrawBoard()
                    winState = false
                    turnCount = 0
                    root.style.setProperty('--current-color', 'var(--first-color)')
                }, 200)
            }

            /**
             * handleKeys(e) calls dropCoin(key - 1) 
             * if key in range or reset() on 'Esc'
             * @param {*} e 
             */
            function handleKeys(e) {
                switch (e.key) {
                    case 'Escape':
                        reset();
                        break;
                    case '1':
                        dropCoin(0);
                        break;
                    case '2':
                        dropCoin(1);
                        break;
                    case '3':
                        dropCoin(2);
                        break;
                    case '4':
                        dropCoin(3);
                        break;
                    case '5':
                        dropCoin(4);
                        break;
                    case '6':
                        dropCoin(5);
                        break;
                    case '7':
                        dropCoin(6);
                        break; 1

                    default:
                        break;
                }
            }



            function addEventListeners() {
                const circles = document.querySelectorAll('.game-circle');
                circles.forEach(circle => {
                    circle.addEventListener('click', placeCoin)
                })
                const switchButton = document.getElementById('switch');
                switchButton.addEventListener('click', switchColor)
                document.addEventListener('keyup', handleKeys)
            }

            function handleKeys(e) {
                switch (e.key) {
                    case ' ':
                        switchColor();
                        break;
                    case 'Escape':
                        reset();
                    case '1':
                        placeCoinAt(0);
                    case '2':
                        placeCoinAt(1);
                    case '3':
                        placeCoinAt(2);
                    case '4':
                        placeCoinAt(3);
                    case '5':
                        placeCoinAt(4);
                    case '6':
                        placeCoinAt(5);
                    case '7':
                        placeCoinAt(6);

                    default:
                        break;
                }
            }

            function reset() {
                coinsRemaining = [21, 21]
                const circles = document.querySelectorAll('.game-circle');
                circles.forEach(el => el.removeAttribute('data-color'))
                refreshCounts()
            }

            function onLoad() {
                addEventListeners()

                refreshCounts()
            }

            window.onload = onLoad;