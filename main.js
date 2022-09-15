// sound effects start
let gunSound = new Audio("/assets/gunSound.mp3");
let victorySound = new Audio("/assets/victorySound.mp3");
let enemyGunSound = new Audio("/assets/enemyGunsound.mp3");
// enemyGunSound.volume = 0.9;
let failSound = new Audio("/assets/failSound.mp3");
let backgroundMusic = new Audio("/assets/backgroundMusic.mp3");
backgroundMusic.loop = false;
backgroundMusic.volume = 0.5;
let bgAudio = document.getElementById("bg-audio");
let enemyHit = new Audio("/assets/ouch.mp3");
// sound effects end
let healthPoints = 100;
let banner = document.getElementById("banner");
let howToPlay = document.getElementById("howToPlay");
let lose = document.getElementById("winOrLose");

window.onload = function () {
  bgAudio.play();
  bgAudio.volume = 0.9;
};

//in game buttons
function instructions() {
  let instructions = document.getElementById("instructions");
  instructions.style.visibility = "visible";
  document.getElementById("footer").style.visibility = "hidden";
}
function instructionsOut() {
  let instructions = document.getElementById("instructions");
  instructions.style.visibility = "hidden";
  document.getElementById("footer").style.visibility = "visible";
}
function exit() {
  let exitButton = document.getElementById("exitButton");
  exitButton.addEventListener("click", function () {
    window.location.reload();
  });
}
function exitButtonShow() {
  let exitButton = document.getElementById("exitButton");
  exitButton.style.visibility = "visible";
}
function credits() {
  let credits = (document.getElementById("credits").style.visibility =
    "visible");
}
function creditsOut() {
  let instructions = document.getElementById("credits");
  instructions.style.visibility = "hidden";
}

//game logic
//start a game
function newGame() {
  document.getElementById("health").style.visibility = "visible";
  document.getElementById("hpIcon").style.visibility = "visible";
  document.querySelector("#game-buttons").style.display = "none";
  document.getElementById("footer").style.visibility = "hidden";
  randomGangsterAttacks();
  bgAudio.muted = true;
  backgroundMusic.play();
  backgroundMusic.volume = 0.5;
  exitButtonShow();
}

function randomGangsterAttacks() {
  var randomGangsterNo = Math.random() * livingGangsters().length;
  randomGangsterNo = Math.floor(randomGangsterNo);
  var gangster = livingGangsters()[randomGangsterNo];
  var randomDelay = Math.random() * 800 + 1000;
  setTimeout(() => {
    gangsterAttacks(gangster);
    randomGangsterAttacks();
  }, randomDelay);
}

function livingGangsters() {
  return document.querySelectorAll(".gangster:not(.deadGangster)");
}

function shoot(gangster) {
  enemyHit.play();
  gangster.classList.add("deadGangster");
  if (!livingGangsters().length) {
    document.getElementById("health").style.display = "none";
    document.getElementById("hpIcon").style.display = "none";
    let winBanner = (document.getElementById("winBanner").style.visibility =
      "visible");
    victorySound.play();
    setTimeout(() => {
      window.location.reload();
    }, 9000);
  }
}

function gangsterShoots(gangster) {
  if (!gangster.classList.contains("deadGangster")) {
    enemyGunSound.play();
    gangster.classList.add("shooting");
    updateHealthPoints(healthPoints - 20);
    setTimeout(() => {
      gangster.classList.remove("shooting");
    }, 200);
  }
}

function gangsterAttacks(gangster) {
  gangster.classList.add("showing");
  setTimeout(() => {
    gangsterShoots(gangster);
  }, 1000);
  setTimeout(() => {
    gangster.classList.remove("showing");
  }, 1000);
}

// health bar
function updateHealthPoints(points) {
  healthPoints = points;
  var health = document.querySelector("#health");
  health.style.width = points + "%";
  if (healthPoints < 1) {
    enemyGunSound.muted = true;
    failSound.play();
    document.getElementById("health").style.visibility = "hidden";
    document.getElementById("hpIcon").style.visibility = "hidden";

    let loseBanner = (document.getElementById("loseBanner").style.visibility =
      "visible");
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}
