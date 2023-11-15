// Music Grid
// Dhyan Rai
// 13/11/2023
//
// Extra for Experts:
// - used class and objects
// - used buttons and sliders 
// - added ability to customize the size of the grid 
//   while maintaining its sound properties
// - added a "game" mode
// - used CSS styling on elements
// - used collision2D library to make code efficient


let grid;
let cellSize;
let grid_size;
let readingTiles = false;
let tileMode;
let tiles = [];
let lineSpeed;

let totalNotes = 3;

let randomSound;
let score = 0;

//state
let mode = "normal";
let playingRandomSound;


//DOM elements
let checkButton;
let playSoundButton;
let speedSlider;
let rowSlider;

//turns
let numOfTurns;

//colors
let colors = ["lightgreen", "magenta", "lightblue", "yellow", "orange", "green", "blue", "red"];

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
let correct;
let wrong;



function preload() {

  // frame rate
  frameRate(60);

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

  correct = loadSound("correct.mp3");
  correct.setVolume(0.2);
  wrong = loadSound("wrong.mp3");
  wrong.setVolume(0.2);


}

function setup() {
  
  //starting values
  grid_size = 8;
  cellSize = 50;
  
  //creating sliders
  createSliders();

  grid = generateEmptyGrid(grid_size, grid_size);
  createCanvas(cellSize*grid_size, cellSize*grid_size + 4.5 + 120);

  //enable looping at the start
  tiles1.looping = true;

} 

function draw() {
  if(mode === "normal") {
    //style preset
    strokeWeight(6);
    background("white");

    //update grid size and cell size based on slider value
    grid_size = rowSlider.value();
    cellSize = width/grid_size;

    //update and display grid based on size
    updateGrid(grid, grid_size);
    displayGrid();

    lineSpeed = map(speedSlider.value(), 100, 2000, (20*cellSize - 18*cellSize), (20*cellSize + 18*cellSize));
    if (tiles1.isPlaying) {
      readTiles(grid, lineSpeed, true, tiles1);
    }


    //displaying text based on mode
    displayText(mode);

  }
  else if (mode === "game"){
    strokeWeight(6);
    background("white");
    displayGrid();

    //displaying text based on mode
    displayText(mode);

    if (tiles1.isPlaying) {
      readTiles(grid, lineSpeed, true, tiles1);
    }
    if(playingRandomSound) {
      playRandomSound();
    }
  }
}

