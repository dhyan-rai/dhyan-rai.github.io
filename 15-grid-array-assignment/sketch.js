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

let randomSound;

//state
let normalMode = true;
let gameMode = false;

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

  // frame rate
  frameRate(60)

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
  
  
  cellSize = 50;

  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  randomSound = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  createCanvas(cellSize*GRID_SIZE, cellSize*GRID_SIZE + 4.5 + 70);
} 

function draw() {
  if(normalMode) {
    strokeWeight(6);
    background(220);
    displayGrid();
    if (lineY.isPlaying) {
      readTiles(grid, lineSpeed, true, lineY);
      //scan(lineSpeed);
    }
  }
  else {

  }
}

function mousePressed() {
  if(normalMode) {
    let y = Math.floor(mouseY/cellSize);
    let x = Math.floor(mouseX/cellSize);
    if (y < grid.length && y >= 0 && x < grid[y].length && x >= 0) {
      if (grid[y][x].mode === false) {
        grid[y][x].mode = true;
      }
      else if (grid[y][x].mode === true) {
        grid[y][x].mode = false;
      }
    }
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
    lineY.isPlaying = !lineY.isPlaying;
    //readingTiles = !readingTiles;
    lineY.value = 0;
  }
  else if (key === "l") {
    lineSpeed += 100;
    lineSpeed = constrain(lineSpeed, 100, 1900);
  }
  else if (key === "j") {
    lineSpeed -= 100;
    lineSpeed = constrain(lineSpeed, 100, 1900);
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
      //strokeWeight(10);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);

      //tiles[i] = new Tile(x * cellSize + cellSize/2, y * cellSize, tileMode);

      i++;
    }
  }
}

function generateEmptyGrid(cols = 8, rows = 8) {
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

let lineY  = { value: 0, isPlaying: false, looping: true};
let lineY2 = { value: 0, isPlaying: false, looping: false};
let lineSpeed = 900;



function readTiles(soundArray, speed, visual, attributes) {
  for (let row of soundArray) {
    for (let col of row) {
      col.checkCollision(attributes.value);
    }
  }

  let deltaTime = 1 / frameRate();

  if (attributes.value < cellSize*GRID_SIZE) {
    if (visual) {
      line(0, attributes.value, cellSize*GRID_SIZE, attributes.value);
    }
    attributes.value += cellSize/(cellSize - (speed * deltaTime));
  }
  else{
    if (attributes.looping){
      attributes.value = 0;
    }
    else {
      attributes.value = 0;
      attributes.isPlaying = false;
    }
  }

}

class Tile {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.mode = mode;
  }
  checkCollision(yCol) {
    if(collidePointLine(this.x, this.y, -20, yCol, cellSize*GRID_SIZE, yCol) && this.mode && yCol <= GRID_SIZE*cellSize) {
      sounds[floor(this.x/cellSize)].play();
    }
  }
}

function generateRandomSound() {
  let soundArray = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  let totalNotes = 3;

  while (totalNotes > 0) {
    let note = soundArray[floor(random(0, 8))][floor(random(0, 8))];
    if (note.mode === false) {
      note.mode = true;
      totalNotes -= 1;
    }
  }

  return soundArray;

}