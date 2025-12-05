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
    console.log(gameState);
    //start button
    startButton = createButton("start");
    //level buttons
    levelOne = createButton("level one");
    levelTwo = createButton("level two");
    levelThree = createButton("level three");

    levelOne.hide();
    levelTwo.hide();
    levelThree.hide();
        
    startButton.mouseClicked(stateUpdate);
}

function stateUpdate(){
    if(startButton.mouseClicked){
        gameState = "level select";
        startButton.hide();
        stateFunction();
    }
    else if(levelOne.mouseClicked){
        gameState = "game"
        levelOne.hide();
        stateFunction();
    }
    console.log(gameState);
}

function stateFunction(){
    if(gameState = "level select"){
        levelOne.show();
        levelTwo.show();
        levelThree.show();
        rect(width/2, width/2, 20, 30);
    }
    else if(gameState = "game"){
        circle(width/2, width/2, 50);
    }
}