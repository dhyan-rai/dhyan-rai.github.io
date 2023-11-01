// 2D Array Grid
// Dhyan Rai
// Oct 24, 2023

// let grid = [[1, 0, 0, 1], 
//             [0, 1, 0, 0], 
//             [1, 0, 1, 1],
//             [0, 1, 0, 1]];

let grid;
let cellSize;
const GRID_SIZE = 15;
let xOff;
let yOff;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if(height >= width){
    cellSize = width/GRID_SIZE;
    xOff = width/4 - 20;
    yOff = 0;
  }
  else {
    cellSize = height/GRID_SIZE;
    xOff = 0;
    yOff = height/4 - 20;
  }
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
}

function keyTyped() {
  if(key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  else if(key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}

function displayGrid() {
  for(let y = 0; y < GRID_SIZE; y++) {
    for(let x = 0; x < GRID_SIZE; x++) {
      if(grid[y][x] === 0) {
        fill("white");
      }
      if(grid[y][x] === 1){
        fill("black");
      }
      push();
      translate(xOff, yOff);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      pop();
    }
  }
}

function generateRandomGrid(cols, rows) {
  let randomArray = [];
  for(let y = 0; y < cols; y++) {
    randomArray.push([]);
    for(let x = 0; x < rows; x++) {
      if(random(100) < 50) {
        randomArray[y].push(0);
      } else {
        randomArray[y].push(1);
      }      
    }
  }
  return randomArray;
}

function generateEmptyGrid(cols, rows) {
  let randomArray = [];
  for(let y = 0; y < cols; y++) {
    randomArray.push([]);
    for(let x = 0; x < rows; x++) {
      randomArray[y].push(0);
    }
  }
  return randomArray;
}

function mousePressed() {
  push();
  translate(xOff, yOff);
  if(grid[floor(map(mouseY - yOff, 0, cellSize * GRID_SIZE, 0, 15))][floor(map(mouseX - xOff, 0, cellSize * GRID_SIZE, 0, 15))] === 1) {
    grid[floor(map(mouseY - yOff, 0, cellSize * GRID_SIZE, 0, 15))][floor(map(mouseX - xOff, 0, cellSize * GRID_SIZE, 0, 15))] = 0;
  }
  else if(grid[floor(map(mouseY - yOff, 0, cellSize * GRID_SIZE, 0, 15))][floor(map(mouseX - xOff, 0, cellSize * GRID_SIZE, 0, 15))] === 0) {
    grid[floor(map(mouseY - yOff, 0, cellSize * GRID_SIZE, 0, 15))][floor(map(mouseX - xOff, 0, cellSize * GRID_SIZE, 0, 15))] = 1;
  }
  pop();
}