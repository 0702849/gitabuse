//tower logic
//two offensive towers(ranged, melee), econ tower(money production), buff tower(defense/offense buff, does not work with econ tower)

let towers = [];
const TOWER_COST = 50;



class Offense {
  constructor(x, y, damage, range) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.range = range;
    this.level = 1;
    this.fireRate = 500;
    this.nextShotTime = 0;
  }

  update() {}

  display() {
    noStroke();
    fill("red");
    circle(this.x, this.y, 30);
  }

  fire() {}
  upgrade() {}
}

// === OFFENSE TOWER DOS ===
class OffenseTwo extends Offense {
  constructor(x, y, damage, range) {
    super(x, y, damage, range);
  }

  display() {
    noStroke();
    fill("blue");
    triangle(
      this.x, this.y - 35,
      this.x - 40, this.y + 35,
      this.x + 40, this.y + 35
    );
  }
}

// === ECON TOWER ===
class Econ {
  constructor(x, y, moneyProduction) {
    this.x = x;
    this.y = y;
    this.moneyProduction = moneyProduction;
    this.level = 1;
  }

  update() {}

  display() {
    fill("green");
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, 50, 50);
  }

  upgrade() {}
}

// === BUFF TOWER ===
class Buff {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  update() {}

  display() {
    noFill();
    stroke("yellow");
    circle(this.x, this.y, this.radius);
  }
}

// -- functions --

function mouseToTile() {
    let c = floor(mouseX / CELL_SIZE);
    let r = floor(mouseY / CELL_SIZE);
    return { r, c };
}

function tileCenter(r, c) {
    return {
        x: c * CELL_SIZE + CELL_SIZE / 2,
        y: r * CELL_SIZE + CELL_SIZE / 2
    };
}

function canPlaceTower(map, r, c) {
    // bounds check
    if (r < 0 || c < 0 || r >= GRID_ROWS || c >= GRID_COLS) return false;

    // only place on grass
    if (map[r][c] !== GRASS_TILE) return false;

    // no duplicate towers
    for (let i = 0; i < towers.length; i++) {
        if (towers[i].r === r && towers[i].c === c) return false;
    }

    return true;
}


function placeTower(map) {
    let tile = mouseToTile();
    if (!canPlaceTower(map, tile.r, tile.c)) return;

    let pos = tileCenter(tile.r, tile.c);

    let tower = new Offense(pos.x, pos.y, 2, 180);
    if(money < TOWER_COST || towers.length === 5){
      return;
    }
    else{
      money -= TOWER_COST;
      towers.push({
        r: tile.r,
        c: tile.c,
        tower: tower
      });
    }
}

function drawTowers(enemiesList) {
    for (let i = 0; i < towers.length; i++) {
        let t = towers[i].tower;

        // draw tower
        t.display();


        if(debugIsOn === true){
          noFill();
          stroke(0, 150);
          circle(t.x, t.y, t.range * 2);      //comment out maybe
          noStroke();
        }

        // find target
        let target = getClosestEnemyInRange(t.x, t.y, t.range, enemiesList);


        if (target !== null) {
        // only shoot/lock-on if ready
        if (millis() >= t.nextShotTime) {
            stroke(255, 0, 0);
            strokeWeight(2);
            line(t.x, t.y, target.x, target.y);
            noStroke();

            // set next allowed shot time and deal damage
            target.takeDamage(t.damage);
            t.nextShotTime = millis() + t.fireRate;
        }
        }
    }
}


function getClosestEnemyInRange(towerX, towerY, range, enemiesList) {
    let closest = null;
    let closestDist = range;

    for (let i = 0; i < enemiesList.length; i++) {
        let e = enemiesList[i];
        let d = dist(towerX, towerY, e.x, e.y);

        if (d <= closestDist) {
            closestDist = d;
            closest = e;
        }
    }

    return closest;
}