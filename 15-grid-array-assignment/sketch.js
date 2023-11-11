// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
let cellSize;
const GRID_SIZE = 8;
let readingTiles = false;
let tileMode;
let tiles = [];

//initializing the notes
let sound1;
let sound2;
let sound3;
let sound4;
let sound5;
let sound6;
let sound7;
let sound8;

let sounds;

let targetFrameRate = 60;
let speedMultiplyer;

function preload() {

  // frame rate
  frameRate(targetFrameRate)
  speedMultiplyer = targetFrameRate / frameRate();

  //loading the notes
  sound1 = loadSound("DO.wav");
  sound2 = loadSound("RE.wav");
  sound3 = loadSound("MI.wav");
  sound4 = loadSound("FA.wav");
  sound5 = loadSound("SOL.wav");
  sound6 = loadSound("LA.wav");
  sound7 = loadSound("SI.mp3");
  sound7.setVolume(0.2);
  sound8 = loadSound("DO (octave).wav");
  sounds  = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8];

}

function setup() {
  
  if (windowHeight > windowWidth) {
    cellSize = windowWidth/GRID_SIZE;
  }
  else {
    cellSize = windowHeight/GRID_SIZE;
  }
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  createCanvas(cellSize*GRID_SIZE, cellSize*GRID_SIZE);
} 

function draw() {
  strokeWeight(9);
  background(220);
  displayGrid();
  if (readingTiles) {
    readTiles();
  }
  //console.log(collidePointLine(0, 0, 0, i, cellSize*GRID_SIZE, i));
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  if (grid[y][x].mode === false) {
    grid[y][x].mode = true;
  }
  else if (grid[y][x].mode === true) {
    grid[y][x].mode = false;
  }
}

function keyTyped() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "p") {
    readingTiles = !readingTiles;
    lineY = 0;
  }
  else if (key === "l") {
    lineSpeed += 1000;
    //lineSpeed = constrain(lineSpeed, -30, 40);
  }
  else if (key === "j") {
    lineSpeed -= 1000;
    //lineSpeed = constrain(lineSpeed, -30, 30);
  }
}

function displayGrid() {
  let i = 0;
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x].mode === false) {
        fill("white");
        //tileMode = false;
      }
      if (grid[y][x].mode === true) {
        fill("black");
        //tileMode = true;
      }
      strokeWeight(10);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);

      //tiles[i] = new Tile(x * cellSize + cellSize/2, y * cellSize, tileMode);

      i++;
    }
  }
}


function generateRandomGrid(cols, rows) {
  let randomArray = [];
  for (let y = 0; y < cols; y++) {
    randomArray.push([]);
    for (let x = 0; x < rows; x++) {
      if (random(100) < 50) {
        randomArray[y].push(0);
      }
      else {
        randomArray[y].push(1);
      }
    }
  }
  return randomArray;
}

function generateEmptyGrid(cols, rows) {
  let randomArray = [];
  for (let y = 0; y < cols; y++) {
    randomArray.push([]);
    for (let x = 0; x < rows; x++) {
      randomArray[y].push(new Tile(x * cellSize //+ cellSize/2
      , y * cellSize, false));
    }
  }
  return randomArray;
}

let lineY = 0;
let lineSpeed = 3000;



function readTiles() {

  let deltaTime = 1 / frameRate();

  for (let row of grid) {
    for (let col of row) {
      col.checkCollision();
    }
    //tiles[i].checkCollision();
  }
  if (lineY < cellSize*GRID_SIZE) {
    line(0, lineY, cellSize*GRID_SIZE, lineY);
    lineY += cellSize/(cellSize - (lineSpeed * deltaTime));
  }
  else{
    lineY = 0;
  }


}

class Tile {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.mode = mode;
  }
  checkCollision() {
    if(collidePointLine(this.x, this.y, -10, lineY, cellSize*GRID_SIZE, lineY) && this.mode && lineY <= GRID_SIZE*cellSize) {
      sounds[floor(this.x/cellSize)].play();
        return true;
      
    }
    else {
      return false;
    }
  }
}


