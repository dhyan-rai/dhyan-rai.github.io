// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recursiveCircle(width/2, height/2, mouseX);
}

function recursiveCircle(x, y, radius) {
  let gray = map(radius, 30, height/2, 255, 0);
  fill(random(255), random(255), random(255));
  circle(x, y, radius*2);

  if (radius > 30) {
    recursiveCircle(x - radius/2, y, radius/2);
    recursiveCircle(x + radius/2, y, radius/2);
    recursiveCircle(x, y - radius/2, radius/2);
    recursiveCircle(x, y + radius/2, radius/2);
    recursiveCircle(x - radius/2, y - radius/2, radius/2);
    recursiveCircle(x + radius/2, y + radius/2, radius/2);
  }
    
}