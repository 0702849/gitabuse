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
  startButton.position(width / 2, width / 2);
  startButton.mousePressed(stateUpdate);
  startButton.hide();


}

function stateUpdate() {
    if(startButton.mousePressed){
        gameState = "level select";
    }
}

function stateWorks(gameState) {
    if(gameState === "start"){
        startButton.show();
    }
    if(gameState === "level select"){
        
    }

}