function mousePressed() {
  //when clicked, the cells "activate"
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

function keyTyped() {
  if (key === "p") {
    if (mode === "normal") {
      tiles1.looping = true;
      tiles1.isPlaying = !tiles1.isPlaying;
      //readingTiles = !readingTiles;
      tiles1.value = 0;
    }
    else if (mode === "game"){
      tiles1.isPlaying = !tiles1.isPlaying;
      tiles1.value = 0;
    }
  }
  else if (key === "g") {
    if (mode === "normal") {
      mode = "game";
      tiles1  = { value: 0, isPlaying: false, looping: false}; 
      numOfTurns = 3;
      playingRandomSound = false;
      lineSpeed = 2500;
      score = 0;
      totalNotes = 3;

      //creating buttons
      createButtons();

      grid_size = 5;
      cellSize = width/grid_size;
      grid = generateEmptyGrid(grid_size, grid_size);
  
      speedSlider.remove();
      rowSlider.remove();
    }
  }

  else if (key === "n") {
    if (mode === "game") {
      mode = "normal";
      grid_size = 8;
      cellSize = 50;
      lineSpeed = 900;
      grid = generateEmptyGrid(grid_size, grid_size);
      readingTiles = false;
      tiles1  = { value: 0, isPlaying: false, looping: true};
      playingRandomSound = false;
      if (checkButton !== undefined && playSoundButton !== undefined)  {
        checkButton.remove();
        playSoundButton.remove();
      }

      //creating sliders
      createSliders();
    }

  }
}

function displayGrid() {
  let i = 0;
  for (let y = 0; y < grid_size; y++) {
    for (let x = 0; x < grid_size; x++) {
      if (grid[y][x].mode === false) {
        fill("white");
      }
      if (grid[y][x].mode === true) {
        fill(colors[x]);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      i++;
    }
  }
}

//generates array with all cells inactive
function generateEmptyGrid(cols = 8, rows = 8) {
  let randomArray = [];
  for (let y = 0; y < cols; y++) {
    randomArray.push([]);
    for (let x = 0; x < rows; x++) {
      randomArray[y].push(new Tile(x * cellSize, y * cellSize, false));
    }
  }
  return randomArray;
}

//specific attributes for each time readTiles() is called
let tiles1  = { value: 0, isPlaying: false, looping: true};
let tiles2 = { value: 0, isPlaying: false, looping: false};



//reads the tiles and produces sounds for each tile
function readTiles(soundArray, speed, visual, attributes) {
  for (let row of soundArray) {
    for (let col of row) {
      col.checkCollision(attributes.value); 
    }
  }


  if (attributes.value < cellSize*grid_size) {
    if (visual) {
      push();
      stroke(0, 0, 102);
      line(0, attributes.value, cellSize*grid_size, attributes.value);
      pop();
    }
    attributes.value += cellSize/(cellSize - (speed * 0.02));
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
    if(collidePointLine(this.x, this.y, -20, yCol, cellSize*grid_size, yCol) && this.mode && yCol <= grid_size*cellSize) {
      sounds[floor(this.x/cellSize)].play();
    }
  }
}

//generates a an array that produces a random sound based on parameters (total notes and size)
function generateRandomSound(totalNotes = 3, size = 5) {
  let soundArray = generateEmptyGrid(size, size);


  while (totalNotes > 0) {
    let isTaken;
    let y = floor(random(0, size));
    let x = floor(random(0, size));
    let note = soundArray[y][x];

    //checking if the row is empty (avoiding putting more than one in a row)
    for (let i of soundArray[y]) {
      if (i.mode) {
        isTaken = true;
        break;
      }
      else {
        isTaken = false;
      }
    }

    if (!isTaken) {
      note.mode = true;
      totalNotes -= 1;
    }
  }

  return soundArray;

}

//checks the turns and plays the same sound array if turns is below 3 (you're on the same sound)
function checkTurns() {
  if (numOfTurns === 3) {
    if(score >= 5 && score < 9) {
      randomSound = generateRandomSound(totalNotes, 6);
    }
    else if (score >= 9) {
      randomSound = generateRandomSound(totalNotes, 7);
    }
    else {
      randomSound = generateRandomSound(totalNotes, 5);
    }
    playingRandomSound = true;
    playSoundButton.attribute("disabled", true);
    numOfTurns -= 1;
  }
  else if (numOfTurns === 2) {
    playingRandomSound = true;
    playSoundButton.attribute("disabled", true);
    numOfTurns -= 1;
  }
  else if(numOfTurns === 1) {
    playingRandomSound = true;
    playSoundButton.attribute("disabled", true);
    numOfTurns -= 1;
  }
}


//plays the randomSound array based on a few conditions
function playRandomSound() {
  tiles2.isPlaying = true;
  readTiles(randomSound, lineSpeed, false, tiles2)
  if (tiles2.isPlaying === false) {
    if (numOfTurns !== 0) {
      playSoundButton.removeAttribute("disabled");
      playingRandomSound = false;
    }
    else {
      playSoundButton.attribute("disabled", true);
      playingRandomSound = false;
    }
  }
}

//checking to see if the user's array matches the answer
function checkAnswer() {
  if (randomSound !== undefined && numOfTurns < 3) {
    playingRandomSound = false;
    tiles2.value = 0;
    tiles1.value = 0;
    tiles1.isPlaying = false;
    tiles2.isPlaying = false;
    if(soundsMatch(grid, randomSound)) {
      correct.play()
      numOfTurns = 3;
      //difficulty gets progressively harder
      if(score >= 4 && score < 8) {
        grid_size = 6;
        cellSize = width/grid_size;
        totalNotes = 4;
        lineSpeed = 2000;
      }
      else if (score >= 8) {
        grid_size = 7;
        cellSize = width/grid_size;
        totalNotes = 5;
        lineSpeed = 1800;
      }
      else {
        grid_size = 5;
        cellSize = width/grid_size;
        totalNotes = 3;
        lineSpeed = 2500;
      }
      grid = generateEmptyGrid(grid_size, grid_size);
      if(playSoundButton.elt.hasAttribute("disabled")) {
        playSoundButton.removeAttribute("disabled");
      }
      score++;
    }
    else {
      wrong.play();
      score = 0;
      numOfTurns = 3;
      grid_size = 5;
      cellSize = width/grid_size;
      totalNotes = 3;
      grid = generateEmptyGrid(grid_size, grid_size);
      if(playSoundButton.elt.hasAttribute("disabled")) {
        playSoundButton.removeAttribute("disabled");
      }
    }
  }
}

//function to compare two sound arrays and see if they are equal
function soundsMatch (arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j].mode !== arr2[i][j].mode) {
        return false;
      }
    }
  }
  return true;
}

