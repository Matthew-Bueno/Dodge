let lives = 3; // This is how many lives you will have
let playerRow = 2; // What row the player will spawns
let playerCol = 2; //  What column the player will spawn
let enemyRedRow = 4; // What row the red enemy will spawn
let enemyRedCol = 4; // What column the red enemy will spawn
let enemyGreyRow = 4; // What row the green enemy will spawn
let enemyGreyCol = 0; // What column the green enemy will spawn
let enemyOrangeRow = 0; // What row the orange enemy will spawn
let enemyOrangeCol = 4; // What column the orange enemy will spawn
let enemyPinkRow = 0; // What row the white enemy will spawn
let enemyPinkCol = 0; // What column the white enemy will spawn
let redInterval;
let greyInterval;
let orangeInterval;
let playerHitTimeout;
let container = document.getElementById("container"); // This is getting the container id that will be used later to hide the rules

function play() {
  clearInterval(redInterval);
  clearInterval(greyInterval);
  // This function is used when you click play everthing will start
  container.style.display = "none";

  document.getElementById("grid").style.display = "grid"; //

  lives = 3;
  updateHearts();
  updatePlayerPosition(); // This is for the player can load on the grid
  enemyPink();
  enemyOrange();
  enemyGrey();
  enemyRed();
  greyInterval = setInterval(enemyGreyMovement, 800);
  redInterval = setInterval(enemyRedMovement, 800);
  orangeInterval = setInterval(enemyOrangeMovement, 800);
  document.addEventListener("keydown", playerMove); // This event is used when you press down a key
}

function updateHearts() {
  // This function is to upadte the hearts as well as load them onto the HMTL screen
  const heartsDiv = document.getElementById("hearts");

  let heartDisplay = "";

  for (let i = 0; i < lives; i++) {
    heartDisplay += "♥️";
  }

  heartsDiv.innerHTML = `<p>${heartDisplay}</p>`;
}

function playerMove(event) {
  // This function is used when
  let key = event.key.toLowerCase();

  if (key === "w" || key === "arrowup") {
    if (playerRow > 0) playerRow--;
  } else if (key === "s" || key === "arrowdown") {
    if (playerRow < 4) playerRow++;
  } else if (key === "a" || key === "arrowleft") {
    if (playerCol > 0) playerCol--;
  } else if (key === "d" || key === "arrowright") {
    if (playerCol < 4) playerCol++;
  }

  updatePlayerPosition();
  console.log('player')
  let playerHitTimeout = setTimeout(() => enemyHit(), 400);
}
function updatePlayerPosition() {
  const player = document.getElementById("player");

  const cellWidth = 130;
  const cellHeight = 110;

  const playerSize = 20;

  const offsetX = (cellWidth - playerSize) / 2;
  const offsetY = (cellHeight - playerSize) / 2;

  player.style.transform = `translate(${playerCol * cellWidth + offsetX}px, ${playerRow * cellHeight + offsetY}px)`;
}

function enemyPink() {
  const enemyPink = document.getElementById("enemyPink");

  const enemyPinkcellWidth = 130;
  const enemyPinkcellHeight = 110;

  const enemyPinkSize = 20;

  const offsetX = (enemyPinkcellWidth - enemyPinkSize) / 2;
  const offsetY = (enemyPinkcellHeight - enemyPinkSize) / 2;

  enemyPink.style.transform = `translate(${enemyPinkCol * enemyPinkcellWidth + offsetX}px, ${enemyPinkRow * enemyPinkcellHeight + offsetY}px)`;
}

function enemyPinkMovment() {}

function enemyOrange() {
  const enemyOrange = document.getElementById("enemyOrange");

  const enemyOrangecellWidth = 130;
  const enemyOrangecellHeight = 110;

  const enemyOrangeSize = 20;

  const offsetX = (enemyOrangecellWidth - enemyOrangeSize) / 2;
  const offsetY = (enemyOrangecellHeight - enemyOrangeSize) / 2;

  enemyOrange.style.transform = `translate(${enemyOrangeCol * enemyOrangecellWidth + offsetX}px, ${enemyOrangeRow * enemyOrangecellHeight + offsetY}px)`;
}

function enemyOrangeMovement() {
  // Enemy Orange movement
  let direction = Math.floor(Math.random() * 4);
  //TODO: check if move is valid (within board) before changing row & col
  // if not valid generate new random direction
  // console.log("direction", direction);

  if (direction === 0) {
    if (enemyOrangeRow > 0 && enemyOrangeCol < 4) {
      enemyOrangeRow--;
      enemyOrangeCol++;
    }else enemyOrangeMovement()
  } else if (direction === 1) {
    if (enemyOrangeRow < 4 && enemyOrangeCol < 4) {
      enemyOrangeRow++;
      enemyOrangeCol++;
    } else enemyOrangeMovement()
  } else if (direction === 2) {
    if (enemyOrangeRow > 0 && enemyOrangeCol > 0) {
      enemyOrangeRow--;
      enemyOrangeCol--;
     }else enemyOrangeMovement()
  } else if (direction === 3) {
    if (enemyOrangeRow < 4 && enemyOrangeCol > 0) {
      enemyOrangeRow++;
      enemyOrangeCol--;
     }else enemyOrangeMovement()
  }

  enemyOrange();
    console.log('orange')
  setTimeout(() => enemyHit(), 600);
}

