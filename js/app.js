// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.setPos();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    
    // Reset when off screen
    if (this.x > 505) {
        this.setPos();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set/Reset enemy position
Enemy.prototype.setPos = function() {
    this.speed = Math.floor(Math.random() * 100) + 10;
    this.x = -60;
    this.lane = Math.floor(Math.random() * 3) + 1;
    if (this.lane === 1) {
        this.y = 60;
    } else if (this.lane === 2) {
        this.y = 145;
    } else {
        this.y = 230;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.setPlayerPos();
};

Player.prototype.update = function() {
    this.checkCollision();
    this.checkWin();
};

Player.prototype.checkCollision = function() {
    for (enemy of allEnemies) {
        if (this.x >= enemy.x - 55 && this.x <= enemy.x + 55) {
            if (this.y >= enemy.y - 15 && this.y <= enemy.y + 15) {
                // Reset player position
                this.setPlayerPos();

                // Reset Gem Tracking
                gemCount = 0;
                gemCounter.innerHTML = gemCount;
            }
        }
    }
}

Player.prototype.checkWin = function() {
    if (this.y < 0) {
        // Reset player position
        this.setPlayerPos();
        // TODO:  ***Add something that happens when you win***
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.setPlayerPos = function() {
    this.x = 200;
    this.y = 375;
}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x !== 0) {
                this.x -= 100;
            }
            break;
        case 'up':
            if (this.y !== -25) {
                this.y -= 80;
            }
            break;
        case 'right':
            if (this.x !== 400) {
                this.x += 100;
            }
            break;
        case 'down':
            if (this.y !== 375) {
                this.y += 80;
            }
            break;
    }
};

let Gem = function() {
    this.sprite = 'images/gem orange.png';
    this.setGemPos();
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), (this.x + 25), (this.y + 80), 50.5, 85.5);
};

Gem.prototype.setGemPos = function() {
    this.lane = Math.floor(Math.random() * 3) + 1;
    switch(this.lane) {
        case 1:
            this.y = 55;
            break;
        case 2:
            this.y = 135;
            break;
        case 3:
            this.y = 215;
            break;
    }

    this.row = Math.floor(Math.random() * 5) + 1;
    switch(this.row) {
        case 1:
            this.x = 0;
            break;
        case 2:
            this.x = 100;
            break;
        case 3:
            this.x = 200;
            break;
        case 4:
            this.x = 300;
            break;
        case 5:
            this.x = 400;
            break;
    }
}

Gem.prototype.update = function() {
    this.isFound();
}

Gem.prototype.isFound = function() {
    if (this.x === player.x && this.y === player.y) {
        // Gem disappears
        this.x = -100;
        
        // Update Gem counter
        gemCount += 1;
        gemCounter.innerHTML = gemCount;

        // Call new gem
        this.setGemPos();
    }
}

let gemCount = 0;
const gemCounter = document.getElementById('gem-count');


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
let allEnemies = [enemy1, enemy2, enemy3];

let player = new Player();

let gem1 = new Gem();
let gem2 = new Gem();
let gem3 = new Gem();
let allGems = [gem1, gem2, gem3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
