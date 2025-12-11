// Tile Tower Defense 2 - Path Defense
// Rylan Hamel Chan
// 11,21,2025
//
// Extra for Experts:
// 


function setup() {
  createCanvas(windowWidth, windowHeight);

  console.log(gameState);

  beginButtons();
  levelButton();
}

function draw() {
  background(220);
  stateFunction();
}