//function that upates grid while also maintaining sound properties
function updateGrid (arr, numOfRows) {

  //if user chooses to have less rows than the current number of rows
  if (arr.length > numOfRows) {
    let diff = arr.length - numOfRows
    //removes rows that aren't needed
    for (let i = 0; i < diff; i++) {
      arr.pop();
    }
    //removes tiles that aren't needed
    for (let y = 0; y < arr.length; y++) {
      for (let x = 0; x < diff; x++) {
        arr[y].pop();
      }
    }
    //readjusts the positions of the collision points of the tiles
    for (let m = 0; m < arr.length; m++) {
      for (let n = 0; n < arr[m].length; n++) {
        arr[m][n].x = n * cellSize;
        arr[m][n].y = m * cellSize;
      }
    }
  }

  //if user chooses to have more rows than the current number of rows
  else if (arr.length < numOfRows) {
    let diff = numOfRows - arr.length;
    //adds rows that are needed
    for (let i = 0; i < diff; i++) {
      arr.push([]);
      for (let j = 0; j < arr[0].length; j++) {
        arr[arr.length - 1].push(new Tile (j * cellSize, (arr.length - 1) * cellSize, false));
      }
    }
    //adds tiles that are needed
    for (let y = 0; y < arr.length; y++) {
      for (let x = 0; x < diff; x++) {
        arr[y].push(new Tile (x, y, false));
      }
    }
    //adjusts the positions of collision points of the tiles
    for (let m = 0; m < arr.length; m++) {
      for (let n = 0; n < arr[m].length; n++) {
        arr[m][n].x = n * cellSize;
        arr[m][n].y = m * cellSize;
      }
    }    
    
  } 
}

//function that displays certain text based on current mode
function displayText(mode) {
  if (mode === "normal") {
    push()
    fill("black");
    textSize(19);
    textStyle(BOLD);
    text("Speed: " + speedSlider.value(), 152, 423);
    text("Rows/Columns: " + rowSlider.value(), 125, 465);
    pop();
    push();
    fill("black");
    textSize(19);
    textStyle(BOLDITALIC);
    text("Press P to play sound, G for game mode", 21, 510);
    pop();
  }
  else if (mode === "game") {
    push();
    fill("black");
    textSize(27);
    textStyle("bold");
    text("Score: " + score, 233, height - 90)
    text("Turns left: " + numOfTurns, 210, height - 55);
    pop();
    push();
    fill("black");
    textSize(19);
    textStyle(BOLDITALIC);
    text("Press N for normal mode", 166, height - 20);
    pop();
  }
}

//function to create sliders
function createSliders() {
  speedSlider = createSlider(100, 2000, 900, 50);
  speedSlider.position(72, 430);
  speedSlider.size(250);

  rowSlider = createSlider(3, 8, 4, 1);
  rowSlider.position(72, 470);
  rowSlider.size(250);
}

function createButtons() {
  //making and formatting check button
  checkButton = createButton("Check");
  checkButton.style('width', '110px');
  checkButton.style('height', '35px');
  checkButton.style('background-color', 'lightblue');
  checkButton.style('color', 'black');
  checkButton.style('font-size', '24px');
  checkButton.style('font-weight', 'bold');
  checkButton.position(40, height - 45);
  checkButton.mousePressed(checkAnswer);

  //making and formatting play sound button
  playSoundButton = createButton("Play Sound");
  playSoundButton.style('width', '110px');
  playSoundButton.style('height', '60px');
  playSoundButton.style('background-color', 'lightblue');
  playSoundButton.style('color', 'black');
  playSoundButton.style('font-size', '22px');
  playSoundButton.style('font-weight', 'bold');
  playSoundButton.position(40, height - 110);
  playSoundButton.mousePressed(checkTurns);
}