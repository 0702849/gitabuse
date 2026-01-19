// Tile Tower Defense 2 - Path Defense
// Rylan Hamel Chan
// 11,21,2025
//
// Extra for Experts:
// 

const CELL_SIZE = 50;
const GRID_COLS = 16;
const GRID_ROWS = 12;

let gameState = "play";
let currentMap = [];

let grassTile;
let dirtTile;
let noTexture;


function preload(){
  grassTile = loadImage('grass.png');
  dirtTile = loadImage('Dirt_01.png');
  noTexture = loadImage('noTexture.jpg');
}

function setup() {
  createCanvas(GRID_COLS * CELL_SIZE, GRID_ROWS * CELL_SIZE);
  currentMap = buildMap(1);
}

function draw() {
  background(220);
  drawMap(currentMap);
  everythingThatHasToDoWithEnemies(currentMap);
  drawTowers(enemies);
}


function mousePressed(){
  placeTower(currentMap);
}