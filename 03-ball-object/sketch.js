// Ball Object Notation Demo
// Dhyan Rai
// October 5th
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBall = {
  x: 100,
  y: 100,
  radius: 25,
  r: 255,
  g: 0,
  b: 0,
  dx: -4,
  dy: -3,
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220, 80);
  moveBall();
  displayBall();
}

function displayBall() {
  fill(theBall.r, theBall.g, theBall.b);
  circle(theBall.x, theBall.y, theBall.radius * 2);
}

function moveBall() {
  theBall.x += theBall.dx;
  theBall.y += theBall.dy;

  if (theBall.x >= width + theBall.radius) {
    theBall.x -= width + theBall.radius;
  }

  if (theBall.y >= height + theBall.radius) {
    theBall.y -= height + theBall.radius;
  }

  if (theBall.x <= 0 - theBall.radius) {
    theBall.x += width + theBall.radius;
  }

  if (theBall.y <= 0 - theBall.radius) {
    theBall.y += height + theBall.radius;
  }

}
