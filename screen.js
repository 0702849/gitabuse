//levels and start screens

// -- constants --
const BUTTONOFFSET = 200;
const CELLSIZE = 50
// -- state variables --

let gameState = "start";

// -- buttons --
//use createButton function to make the buttons
let startButton;
let levelOne;
let levelTwo;
let levelThree;

function beginButtons(){
    startButton = createButton("start");
    startButton.position(width/2, width/2);     //put it in the middle of the screen
    startButton.mouseClicked(stateToLevelSelect);
}

function levelButton(){
    //create level one button
    levelOne = createButton("level one");
    levelOne.position(width/2 - BUTTONOFFSET, width/2);
    //create level two button
    levelTwo = createButton("level two");
    levelTwo.position(width/2,width/2);
    //create level three button
    levelThree = createButton("level three");
    levelThree.position(width/2 + BUTTONOFFSET, width/2);

    //hide them after initialization
    levelOne.hide();
    levelTwo.hide();
    levelThree.hide();
    
    //if clicked change state to "game"
    levelOne.mouseClicked(gameToOne);
    levelTwo.mouseClicked(gameToTwo);
    levelThree.mouseClicked(gameToThree);
}

function stateToStart(){
    //when called only show the start button and change state back to start
    gameState = "start";
    startButton.show();

    levelOne.hide();
    levelTwo.hide();
    levelThree.hide();

    console.log(gameState);
}

function stateToLevelSelect(){
    //when start button clicked enter level select menu
    if(startButton.mouseClicked){
        gameState = "level select";
        startButton.hide();
        levelOne.show();
        levelTwo.show();
        levelThree.show();
    }
    
    console.log(gameState);
}



// -- level state change--
function gameToOne(){
    if(levelOne.mouseClicked){
        gameState = "gameOne";
        levelOne.hide();
        levelTwo.hide();
        levelThree.hide();
    }
    console.log(gameState);
}
function gameToTwo(){
    if(levelTwo.mouseClicked){
        gameState = "gameTwo";
        levelOne.hide();
        levelTwo.hide();
        levelThree.hide();
    }
    console.log(gameState);
}
function gameToThree(){
    if(levelThree.mouseClicked){
        gameState = "gameThree";
        levelOne.hide();
        levelTwo.hide();
        levelThree.hide();
    }
    console.log(gameState);
}



function keyPressed(){
    if(keyCode = 82){
        //if "r" or "R" key pressed return to "start" state
        stateToStart();
    }
}


//what does each state do or call
function stateFunction(){
    // -- menus --
    if(gameState === "start"){
        //start menu
        fill("yellow")
        rect(width/2, width/2 - 200, 100);
    }
    else if(gameState === "level select"){
        //level select menu
        fill("red");
        rect(width/2, width/2 - 200, 50, 30);
    }

    // -- level vers --
    else if(gameState === "gameOne"){

        mapWorks("gameOne");
    }
    else if(gameState === "gameTwo"){
        fill("red");
        circle(width/2, width/2 - BUTTONOFFSET, 50);
    }
    else if(gameState === "gameThree"){
        fill("green");
        circle(width/2, width/2 - BUTTONOFFSET, 50);
    }
}


//                                                                      ====== GAME ======

let currentMap;


function mapWorks(level){
    //make the map using a 2d array

    //assign each grid box with a number according what level is picked
        // - 1: pathway
        // - 2: placeable ground
        // - 3: enemy start
        // - 4: enemy finish / base(w/ health)

        //if tile value > 4, give the tile no texture

    if(level === "gameOne"){
        currentMap = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
                      2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,
                      3,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,
                      2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,4,
                      2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
                ]
        
            for(let y = 0; y < 5; y++){
              for(let x = 0; x < 40; x++){
                    if(currentMap[y][x] === 1) {
                        fill("black");
                    }
                    else if(currentMap[y][x] === 0){
                        fill("white");
                    }
                    square(x * CELLSIZE, y * CELLSIZE, CELLSIZE);
            }
        }
    }
}


function enemyWaveFunction(level){
    //spawn enemies in waves
    //use last years project as idea builder


    // level one: 15 waves
    // level two: 20 waves
    // level three: 30 waves

    //secret level: inf waves
        //level 2 enemies introduced wave 5
        //level 3 enemies introduced wave 8
        //boss enemy every 10 waves
        //enemy health multiplies by 1.5 every 10 waves
}