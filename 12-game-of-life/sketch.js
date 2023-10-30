// Game of Life

let grid;
let cellSize;
const GRID_SIZE = 40;
let autoPlay = false;
let gosperGun;

function preload() {
  gosperGun = loadJSON("gosper-gun.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if(height >= width){
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  if (autoPlay && frameCount%2 === 0) {
    grid = nextTurn();
  }
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
  else if (key === "w") {
    grid = nextTurn();
  }
  else if (key === "a") {
    autoPlay = !autoPlay;
  }
  else if (key === "g") {
    grid = gosperGun;
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
      if(grid[y][x] === 1){
        fill("black");
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

function nextTurn() {
  let nextTurnGrid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  for(let y = 0; y < GRID_SIZE; y++) {
    for(let x = 0; x < GRID_SIZE; x++) {
      //count neighbours
      let neighbours = 0;

      //look at all cells around in a 3x3 grid
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //detect edge cases
          if (y+i > 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE) {
            neighbours += grid[y+i][x+j];
          }
        }
      }
      //be careful about counting self
      neighbours -= grid[y][x];

      //applying the rules
      if(grid[y][x] === 1) { //alive
        if (neighbours === 2 || neighbours === 3){
          //stay alive
          nextTurnGrid[y][x] = 1;
        }
        else {
          nextTurnGrid[y][x] = 0;
        }
      }
      if (grid[y][x] === 0) {
        if (neighbours === 3) {
          //new birth
          nextTurnGrid[y][x] = 1;
        }
        else {
          //stay dead
          nextTurnGrid[y][x] = 0;
        }
      }
    }
  }
  return nextTurnGrid;
}