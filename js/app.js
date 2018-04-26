// Enemies our player must avoid
var Enemy = function(x = 10, y = 100) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.x + 100) * dt ;
    if(this.x > ctx.canvas.width) this.x = 0;
    //this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.startPosX = 210;
    this.startPosY = 350;
    this.sprit ='images/char-pink-girl.png';
}

Player.prototype.update = function(keyCode) {
   if(keyCode === 'left') {
        this.startPosX -= 50;
        if(this.startPosX < 0) {
            this.startPosX = ctx.canvas.width /2;          
        }

    } else if(keyCode === 'up') {
        this.startPosY -= 50;
        if (this.startPosY < 0) {
            this.startPosY = ctx.canvas.height /4 ;
        }

    } else if(keyCode === 'right') {
        this.startPosX += 50;
        if(this.startPosX >= ctx.canvas.width - 50) { //80
             this.startPosX = ctx.canvas.width /2;
        }

    } else if(keyCode === 'down') {
        this.startPosY += 50;
        if (this.startPosY > ctx.canvas.height - 80 ) { //140
                 this.startPosY = this.startPosY = 350;
        }
    }
    // If player reaches the water without collision 
    // Reset player position to the initial position
     if (this.startPosY < 2) {
       this.reset();
       var audio = new Audio('sounds/won.mp3'); //whistle.mp3');
        audio.play();
     }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprit), this.startPosX, this.startPosY);
};

Player.prototype.reset = function() {
    this.startPosX = 210;
    this.startPosY = 350;
}

Player.prototype.handleInput = function(keyCode) {
    this.update(keyCode);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(100, 50);

let enemy2 = new Enemy(20, 90);
let enemy3 = new Enemy(200, 220);
let enemy4 = new Enemy(80, 130);
let allEnemies = [enemy1, enemy2, enemy3, enemy4];

let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



