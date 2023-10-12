// Perlin Noise Ball

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
}

function draw() {
  background(255, 70);
  noStroke();
  

  for (let theBall of ballArray) {
    //move
    fill(theBall.color);
    theBall.x = noise(theBall.time) * width;
    theBall.y = noise(theBall.time + 300) * height;
  
    //display
    circle(theBall.x, theBall.y, theBall.size);
  
    theBall.time += 0.01;
  }
}

function mousePressed() {
  spawnBall();
}

function spawnBall() {
  let ball = {
    x: random(width),
    y: random(height),
    size: random(10, 50),
    color: color(random(255), random(255), random(255), random(255)),
    time: random(1000),
  };
  ballArray.push(ball);
}