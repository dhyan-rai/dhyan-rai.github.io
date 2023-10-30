// Character in Grid Demo

let grid;
let cellSize;
const GRID_SIZE = 40;
let playerX = 0;
let playerY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if(height >= width){
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //puts the player in the grid
  grid[playerY][playerX] = 9;

}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed(){
  let y = floor(mouseY/cellSize);
  let x = floor(mouseX/cellSize);

  toggleCell(x, y);
}

function keyTyped() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "s"){
    movePlayer(0, 1);
  }
  else if (key === "w"){
    movePlayer(0, -1);
  }
  else if (key === "a"){
    movePlayer(-1, 0);
  }
  else if (key === "d"){
    movePlayer(1, 0);
  }
}

function movePlayer(x, y) {
  //edge case check
  if (playerX + x >= 0 && playerX + x < GRID_SIZE &&
      playerY + y >= 0 && playerY + y < GRID_SIZE) {

    //checks if running into a wall
    if (grid[playerY + y][playerX + x] === 0) {
      let tempX = playerX;
      let tempY = playerY;

      playerX += x;
      playerY += y;

      //update grid
      grid[playerY][playerX] = 9;
      grid[tempY][tempX] = 0;
    }
  }
}

function toggleCell(x, y) {
  // check that we are within the grid, then toggle
  if(x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if(grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for(let y = 0; y < GRID_SIZE; y++) {
    for(let x = 0; x < GRID_SIZE; x++) {
      if(grid[y][x] === 0) {
        fill("white");
      }
      else if(grid[y][x] === 1){
        fill("black");
      }
      else if (grid[y][x] === 9) {
        fill("green");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
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
  for(let y = 0; y < cols; y++) {
    randomArray.push([]);
    for(let x = 0; x < rows; x++) {
      randomArray[y].push(0);
    }
  }
  return randomArray;
}

