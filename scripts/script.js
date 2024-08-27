// Cow Pie Bingo was created on an iPad.

console.log("Get ready for some Cow Pie Bingo!")

let players = [];
let numPlayers;
let maxTime;
let gridSize = 10; // Define the grid size (10x10 for simplicity)
let cowPosition = { x: 0, y: 0 };
let cowPreviousMove = null;
let cowTimeout;

function startGame() {
    numPlayers = document.getElementById('numPlayers').value;
    maxTime = parseInt(document.getElementById('gameTime').value) * 60000; // Convert to milliseconds
    setupPlayers();
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    initiateCowMovement();
}

function setupPlayers() {
    players = [];
    for (let i = 0; i < numPlayers; i++) {
        let initials = prompt(`Enter initials for player ${i + 1}`);
        players.push({ initials: initials, square: i });
    }
    // Divide the pasture into a grid and assign squares to players
    // You can implement a visual representation of this if needed
}

function initiateCowMovement() {
    cowPosition = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    document.getElementById('pasture').innerHTML = `<circle cx="${cowPosition.x * 10 + 5}" cy="${cowPosition.y * 10 + 5}" r="2" fill="white" stroke="black" stroke-width="1" />`;
    
    let moveStart = Date.now();
    let moveInterval = setInterval(() => {
        if (Date.now() - moveStart > maxTime) {
            clearInterval(moveInterval);
            endGame();
            return;
        }

        let moveChance = Math.random();
        let move = moveChance < 0.3 ? cowPreviousMove : getRandomMove();
        
        switch (move) {
            case 'up': cowPosition.y = Math.max(0, cowPosition.y - 1); break;
            case 'down': cowPosition.y = Math.min(gridSize - 1, cowPosition.y + 1); break;
            case 'left': cowPosition.x = Math.max(0, cowPosition.x - 1); break;
            case 'right': cowPosition.x = Math.min(gridSize - 1, cowPosition.x + 1); break;
            case 'stay': break;
        }

        cowPreviousMove = move;
        drawCow();

        // Cow drops a pie after 25% of the game time
        if (Date.now() - moveStart > maxTime * 0.25 && Math.random() < 0.01) {
            clearInterval(moveInterval);
            dropCowPie();
        }
        
    }, 250);
}

function getRandomMove() {
    const moves = ['up', 'down', 'left', 'right', 'stay'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function drawCow() {
    document.getElementById('pasture').innerHTML = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <path d="M ${cowPosition.x * 10 + 5},${cowPosition.y * 10 + 5}
           c 5,-5 10,-5 15,0
           c 5,5 0,10 -5,10
           l -5,10
           l -10,0
           l -5,-10
           c -5,-5 0,-10 5,-10"
        fill="white" stroke="black" stroke-width="1"/>
</svg>`;
}

function dropCowPie() {
    document.getElementById('pasture').innerHTML += `<circle cx="${cowPosition.x * 10 + 5}" cy="${cowPosition.y * 10 + 5}" r="3" fill="brown" />`;
    document.getElementById('status').innerText = 'Cow dropped a pie! Game over!';
}

function endGame() {
    document.getElementById('status').innerText = 'Game over! No pie dropped.';
}
