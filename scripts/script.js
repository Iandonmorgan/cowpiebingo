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
    document.getElementById('pasture').innerHTML = `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <!-- Cow body -->
  <ellipse cx="25" cy="30" rx="12" ry="8" fill="white" stroke="black" stroke-width="1.5" />

  <!-- Cow head -->
  <circle cx="25" cy="15" r="6" fill="white" stroke="black" stroke-width="1.5" />

  <!-- Cow ears -->
  <ellipse cx="18" cy="12" rx="3" ry="2" fill="white" stroke="black" stroke-width="1.5" />
  <ellipse cx="32" cy="12" rx="3" ry="2" fill="white" stroke="black" stroke-width="1.5" />

  <!-- Cow eyes -->
  <circle cx="22" cy="14" r="1" fill="black" />
  <circle cx="28" cy="14" r="1" fill="black" />

  <!-- Cow nose -->
  <ellipse cx="25" cy="18" rx="3" ry="1.5" fill="pink" stroke="black" stroke-width="1" />

  <!-- Cow legs -->
  <rect x="18" y="38" width="3" height="7" fill="black" />
  <rect x="29" y="38" width="3" height="7" fill="black" />
</svg>`;
}

function dropCowPie() {
    document.getElementById('pasture').innerHTML += `<circle cx="${cowPosition.x * 10 + 5}" cy="${cowPosition.y * 10 + 5}" r="3" fill="brown" />`;
    document.getElementById('status').innerText = 'Cow dropped a pie! Game over!';
}

function endGame() {
    document.getElementById('status').innerText = 'Game over! No pie dropped.';
}
