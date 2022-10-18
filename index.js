const gameGrid = document.getElementById('game-grid')


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
        updateState('ADDED', target)
    }
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

            refreshCounts()
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

function switchColor() {
    currentlySelected = currentlySelected === 0 ? 1 : 0;
    document.getElementById('currently-selected').innerHTML = colors[currentlySelected];
}


function displayErrorMessage() {
    alert("No more of those coins")
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