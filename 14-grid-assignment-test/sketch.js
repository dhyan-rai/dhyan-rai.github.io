// Grid Assignment
// Dhyan Rai
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize;
const GRID_SIZE = 15;
let backgroundImg;
let backgroundScale = 0.7;

function preload() {
  backgroundImg = loadImage("background-image.jpg");
}

function setup() {
  createCanvas(720 * backgroundScale, 960 * backgroundScale);

  if(height >= width){
    cellSize = 200/GRID_SIZE;
  }
  else {
    cellSize = 200/GRID_SIZE;
  }
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

}

function draw() {
  noFill();
  background(backgroundImg);
  displayGrid();
}

function displayGrid() {
  for(let y = 0; y < GRID_SIZE; y++) {
    for(let x = 0; x < GRID_SIZE; x++) {
      // if(grid[y][x] === 0) {
      //   fill("white");
      // }
      // if(grid[y][x] === 1){
      //   fill("black");
      // }
      push();
      translate(width/4, height/4);
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