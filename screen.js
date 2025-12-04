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
    startButton.position(width/2, width/2);
    startButton.mouseClicked(stateUpdate);
    //level one button
    // levelOne = createButton("level one");
    // startButton.position(width/2 - 50/ width/2);
}

function stateUpdate(){
    if(startButton.mouseClicked){
        gameState = "level select";
    }
    // if(levelOne.mouseClicked){
    //     gameState = "game";
    // }
    cosole.log(gameState);
}

function stateFunction(){
    if(gameState = "start"){
        startButton.show();
        // levelOne.hide();
    }
    if(gameState = "level select"){
        // levelOne.show();
        startButton.hide();
    }

}