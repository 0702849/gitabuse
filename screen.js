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
        levelOne.show();
        levelTwo.show();
        levelThree.show();
    }
    else if(levelOne.mouseClicked || levelTwo.mouseClicked || levelThree.mouseClicked){
        gameState = "game"
        levelOne.hide();
        levelTwo.hide();
        levelThree.hide();
    }

    console.log(gameState);
}

function stateFunction(){
    if(gameState === "start"){
        fill("yellow")
            triangle(width/2, width/2, 30, 30, 30, 30);
    }
    else if(gameState === "level select"){
        fill("red");
        rect(width/2, width/2, 50, 30);
    }
    else if(gameState === "game"){
        fill("blue");
        circle(width/2, width/2, 50);
    }
}