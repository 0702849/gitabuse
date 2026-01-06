//levels and start screens

// -- constants --
const GRASS_TILE = 0;
const DIRT_TILE = 1;
const START_TILE = 2;
const END_TILE = 3;

// -- normal variables --
let startPos = null;

let dotX;
let dotY;
let dotSpeed = 2;
// -- state variables --



function buildMap(){
    let map = [];

    for(let r = 0; r < GRID_ROWS; r++){
        let row = [];

        for(let c = 0; c < GRID_COLS; c++){
            row.push(GRASS_TILE);
        }

        map.push(row);
    }



    for(let c = 0; c < 8; c++){
        map[5][c] = DIRT_TILE;                     // dirt path down the middle
    }

    for(let r = 5; r < GRID_ROWS - 2; r++){
        map[r][7] = DIRT_TILE;                        // dirt path that goes down
    }

    for(let c = 7; c < GRID_COLS; c++){
        map[GRID_ROWS - 2][c] = DIRT_TILE;        // path makes its way to the right edge
    }

    map[5][0] = START_TILE;                            // start 

    
    map[GRID_ROWS - 2][GRID_COLS - 1] = END_TILE;      // end 

    return map;
}


function drawMap(map){
    for(let r = 0; r < GRID_ROWS; r++){
        for(let c = 0; c < GRID_COLS; c++){
            let x = c * CELL_SIZE;
            let y = r * CELL_SIZE;

            if(map[r][c] === DIRT_TILE){
                image(dirtTile, x, y, CELL_SIZE, CELL_SIZE);
            }

            else if(map[r][c] === START_TILE || map[r][c] === END_TILE){
                image(noTexture, x, y, CELL_SIZE, CELL_SIZE);
            }

            else{
                image(grassTile, x, y, CELL_SIZE, CELL_SIZE);
            }

        }
    }
}


function drawSpawnDot(map) {
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {

      if (map[r][c] === START_TILE) {
        let x = c * CELL_SIZE + CELL_SIZE / 2;
        let y = r * CELL_SIZE + CELL_SIZE / 2;

        fill(255, 255, 0);
        noStroke();
        circle(x, y, 20);

        return;
      }
    }
  }
}