function enemyGrey() {
  const enemyGrey = document.getElementById("enemyGrey");

  const enemyGreycellWidth = 130;
  const enemyGreycellHeight = 110;

  const enemyGreySize = 20;

  const offsetX = (enemyGreycellWidth - enemyGreySize) / 2;
  const offsetY = (enemyGreycellHeight - enemyGreySize) / 2;

  enemyGrey.style.transform = `translate(${enemyGreyCol * enemyGreycellWidth + offsetX}px, ${enemyGreyRow * enemyGreycellHeight + offsetY}px)`;
}

function enemyGreyMovement() {
  // enemy grey movement
  let direction = Math.floor(Math.random() * 4);

  if (direction === 0 && enemyGreyRow > 0) {
    enemyGreyRow--;
  } else if (direction === 1 && enemyGreyRow < 4) {
    enemyGreyRow++;
  } else if (direction === 2 && enemyGreyCol > 0) {
    enemyGreyCol--;
  } else if (direction === 3 && enemyGreyCol < 4) {
    enemyGreyCol++;
  }

  enemyGrey();
    console.log('grey')
  setTimeout(() => enemyHit(), 800);
}

function enemyRed() {
  const enemyRed = document.getElementById("enemyRed");

  const enemyRedcellWidth = 130;
  const enemyRedcellHeight = 110;

  const enemyRedSize = 20;

  const offsetX = (enemyRedcellWidth - enemyRedSize) / 2;
  const offsetY = (enemyRedcellHeight - enemyRedSize) / 2;

  enemyRed.style.transform = `translate(${enemyRedCol * enemyRedcellWidth + offsetX}px, ${enemyRedRow * enemyRedcellHeight + offsetY}px)`;
}

function enemyRedMovement() {

  // enemy red movement
  if (enemyRedRow < playerRow) {
    enemyRedRow++;
  } else if (enemyRedRow > playerRow) {
    enemyRedRow--;
  }

  if (enemyRedCol < playerCol) {
    enemyRedCol++;
  } else if (enemyRedCol > playerCol) {
    enemyRedCol--;
  }

  enemyRed();
    console.log('red')
  setTimeout(() => enemyHit(), 1000);
}

function enemyHit() {
  console.log("enemyHit")
  // when enemy hits you
  let redHit = playerRow === enemyRedRow && playerCol === enemyRedCol;
  let greyHit = playerRow === enemyGreyRow && playerCol === enemyGreyCol;
  let orangeHit = playerRow === enemyOrangeRow && playerCol === enemyOrangeCol;
  
  if (redHit || greyHit || orangeHit) {
    lives--;
    updateHearts();

    if (lives <= 0) {
      gameOver();
    } else {
      clearInterval(redInterval);
      clearInterval(orangeInterval);
      clearInterval(greyInterval);
      clearTimeout(playerHitTimeout)

      enemyRedRow = 4;
      enemyRedCol = 4;

      enemyGreyRow = 4;
      enemyGreyCol = 0;

      enemyOrangeRow = 0;
      enemyOrangeCol = 4;

      playerCol = 2;
      playerRow = 2;

      setTimeout(() => {
        enemyRed();
        enemyGrey();
        enemyOrange();
        updatePlayerPosition();
      }, 700);

      document.removeEventListener("keydown", playerMove);

      setTimeout(() => document.addEventListener("keydown", playerMove), 400);

      setTimeout(
        () => (redInterval = setInterval(enemyRedMovement, 800)),
        2000,
      );
      setTimeout(
        () => (greyInterval = setInterval(enemyGreyMovement, 800)),
        1800,
      );
      setTimeout(
        () => (orangeInterval = setInterval(enemyOrangeMovement, 800)),
        1800,
      );
    }
  }
}

function gameOver() {
  console.log("gameOver");
  clearInterval(redInterval);
  clearInterval(greyInterval);
  clearInterval(orangeInterval);
   document.removeEventListener("keydown", playerMove);

  setTimeout(() => {
  document.getElementById("grid").style.display = "none";
  document.getElementById("gameOver").style.display = "block";
  }, 1000)

}

function restartGame() {
  console.log("restart game");
  playerRow = 2;
  playerCol = 2;

  enemyRedRow = 4;
  enemyRedCol = 4;

  enemyGreyRow = 4;
  enemyGreyCol = 0;

  enemyOrangeRow = 0;
  enemyOrangeCol = 4;

  enemyPinkRow = 0;
  enemyPinkCol = 0;

  document.getElementById("gameOver").style.display = "none";

  // document.getElementById("grid").style.display = "grid";

  play();
}
