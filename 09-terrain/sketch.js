// Terrain Generation
//Oct 23rd, 2023

let terrain = [];
let xOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangles();
}

function draw() {
  stroke("black");
  background("lightblue");
  displayRectangles();
  if (keyIsDown(RIGHT_ARROW)) {
    if (xOffset < 10000) {
      xOffset += 100;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (xOffset > 100) {
      xOffset -= 100;
    }
  }
}

function spawnRectangles() {
  let time = 0;
  for (let x = 0; x < 10000; x++) {
    let h = noise(time) * height;
    let thisRect = {
      x: x,
      height: h,
    };
    terrain.push(thisRect);
    time += 0.001;
  }
}

function displayRectangles() {
  for (let i = xOffset; i < width + xOffset; i++) {
    let thisRect = terrain[i];
    rect(thisRect.x - xOffset, height - thisRect.height, 1, thisRect.height);
  }
}
