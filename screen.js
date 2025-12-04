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
    startButton.position(width/2, width/2);
    startButton.mouseClicked(stateUpdate);
    //level one button
    levelOne = createButton("level one");
    startButton.position(width/2 - 50/ width/2);
}

