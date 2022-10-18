const gameGrid = document.getElementById('game-grid')


// red, gold
const colors = ["red", "gold"]
let coinsRemaining = [21, 21];
let currentlySelected = 0;

function placeCoin(e) {
    const { target } = e;
    console.log(e.target);
    if (target.hasAttribute('data-color') && target.getAttribute('data-color') == currentlySelected) {
        updateState('REMOVED', target)
    } else {
        updateState('ADDED', target)
    }
}

function refreshCounts() {
    document.getElementById('red-count').innerHTML = coinsRemaining[0];
    document.getElementById('gold-count').innerHTML = coinsRemaining[1];
}

function updateState(event, element) {
    if (event === "REMOVED") {
        coinsRemaining[currentlySelected]++;
        target.removeAttribute('data-color')
        refreshCounts()
    } else if (event === "ADDED") {
        if (coinsRemaining[currentlySelected] > 0) {
            coinsRemaining[currentlySelected]--;
            element.setAttribute('data-color', currentlySelected)

            refreshCounts()
        } else {
            displayErrorMessage();
        }
    } else if (event === "SWITCHED") {
        switchColor()
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

}

function onLoad() {
    addEventListeners()
    refreshCounts()
}

window.onload = onLoad;