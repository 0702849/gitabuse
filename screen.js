//levels and start screens

// -- state variables --

let gameState = "start";

// -- button --
//use createButton function
let startButton;
let levelOne;
let levelTwo;
let levelThree;

function buttons(){
    //start button
  startButton = createButton("start");
  startButton.position(windowWidth / 2, windowWidth / 2);
  startButton.mousePressed(stateUpdate);

  levelOne = createButton("Level One");
  levelOne.position(windowWidth/2 - 20, windowWidth/2);
  levelOne.mousePressed(stateUpdate);
  levelOne.hide();

}

function stateUpdate() {
    if(startButton.mousePressed){
        gameState = "level select";
        startButton.hide();
        stateWorks(gameState);
        console.log(gameState);
    }
    if(levelOne.mousePressed){
        gameState = "start";
        levelOne.hide();
        stateWorks(gameState);
        console.log(gameState);
    }
}

function stateWorks(gameState) {
    if(gameState === "start"){
        startButton.show();
    }
    if(gameState === "level select"){
        levelOne.show();
    }
}