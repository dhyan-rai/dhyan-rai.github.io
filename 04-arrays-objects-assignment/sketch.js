// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// let p1;
// let p2;
// let angle = 0;
// let angle2 = 5;
// let time = 0;
// let cirSize = 60;
// let angVel = 0;
// let len = 100;
let x = 0;
let y = 0;
let ground;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let ground = loadImage("ground.jpg");
}

function draw() {
  x = mouseX;
  y = mouseY;
  background(ground);
  ellipse(x, y, 70, 45);
  rect(x - 40/2, y + 45/2, 40, 80);
  //rect();
  // translate(noise(time) * width, noise(time + 300) * height);
  // push();
  // fill("green");
  // noStroke();
  // circle(0, 0, 20);
  // pop();
  // p1 = p5.Vector.fromAngle(angle, len);
  // p2 = p5.Vector.fromAngle(angle2, len);
  // push();
  // fill("black");
  // circle(p1.x, p1.y, cirSize);
  // circle(p2.x, p2.y, cirSize);
  // pop();
  // angle += 0.12 + angVel;
  // angle2 -= 0.1 + angVel;
  // time += 0.01;
  // cirSize += 0.01;
  // len += 0.01;
}


