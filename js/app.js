// Enemy Constructor Function
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  // Randomizes speed
  this.speed = Math.floor((Math.random() * 400) + 100);
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  // Loop and randomizes when off canvas
  if (this.x > 512) {
    this.x = -102;
    this.speed = Math.floor((Math.random() * 400) + 100);
  };
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Constructor Function
var Player = function(x, y) {
  this.x = 202; // Initial position
  this.y = 377; // Initial position
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  // Player wins
  if (this.y === -38) {
    winGame();
    restartPosition();
  };
  // Player collides
  for (var enemy of allEnemies) {
    if (this.y === enemy.y && enemy.x + 45 > this.x && enemy.x < this.x + 45) {
      loseGame();
      restartPosition();
    }
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Keyboard moves and canvas border limit
Player.prototype.handleInput = function(e) {
  if (e === 'right' && this.x < 402) {
    this.x += 100;
  } else if (e === 'left' && this.x > 2) {
    this.x -= 100;
  } else if (e === 'up' && this.y > -38) {
    this.y -= 83;
  } else if (e === 'down' && this.y < 377) {
    this.y += 83;
  };
};

// Player & Enemies Instances
var player = new Player();
const enemy1 = new Enemy(-102, 45);
const enemy2 = new Enemy(-102, 128);
const enemy3 = new Enemy(-102, 211);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// Modals Vars
var startModal = document.querySelector(".start-modal");
var winModal = document.querySelector(".win-modal");
var loseModal = document.querySelector(".lose-modal");
var overlay = document.querySelector(".overlay");

// Start Game function
function startGame() {
  startModal.setAttribute('style', 'display: none;');
  overlay.setAttribute('style', 'display: none;');
  restartPosition();
};

// Win Game Function
function winGame() {
  winModal.setAttribute('style', 'display: block;');
  overlay.setAttribute('style', 'display: block;');
};

// Lose Game Function
function loseGame() {
  loseModal.setAttribute('style', 'display: block;');
  overlay.setAttribute('style', 'display: block;');
};

// Restart Game Function
function restartGame() {
  startModal.setAttribute('style', 'display: none;');
  winModal.setAttribute('style', 'display: none;');
  loseModal.setAttribute('style', 'display: none;');
  overlay.setAttribute('style', 'display: none;');
  restartPosition();
};

// Restart Player Position Function
function restartPosition() {
  player.x = 202; // Initial position
  player.y = 377; // Initial position
};

// handleInput
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
