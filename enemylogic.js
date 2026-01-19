//enemy and wave logic

//three enemy types(weak, average, strong), one boss type(tower stun every 10-20 seconds while on the map)

let debugIsOn = false;

let checkPoints = [];
let checkPointIndex = 0;


let enemies = [];
let spawnCoolDown = 0;
const SPAWNDELAY = 1000;

let dotX = 100;
let dotY = 100;
let dotSpeed = 2;

let waveSize = 5;
let enemiesLeftToSpawn = 0;
let nextSpawnTime = 0;

const TIME_BETWEEN_ENEMIES = 800; // both in milliseconds
const TIME_BETWEEN_WAVES = 3000;
const MAX_WAVES = 10;

let waveNumber = 1;
let nextWaveStartTime = 0;

let isWaveCountdown = false;
let waveStarted = false;
let waitingForNextWave = false;

let gameCompleted = false;

let money = 50;
const OFFENSE_BONUS = 5;
const KILL_REWARD = 10;


class Enemy {
    constructor(checkPoints, speed = 2, size = 20) {
        this.checkPoints = checkPoints;
        this.speed = speed;
        this.size = size;
        this.index = 0;
        this.x = checkPoints[0].x;
        this.y = checkPoints[0].y;
        this.finished = false;
        this.maxHP = 10;
        this.hp = this.maxHP;
    }
    
    update() {
        let target = this.checkPoints[this.index];
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        
        // reached current checkpoint
        if (abs(dx) <= this.speed && abs(dy) <= this.speed) {
            this.x = target.x;
            this.y = target.y;
            
            // if this was the LAST checkpoint the enemy is done
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
        // enemy body
        fill(255, 255, 0);
        noStroke();
        circle(this.x, this.y, this.size);

        // HP bar
        let barW = 26;
        let barH = 5;
        let pct = this.hp / this.maxHp;
        pct = constrain(pct, 0, 1);

        fill(0);
        rectMode(CENTER);
        rect(this.x, this.y - 18, barW, barH);

        fill(0, 255, 0);
        rect(this.x - (barW * (1 - pct)) / 2, this.y - 18, barW * pct, barH);
        rectMode(CORNER);
    }

    takeDamage(amount) {
        money += OFFENSE_BONUS;
        this.hp -= amount;
    }
}    

function startWave() {
    enemiesLeftToSpawn = waveSize;
    nextSpawnTime = millis(); // start spawning immediately
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



function everythingThatHasToDoWithEnemies(map) {
  setTheCheckPoints();
  updateEnemiesAndWaves(map);
  drawHUD();
}



function updateEnemiesAndWaves(map) {

  // debug checkpoints
  if(debugIsOn === true){
    fill(0, 255, 255);
    noStroke();
    for (let i = 0; i < checkPoints.length; i++) {
      circle(checkPoints[i].x, checkPoints[i].y, 10);
    }
  }

  // update, draw, and remove enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();
    enemies[i].draw();


    //if dead reward with money
    if(enemies[i].hp <= 0){
      money += KILL_REWARD
      enemies.splice(i, 1);
      continue;
    }
    // remove if reached end OR died
    if (enemies[i].finished) {
      enemies.splice(i, 1);
    }
  }

  // start first wave
  if (waveStarted === false) {
    startWave();
    waveStarted = true;
  }

  // spawn enemies during wave
  if (enemiesLeftToSpawn > 0 && millis() >= nextSpawnTime) {
    enemies.push(new Enemy(checkPoints, 2, 20));
    enemiesLeftToSpawn--;
    nextSpawnTime = millis() + TIME_BETWEEN_ENEMIES;
  }

  // when wave is done, start countdown
  if (
    enemiesLeftToSpawn === 0 &&
    enemies.length === 0 &&
    isWaveCountdown === false &&
    gameCompleted === false
  ) {

    // stop if wave cap reached
    if (waveNumber >= MAX_WAVES) {
      gameCompleted = true;
      return;
    }

    isWaveCountdown = true;
    nextWaveStartTime = millis() + TIME_BETWEEN_WAVES;

    waveSize++;
    waveNumber++;
  }

  // start next wave after countdown
  if (
    isWaveCountdown === true &&
    millis() >= nextWaveStartTime &&
    gameCompleted === false
  ) {
    isWaveCountdown = false;
    startWave();
  }
}

function drawHUD() {
  // HUD bar
  fill(0, 160);
  rect(0, 0, width, 40);

  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text("Wave: " + waveNumber, 10, 20);
  text("On screen: " + enemies.length, 110, 20);
  text("Left: " + enemiesLeftToSpawn, 250, 20);
  text("Money: " + money, 360, 20);
  text("for debug mode press 'p'", 10, height - 20);

  // countdown
  if (isWaveCountdown) {
    let secondsLeft = (nextWaveStartTime - millis()) / 1000;
    secondsLeft = max(0, secondsLeft);

    textAlign(CENTER, CENTER);
    text("Next wave in: " + nf(secondsLeft, 1, 1) + "s", width/2, 50);
  }

  // game complete message
  if (gameCompleted) {
    fill(0, 180);
    rect(0, height / 2 - 30, width, 60);

    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("All waves completed!", width / 2, height / 2);
  }


  textAlign(CENTER, CENTER); // reset
}