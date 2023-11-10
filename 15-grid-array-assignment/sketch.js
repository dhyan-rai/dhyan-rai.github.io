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


function preload() {

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
  createCanvas(windowWidth, windowHeight);

  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
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

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1) {
    grid[y][x] = 0;
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
}

function displayGrid() {
  let i = 0;
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill("white");
        tileMode = false;
      }
      if (grid[y][x] === 1) {
        fill("black");
        tileMode = true;
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);

      tiles[i] = new Tile(x * cellSize + cellSize/2, y * cellSize, tileMode);

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
      randomArray[y].push(0);
    }
  }
  return randomArray;
}

let lineY = 0;


function readTiles() {

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].checkCollision();
  }
  if (lineY < cellSize*GRID_SIZE) {
    line(0, lineY, cellSize*GRID_SIZE, lineY);
    lineY += cellSize/(cellSize - (80));
  }
  else{
    lineY = 0;
    //line(0, lineY, cellSize*GRID_SIZE, lineY);
    //readingTiles = false;
  }


}

class Tile {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.mode = mode;
  }
  checkCollision() {
    if(collidePointLine(this.x, this.y, 0, lineY, cellSize*GRID_SIZE, lineY) && this.mode && lineY <= GRID_SIZE*cellSize) {
      sounds[floor(this.x/cellSize)].play();
        return true;
      
    }
    else {
      return false;
    }
  }
}


