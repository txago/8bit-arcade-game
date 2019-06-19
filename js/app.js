// Enemy Constructor

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    //checkCollisions();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Constructor

var Player = function(x, y) {
    this.x = 202;
    this.y = 377;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
  if (e === 'right' && this.x < 402) {
    this.x += 100;
  }
  else if (e === 'left' && this.x > 2) {
    this.x -= 100;
  }
  else if (e === 'up' && this.y > -38) {
    this.y -= 83;
  }
  else if (e === 'down' && this.y < 377) {
    this.y += 83;
  }
  console.log(this.x, this.y);
};

// Instances

var player = new Player();
var enemy = new Enemy();
var allEnemies = [];
allEnemies.push(enemy);

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
