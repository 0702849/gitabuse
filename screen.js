//levels and start screens

// -- state variables --

let gameState = "start";

// -- button --
//use createButton function
let startButton;
let levelOne;
let levelTwo;
let levelThree;

function beginButtons(){
    console.log(gameState);
    //start button
    startButton = createButton("start");
    //level buttons
    startButton.mouseClicked(stateToLevelSelect);
}

function levelButton(){
    levelOne = createButton("level one");
    levelTwo = createButton("level two");
    levelThree = createButton("level three");

    levelOne.hide();
    levelTwo.hide();
    levelThree.hide();
    
    levelOne.mouseClicked(stateToGame);
    levelTwo.mouseClicked(stateToGame);
    levelThree.mouseClicked(stateToGame);
}

function stateToLevelSelect(){
    if(startButton.mouseClicked){
        gameState = "level select";
        startButton.hide();
        levelOne.show();
        levelTwo.show();
        levelThree.show();
    }
    
    console.log(gameState);
}
function stateToGame(){
    if(levelOne.mouseClicked || levelTwo.mouseClicked || levelThree.mouseClicked){
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