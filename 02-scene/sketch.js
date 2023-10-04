

// Dhyan Rai
// Computer Science 30
// October 2, 2023
//  
// Mini Golf
// 
//  Extra for experts: 
//   - Handling collisions of the ball with the walls (especially slanted walls) using p5.collide
//   - Iterating through an array filled with dictionaries to make hitboxes for the walls
//   - Using vectors to determine velocity of the ball and force applied on the ball
  




let ball;
let force;
let vel;
let isAiming = false;
let ballRadius = 10;
let gameOngoing = false;
let inHomeScreen = true;
let rKeyReleased = true;
let hole;
let level = 1;
let ballStartX = 116;
let ballStartY = 528;
let preset;
let numOfShots = 0;
let score1;
let score2;
let gameCompleted = false;



let walls;


function preload() {
  golfCourse1 = loadImage("gc1.png");
  golfCourse2 = loadImage("gc2.png");
  homeScreenImg = loadImage("HomeScreen.png");
  endScreen = loadImage("gamecompleted.png");
}

function setup() {
  createCanvas(600, 600);
  ball = createVector(ballStartX, ballStartY);
  force = createVector(0, 0);
  vel = createVector(0, 0);
  textSize(20)
  
}

function draw() {
  
  if (inHomeScreen) {
    homeScreen()
  }
  if (gameOngoing) {
    startGame();
  }
  if (gameCompleted) {
    completeGame();
  }
}


function drawArrow(base, vec) {
  push();
  if (mag(vec.x, vec.y) >= 75) {
    stroke("red");
  } else if (mag(vec.x, vec.y) >= 50 && mag(vec.x, vec.y) < 75) {
    stroke("yellow");
  } else {
    stroke("green");
  }
  strokeWeight(2.5);

  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);

  let arrowSize = 6;

  rotate(vec.heading());

  let distance = vec.mag();


  translate(distance - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  
  pop();
}

function startGame() {
  if (level === 1) {
    level1();
  } 
  
  if (level === 2) {
    level2()
  }

  // draw ball
  push();
  stroke("black");
  strokeWeight(2);
  fill("white");
  circle(ball.x, ball.y, ballRadius * 2);
  pop();

// Sets force equal to the amount you pull back
  if (isAiming) {
    force = p5.Vector.sub(ball, createVector(mouseX, mouseY)).limit(100);

    vel = createVector(
      map(force.x, -100, 100, -10, 10),
      map(force.y, -100, 100, -10, 10)
    );

    
    drawArrow(ball, force);
  }

  // adds speed to the ball with some decelaration
  else {
    ball.add(vel);
    vel.mult(0.986); 
  }


  for (let wall of walls) {
    let wallStart = createVector(wall.start.x, wall.start.y);
    let wallEnd = createVector(wall.end.x, wall.end.y);
    let wallDir = p5.Vector.sub(wallEnd, wallStart);
    let wallNormal = createVector(-wallDir.y, wallDir.x);

    // Checks if the ball collides with a wall/obstacle
    if (collideLineCircle(wallStart.x, wallStart.y, wallEnd.x, wallEnd.y, ball.x, ball.y, ballRadius * 2)) {

      vel.reflect(wallNormal);
    }

  
    if (ball.dist(wallStart) < ballRadius || ball.dist(wallEnd) < ballRadius) {
      vel.mult(-1);
    }
  }
  
  // Checking if the ball falls in the hole
  if (dist(hole.x, hole.y, ball.x, ball.y) <= 10 && (abs(vel.x) <= 1.5 && abs(vel.y) <= 1.5)) {
    if (level === 1) {
      level = 2;
      score1 = numOfShots;
      preset = true;    
    } else if (level === 2) {
      score2 = numOfShots;
      gameOngoing = false;
      gameCompleted = true;
    }
  }
  
  if (level === 2) {
    // The Spikes (dont touch the red area)
    if ((collideLineCircle(202, 348, 250, 348, ball.x, ball.y, ballRadius * 2)) || (collideLineCircle(202, 355, 250, 355, ball.x, ball.y, ballRadius * 2)) || (collideLineCircle(209, 533, 209, 577, ball.x, ball.y, ballRadius * 2)) || (collideLineCircle(218, 533, 218, 577, ball.x, ball.y, ballRadius * 2))) {
      reset();
    }
  }
  
  text("Number of shots: ".concat(numOfShots.toString()), 232, 50)
  text("Press R to reset", 240, 70)
  
}

function mousePressed() {
  if (gameOngoing) {
    if (abs(vel.x) <= 0.1 && abs(vel.y) <= 0.1) {
        if (dist(mouseX, mouseY, ball.x, ball.y) < ballRadius*2) {
          isAiming = true;
      }    
    } 
  }
}

function mouseReleased() {
  if (gameOngoing) {
    if (isAiming) {
      numOfShots += 1
    }
    isAiming = false;
    
  }
}

function keyTyped() {
  if (gameOngoing){
    if (rKeyReleased && key === "r") {
      reset();
      rKeyReleased = !rKeyReleased
    }
  }
  
}

function keyPressed() {
  if (inHomeScreen && keyCode === 32) {
    inHomeScreen = false;
    gameOngoing = true;
  }
}

function keyReleased() {
  if (key === "r" && !rKeyReleased) {
    rKeyReleased = !rKeyReleased;
  }
}

