//levels and start screens

// -- state variables --

let gameState;

// -- button --
//use createButton function
let startButton;
let levelOne;
let levelTwo;
let levelThree;

function buttons(){
    //start button
  startButton = createButton("start");
  startButton.position(windowWidth / 2);
  startButton.mousePressed(stateUpdate);

    //level one button
  levelOne = createButton("Level One");
//   levelOne.position(windowWidth/2 - 20);
  levelOne.mousePressed(stateUpdate);

}

function stateUpdate() {
    if(startButton.mousePressed){
        gameState = "level select";
        stateWorks("level select");
    }
    if(levelOne.mousePressed){
        gameState = "start";
        stateWorks("start");
    }
    console.log(gameState);
}

function stateWorks(_gameState) {
    if(_gameState === "start");{
        levelOne.hide();
    }
    if(_gameState === "level select"){
        startButton.hide();
        levelOne.show();
    }
}

