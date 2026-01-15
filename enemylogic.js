//enemy and wave logic

//three enemy types(weak, average, strong), one boss type(tower stun every 10-20 seconds while on the map)

let checkPoints = [];
let checkPointIndex = 0;

let enemies = [];

let dotX = 100;
let dotY = 100;
let dotSpeed = 2;


class Enemy {
    constructor(checkPoints, speed = 2, size = 20) {
        this.checkPoints = checkPoints;
        this.speed = speed;
        this.size = size;

        this.index = 0;
        this.x = checkPoints[0].x;
        this.y = checkPoints[0].y;

        this.finished = false;
    }
    
    update() {
    let target = this.checkPoints[this.index];
    let dx = target.x - this.x;
    let dy = target.y - this.y;

    // reached current checkpoint
    if (abs(dx) <= this.speed && abs(dy) <= this.speed) {
            this.x = target.x;
            this.y = target.y;

            // if this was the LAST checkpoint → enemy is done
            if (this.index >= this.checkPoints.length - 1) {
            this.finished = true;   // mark for deletion
            return;
            }

            // otherwise go to next checkpoint
            this.index++;
            return;
        }

        // shuffle movement (one axis at a time)
        if (abs(dx) > abs(dy)) {
            this.x += (dx > 0 ? this.speed : -this.speed);
        } 
        else {
            this.y += (dy > 0 ? this.speed : -this.speed);
        }
    }
    
    draw() {
        fill(255, 255, 0);
        noStroke();
        circle(this.x, this.y, this.size);
    }
}



function setTheCheckPoints() {
    //make the set of checkpoints for enemies to shuffle along on
    if (checkPoints.length > 0){
        return;
    }

    checkPoints = [
        { x: CELL_SIZE/2, y: 5*CELL_SIZE + CELL_SIZE/2 },                           // start
        { x: 5*CELL_SIZE + CELL_SIZE/2, y: 5*CELL_SIZE + CELL_SIZE/2 },             // corner 1
        { x: 5*CELL_SIZE + CELL_SIZE/2, y: (GRID_ROWS-3)*CELL_SIZE + CELL_SIZE/2 }, // corner 2
        { x: (GRID_COLS-1)*CELL_SIZE + CELL_SIZE/2, y: (GRID_ROWS-3)*CELL_SIZE + CELL_SIZE/2 } // end
    ];
}



function enemyPathFind(map) {
    setTheCheckPoints(); //make sure enemies are moving along the right checkpoints/set them
    
    // draw the debug checkpoints(DONT FORGET TO COMMENT OUT)
    fill(0, 255, 255);
    noStroke();
    for (let i = 0; i < checkPoints.length; i++) {
        circle(checkPoints[i].x, checkPoints[i].y, 10);
    }
    
    //spawn an enemy if none exist
    if (enemies.length === 0) {
        enemies.push(new Enemy(checkPoints, 2, 20));
    }

    // update and draw all enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
        enemies[i].draw();

        // if enemy reached the end
        if (enemies[i].finished) {
            enemies.splice(i, 1);                  // delete it
            enemies.push(new Enemy(checkPoints));  // spawn a new one
        }
    }
}