function level1() {
  background(golfCourse1);
  // setting the walls for this level
  walls =   [
  {start: {x: 99, y: 213}, end: {x: 262, y: 141}},
  {start: {x: 99, y: 213}, end: {x: 105, y: 227}},
  {start: {x: 262, y: 141}, end: {x: 269, y: 155}},
  {start: {x: 105, y: 227}, end: {x: 269, y: 155}},
  {start: {x: 357, y: 261}, end: {x: 482, y: 386}},
  {start: {x: 357, y: 261}, end: {x: 346, y: 271}},
  {start: {x: 346, y: 271}, end: {x: 472, y: 397}},
  {start: {x: 472, y: 397}, end: {x: 482, y: 386}},
  {start: {x: 22, y: 22}, end: {x: 22, y: 578}},
  {start: {x: 22, y: 22}, end: {x: 578, y: 22}},
  {start: {x: 578, y: 22}, end: {x: 578, y: 578}},
  {start: {x: 22, y: 578}, end: {x: 578, y: 578}},
  {start: {x: 172, y: 337}, end: {x: 186, y: 353}},
  {start: {x: 38, y: 457}, end: {x: 53, y: 473}},
  {start: {x: 38, y: 457}, end: {x: 172, y: 337}},
  {start: {x: 53, y: 473}, end: {x: 186, y: 353}},
  {start: {x: 217, y: 481}, end: {x: 443, y: 439}},
  {start: {x: 217, y: 481}, end: {x: 221, y: 499}},
  {start: {x: 221, y: 499}, end: {x: 447, y: 456}},
  {start: {x: 443, y: 439}, end: {x: 447, y: 456}},
  {start: {x: 369, y: 77}, end: {x: 383, y: 60}},
  {start: {x: 369, y: 77}, end: {x: 511, y: 188}},
  {start: {x: 383, y: 60}, end: {x: 524, y: 171}},
  {start: {x: 511, y: 188}, end: {x: 524, y: 171}},
    
  ]
  hole = createVector(139, 108)
  push();
  fill("black");
  circle(hole.x, hole.y, 35);
  pop();
}

function level2() {
  background(golfCourse2);
  // defining the walls for this level
  walls = [
    {start: {x: 449, y: 22}, end: {x: 449, y: 135}},
    {start: {x: 449, y: 135}, end: {x: 578, y: 135}},
    {start: {x: 95, y: 109}, end: {x: 228, y: 109}},
    {start: {x: 162, y: 224}, end: {x: 228, y: 109}},
    {start: {x: 95, y: 109}, end: {x: 162, y: 224}},
    {start: {x: 373, y: 170}, end: {x: 519, y: 347}},
    {start: {x: 362, y: 179}, end: {x: 373, y: 170}},
    {start: {x: 507, y: 357}, end: {x: 519, y: 347}},
    {start: {x: 362, y: 179}, end: {x: 507, y: 357}},
    {start: {x: 353, y: 398}, end: {x: 389, y: 398}},
    {start: {x: 353, y: 398}, end: {x: 353, y: 430}},
    {start: {x: 353, y: 430}, end: {x: 389, y: 430}},
    {start: {x: 389, y: 398}, end: {x: 389, y: 430}},
    {start: {x: 323, y: 481}, end: {x: 359, y: 481}},
    {start: {x: 323, y: 481}, end: {x: 323, y: 514}},
    {start: {x: 323, y: 514}, end: {x: 359, y: 514}},
    {start: {x: 359, y: 481}, end: {x: 359, y: 514}},
    {start: {x: 214, y: 430}, end: {x: 250, y: 430}},
    {start: {x: 214, y: 430}, end: {x: 214, y: 463}},
    {start: {x: 214, y: 463}, end: {x: 250, y: 463}},
    {start: {x: 250, y: 430}, end: {x: 250, y: 463}},
    {start: {x: 250, y: 338}, end: {x: 286, y: 338}},
    {start: {x: 250, y: 338}, end: {x: 250, y: 371}},
    {start: {x: 250, y: 371}, end: {x: 286, y: 371}},
    {start: {x: 286, y: 338}, end: {x: 286, y: 371}},
    {start: {x: 365, y: 570}, end: {x: 571, y: 374}},
    {start: {x: 22, y: 338}, end: {x: 202, y: 338}},
    {start: {x: 22, y: 355}, end: {x: 202, y: 355}},
    {start: {x: 202, y: 338}, end: {x: 202, y: 355}},
    {start: {x: 87, y: 406}, end: {x: 98, y: 394}},
    {start: {x: 87, y: 406}, end: {x: 214, y: 532}},
    {start: {x: 214, y: 532}, end: {x: 226, y: 521}},
    {start: {x: 98, y: 394}, end: {x: 226, y: 521}},
    {start: {x: 22, y: 22}, end: {x: 22, y: 578}},
    {start: {x: 22, y: 22}, end: {x: 578, y: 22}},
    {start: {x: 578, y: 22}, end: {x: 578, y: 578}},
    {start: {x: 22, y: 578}, end: {x: 578, y: 578}},
  ]
  
  if (preset) {
    reset();
  }
  preset = false;
  hole = createVector(158, 68)
  push()
  fill("black");
  circle(hole.x, hole.y, 35)
  pop()
}


function reset() {
  ball = createVector(ballStartX, ballStartY);
  force = createVector(0, 0);
  vel = createVector(0, 0);
  numOfShots = 0
}


function homeScreen() {
  background(homeScreenImg)
}

function completeGame() {
  background(endScreen)
  textSize(50)
  fill("white")
  textStyle(BOLD)
  text("Level 1: ".concat(score1.toString()).concat(" shots"), 145, 400)
  text("Level 2: ".concat(score2.toString()).concat(" shots"), 145, 500)
  textSize(20)
  textStyle(NORMAL)
  
}